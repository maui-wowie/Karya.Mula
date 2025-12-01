<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Real statistics
        $revenue = Order::where('seller_id', $user->id)
            ->where('status', 'completed')
            ->sum('total_price');
            
        $newOrdersCount = Order::where('seller_id', $user->id)
            ->where('status', 'pending')
            ->count();
            
        $productViews = 125; // This would come from analytics table in real app

        // Orders needing process
        $ordersQuery = Order::where('seller_id', $user->id)
            ->where('status', 'pending')
            ->with(['items.product', 'buyer'])
            ->latest()
            ->get();

        $orders = $ordersQuery->map(function($order) {
            $itemsSummary = $order->items->map(function($item) {
                return $item->quantity . 'x ' . $item->product->name;
            })->join(', ');

            return [
                'id' => $order->id,
                'buyer_name' => $order->buyer->name,
                'items_summary' => $itemsSummary,
                'total_price' => $order->total_price,
                'status' => 'Menunggu Konfirmasi',
                'status_color' => 'yellow'
            ];
        });

        return Inertia::render('Shop/Dashboard', [
            'stats' => [
                'revenue' => $revenue,
                'newOrders' => $newOrdersCount,
                'views' => $productViews
            ],
            'orders' => $orders
        ]);
    }

    public function products(Request $request)
    {
        $query = Product::where('user_id', Auth::id());

        // Search
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'active') {
                $query->where('status', 'active')->where('stock', '>', 0);
            } elseif ($request->status === 'out_of_stock') {
                $query->where('stock', 0);
            }
        }

        $products = $query->get()->map(function($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'sku' => $product->sku,
                'price' => $product->price,
                'stock' => $product->stock,
                'description' => $product->description,
                'image_url' => $product->image_url,
                'stock_alert' => $product->stock > 0 && $product->stock <= 10
            ];
        });

        return Inertia::render('Shop/ProductList', [
            'products' => $products
        ]);
    }

    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:50|unique:products,sku',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url'
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'active';

        Product::create($validated);

        return redirect()->route('shop.products')->with('success', 'Produk berhasil ditambahkan!');
    }

    public function updateProduct(Request $request, $id)
    {
        $product = Product::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:50|unique:products,sku,' . $id,
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url'
        ]);

        $product->update($validated);

        return redirect()->route('shop.products')->with('success', 'Produk berhasil diperbarui!');
    }

    public function deleteProduct($id)
    {
        $product = Product::where('user_id', Auth::id())->findOrFail($id);
        $product->delete();

        return redirect()->route('shop.products')->with('success', 'Produk berhasil dihapus!');
    }

    public function orders(Request $request)
    {
        $query = Order::where('seller_id', Auth::id())
            ->with(['items.product', 'buyer']);

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $ordersQuery = $query->latest()->get();

        $orders = $ordersQuery->map(function($order) {
            return [
                'id' => $order->id,
                'buyer_name' => $order->buyer->name,
                'courier' => $order->shipping_courier,
                'items' => $order->items->map(function($item) {
                    return [
                        'name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'image_url' => $item->product->image_url ?? '/images/placeholder.jpg'
                    ];
                }),
                'total_price' => $order->total_price,
                'status' => $this->getStatusLabel($order->status),
                'status_raw' => $order->status,
                'date' => $order->created_at->format('H:i') . ' WIB',
                'shipping_receipt' => $order->shipping_receipt
            ];
        });

        return Inertia::render('Shop/OrderHistory', [
            'orders' => $orders
        ]);
    }

    public function acceptOrder($id)
    {
        $order = Order::where('seller_id', Auth::id())->findOrFail($id);
        $order->update(['status' => 'processing']);

        return redirect()->back()->with('success', 'Pesanan berhasil diterima!');
    }

    public function updateShipping(Request $request, $id)
    {
        $order = Order::where('seller_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'shipping_receipt' => 'required|string|max:100',
            'shipping_courier' => 'nullable|string|max:100'
        ]);

        $order->update([
            'shipping_receipt' => $validated['shipping_receipt'],
            'shipping_courier' => $validated['shipping_courier'] ?? $order->shipping_courier,
            'status' => 'shipped'
        ]);

        return redirect()->back()->with('success', 'Nomor resi berhasil ditambahkan!');
    }

    private function getStatusLabel($status)
    {
        return match($status) {
            'pending' => 'Menunggu Konfirmasi',
            'processing' => 'Perlu Dikirim',
            'shipped' => 'Dikirim',
            'completed' => 'Selesai',
            'cancelled' => 'Dibatalkan',
            default => $status
        };
    }
}
