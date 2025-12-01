<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;

class ShopSeeder extends Seeder
{
    public function run(): void
    {
        // Get first regular user (not admin)
        $seller = User::where('role', '!=', 'admin')->first();
        
        if (!$seller) {
            $this->command->warn('No regular user found. Creating a test user...');
            $seller = User::create([
                'name' => 'Test Seller',
                'email' => 'seller@test.com',
                'password' => bcrypt('password'),
                'role' => 'user'
            ]);
        }

        // Create sample products
        $products = [
            [
                'user_id' => $seller->id,
                'name' => 'Totebag Canvas',
                'sku' => 'BG-001',
                'price' => 75000,
                'stock' => 50,
                'description' => 'Tas totebag berbahan canvas berkualitas tinggi',
                'status' => 'active'
            ],
            [
                'user_id' => $seller->id,
                'name' => 'Dompet Kulit',
                'sku' => 'WL-002',
                'price' => 300000,
                'stock' => 5,
                'description' => 'Dompet kulit asli dengan desain minimalis',
                'status' => 'active'
            ],
            [
                'user_id' => $seller->id,
                'name' => 'Gantungan Kunci',
                'sku' => 'GK-003',
                'price' => 15000,
                'stock' => 0,
                'description' => 'Gantungan kunci handmade',
                'status' => 'active'
            ],
            [
                'user_id' => $seller->id,
                'name' => 'Tas Ransel',
                'sku' => 'BP-004',
                'price' => 250000,
                'stock' => 15,
                'description' => 'Tas ransel untuk sekolah dan kuliah',
                'status' => 'active'
            ]
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }

        // Get or create buyers
        $buyer1 = User::where('email', 'buyer1@test.com')->first();
        if (!$buyer1) {
            $buyer1 = User::create([
                'name' => 'Budi Santoso',
                'email' => 'buyer1@test.com',
                'password' => bcrypt('password'),
                'role' => 'user'
            ]);
        }

        $buyer2 = User::where('email', 'buyer2@test.com')->first();
        if (!$buyer2) {
            $buyer2 = User::create([
                'name' => 'Siti Aminah',
                'email' => 'buyer2@test.com',
                'password' => bcrypt('password'),
                'role' => 'user'
            ]);
        }

        // Create sample orders
        $product1 = Product::where('sku', 'BG-001')->first();
        $product2 = Product::where('sku', 'WL-002')->first();

        // Order 1 - Pending
        $order1 = Order::create([
            'user_id' => $buyer1->id,
            'seller_id' => $seller->id,
            'total_price' => 150000,
            'status' => 'pending',
            'shipping_address' => 'Jl. Sudirman No. 123, Jakarta',
            'shipping_courier' => 'JNE - Reguler'
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'product_id' => $product1->id,
            'quantity' => 2,
            'price' => $product1->price
        ]);

        // Order 2 - Pending
        $order2 = Order::create([
            'user_id' => $buyer2->id,
            'seller_id' => $seller->id,
            'total_price' => 300000,
            'status' => 'pending',
            'shipping_address' => 'Jl. Thamrin No. 456, Jakarta',
            'shipping_courier' => 'JNE - Reguler'
        ]);

        OrderItem::create([
            'order_id' => $order2->id,
            'product_id' => $product2->id,
            'quantity' => 1,
            'price' => $product2->price
        ]);

        // Order 3 - Processing (needs shipping)
        $order3 = Order::create([
            'user_id' => $buyer2->id,
            'seller_id' => $seller->id,
            'total_price' => 315000,
            'status' => 'processing',
            'shipping_address' => 'Jl. Gatot Subroto No. 789, Jakarta',
            'shipping_courier' => 'JNE - Reguler'
        ]);

        OrderItem::create([
            'order_id' => $order3->id,
            'product_id' => $product2->id,
            'quantity' => 1,
            'price' => $product2->price
        ]);

        $this->command->info('Shop data seeded successfully!');
    }
}
