import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    Download,
    Type,
    Square,
    Circle,
    Triangle,
    Hexagon,
    Minus,
    Star,
    Image as ImageIcon,
    Trash2,
    Undo,
    Redo,
    Layers,
    Move,
    Upload,
    ArrowUp,
    ArrowDown,
    Copy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

export default function Editor({ auth, design }) {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [designTitle, setDesignTitle] = useState(design?.title || "Desain Baru");
    
    const { data, setData, post, put, processing } = useForm({
        title: designTitle,
        type: design?.type || "custom",
        canvas_data: design?.canvas_data ? JSON.stringify(design.canvas_data) : null,
        thumbnail_url: design?.thumbnail_url || null,
    });

    // Initialize Canvas
    useEffect(() => {
        if (canvasRef.current && !canvas) {
            const newCanvas = new fabric.Canvas(canvasRef.current, {
                width: 800,
                height: 600,
                backgroundColor: "#ffffff",
                selection: true,
                preserveObjectStacking: true,
            });

            setCanvas(newCanvas);

            // Load existing design if available
            const loadCanvas = async () => {
                if (design?.canvas_data) {
                    try {
                        // Handle both string and object formats for safety
                        const canvasData = typeof design.canvas_data === 'string' 
                            ? JSON.parse(design.canvas_data) 
                            : design.canvas_data;

                        console.log("Loading canvas data...", canvasData);
                        await newCanvas.loadFromJSON(canvasData);
                        newCanvas.renderAll();
                        console.log("Canvas loaded successfully");
                    } catch (error) {
                        console.error("Error loading canvas data:", error);
                        alert("Gagal memuat desain: " + error.message);
                    }
                }
            };

            loadCanvas();

            // Event Listeners
            newCanvas.on("selection:created", (e) => setSelectedObject(e.selected[0]));
            newCanvas.on("selection:updated", (e) => setSelectedObject(e.selected[0]));
            newCanvas.on("selection:cleared", () => setSelectedObject(null));

            return () => {
                newCanvas.dispose();
            };
        }
    }, [canvasRef]);

    // Add Text
    const addText = () => {
        if (!canvas) return;
        const text = new fabric.IText("Teks Baru", {
            left: 100,
            top: 100,
            fontFamily: "Arial",
            fill: "#333333",
            fontSize: 24,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    };

    // Add Rectangle
    const addRect = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "#3B82F6",
            width: 100,
            height: 100,
        });
        canvas.add(rect);
        canvas.setActiveObject(rect);
        canvas.renderAll();
    };

    // Add Circle
    const addCircle = () => {
        if (!canvas) return;
        const circle = new fabric.Circle({
            left: 150,
            top: 150,
            fill: "#EF4444",
            radius: 50,
        });
        canvas.add(circle);
        canvas.setActiveObject(circle);
        canvas.renderAll();
    };

    // Add Triangle
    const addTriangle = () => {
        if (!canvas) return;
        const triangle = new fabric.Triangle({
            left: 200,
            top: 200,
            fill: "#10B981",
            width: 100,
            height: 100,
        });
        canvas.add(triangle);
        canvas.setActiveObject(triangle);
        canvas.renderAll();
    };

    // Add Star
    const addStar = () => {
        if (!canvas) return;
        // Simple 5-point star path
        const starPoints = [
            {x: 350, y: 75},
            {x: 380, y: 160},
            {x: 470, y: 160},
            {x: 400, y: 215},
            {x: 423, y: 301},
            {x: 350, y: 250},
            {x: 277, y: 301},
            {x: 300, y: 215},
            {x: 230, y: 160},
            {x: 320, y: 160}
        ];
        
        const star = new fabric.Polygon(starPoints, {
            left: 250,
            top: 250,
            fill: "#F59E0B",
            scaleX: 0.5,
            scaleY: 0.5,
        });
        canvas.add(star);
        canvas.setActiveObject(star);
        canvas.renderAll();
    };

    // Add Line
    const addLine = () => {
        if (!canvas) return;
        const line = new fabric.Line([50, 100, 200, 100], {
            left: 100,
            top: 100,
            stroke: "#000000",
            strokeWidth: 5,
        });
        canvas.add(line);
        canvas.setActiveObject(line);
        canvas.renderAll();
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !canvas) return;

        const reader = new FileReader();
        reader.onload = async (f) => {
            const data = f.target.result;
            try {
                const img = await fabric.Image.fromURL(data);
                img.scaleToWidth(200);
                canvas.add(img);
                canvas.centerObject(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };
        reader.readAsDataURL(file);
        e.target.value = null; // Reset input
    };

    // Delete Object
    const deleteSelected = () => {
        if (!canvas || !selectedObject) return;
        canvas.remove(selectedObject);
        canvas.discardActiveObject();
        canvas.renderAll();
        setSelectedObject(null);
    };

    // Clone Object
    const cloneSelected = () => {
        if (!canvas || !selectedObject) return;
        selectedObject.clone().then((cloned) => {
            canvas.discardActiveObject();
            cloned.set({
                left: cloned.left + 20,
                top: cloned.top + 20,
                evented: true,
            });
            if (cloned.type === 'activeSelection') {
                cloned.canvas = canvas;
                cloned.forEachObject((obj) => {
                    canvas.add(obj);
                });
                cloned.setCoords();
            } else {
                canvas.add(cloned);
            }
            canvas.setActiveObject(cloned);
            canvas.requestRenderAll();
        });
    };

    // Layering
    const bringForward = () => {
        if (!canvas || !selectedObject) return;
        canvas.bringObjectForward(selectedObject);
        canvas.renderAll();
    };

    const sendBackward = () => {
        if (!canvas || !selectedObject) return;
        canvas.sendObjectBackwards(selectedObject);
        canvas.renderAll();
    };

    // Properties Changes
    const handleColorChange = (e) => {
        if (!canvas || !selectedObject) return;
        selectedObject.set("fill", e.target.value);
        canvas.renderAll();
    };

    const handleStrokeColorChange = (e) => {
        if (!canvas || !selectedObject) return;
        selectedObject.set("stroke", e.target.value);
        canvas.renderAll();
    };

    const handleFontSizeChange = (e) => {
        if (!canvas || !selectedObject) return;
        selectedObject.set("fontSize", parseInt(e.target.value));
        canvas.renderAll();
    };

    const handleOpacityChange = (e) => {
        if (!canvas || !selectedObject) return;
        selectedObject.set("opacity", parseFloat(e.target.value));
        canvas.renderAll();
    };

    // Save Design
    // CARA 1: Menggunakan setData (RECOMMENDED)
const handleSave = () => {
    if (!canvas) return;
    
    const json = canvas.toJSON();
    const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
        multiplier: 0.5,
    });

    // Update semua data sekaligus
    setData({
        title: designTitle,
        type: design?.type || "custom",
        canvas_data: JSON.stringify(json),
        thumbnail_url: dataUrl,
    });

    // Submit setelah data diupdate (gunakan setTimeout untuk memastikan state terupdate)
    setTimeout(() => {
        if (design) {
            put(route("studio.update", design.id), {
                onError: (errors) => {
                    console.error("Save failed:", errors);
                    alert("Gagal menyimpan desain: " + JSON.stringify(errors));
                },
                onSuccess: () => {
                    alert("Desain berhasil disimpan!");
                }
            });
        } else {
            post(route("studio.store"), {
                onError: (errors) => {
                    console.error("Save failed:", errors);
                    alert("Gagal menyimpan desain: " + JSON.stringify(errors));
                },
                onSuccess: () => {
                    alert("Desain berhasil disimpan!");
                }
            });
        }
    }, 0);
};

// CARA 2: Tanpa useForm (ALTERNATIVE - SIMPLER)
const handleSaveAlt = async () => {
    if (!canvas) return;
    
    const json = canvas.toJSON();
    const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
        multiplier: 0.5,
    });

    const payload = {
        title: designTitle,
        type: design?.type || "custom",
        canvas_data: JSON.stringify(json),
        thumbnail_url: dataUrl,
    };

    try {
        const response = await fetch(
            design 
                ? route("studio.update", design.id)
                : route("studio.store"),
            {
                method: design ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(payload)
            }
        );

        if (response.ok) {
            alert("Desain berhasil disimpan!");
            if (!design) {
                const result = await response.json();
                window.location.href = route('studio.edit', result.id);
            }
        } else {
            const error = await response.json();
            alert("Gagal menyimpan: " + JSON.stringify(error));
        }
    } catch (error) {
        console.error("Save error:", error);
        alert("Terjadi kesalahan saat menyimpan");
    }
};

    // Export Image
    const handleExport = () => {
        if (!canvas) return;
        const dataUrl = canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2,
        });
        const link = document.createElement('a');
        link.download = `${designTitle}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title={`Editor - ${designTitle}`} />

            <div className="fixed inset-0 z-50 flex flex-col h-screen overflow-hidden bg-gray-100">
                {/* Header Toolbar */}
                <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("studio.index")}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <input
                            type="text"
                            value={designTitle}
                            onChange={(e) => setDesignTitle(e.target.value)}
                            className="border-none focus:ring-0 font-semibold text-lg text-gray-800 bg-transparent hover:bg-gray-50 rounded px-2"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExport}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        >
                            <Download size={18} className="mr-2" />
                            Export
                        </button>
                        <button
                            onClick={handleSaveAlt}
                            disabled={processing}
                            className="flex items-center px-4 py-2 bg-bluey text-white hover:bg-blue-700 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
                        >
                            <Save size={18} className="mr-2" />
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Left Sidebar - Tools */}
                    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4 z-10 shadow-sm overflow-y-auto">
                        <ToolButton icon={<Type />} label="Teks" onClick={addText} />
                        <div className="w-12 h-px bg-gray-200 my-1" />
                        <ToolButton icon={<Square />} label="Kotak" onClick={addRect} />
                        <ToolButton icon={<Circle />} label="Lingkaran" onClick={addCircle} />
                        <ToolButton icon={<Triangle />} label="Segitiga" onClick={addTriangle} />
                        <ToolButton icon={<Star />} label="Bintang" onClick={addStar} />
                        <ToolButton icon={<Minus className="rotate-45" />} label="Garis" onClick={addLine} />
                        
                        <div className="w-12 h-px bg-gray-200 my-1" />
                        
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                        />
                        <ToolButton 
                            icon={<Upload />} 
                            label="Upload" 
                            onClick={() => fileInputRef.current?.click()} 
                        />
                    </div>

                    {/* Center - Canvas Area */}
                    <div className="flex-1 bg-gray-200 overflow-auto flex items-center justify-center p-8 relative">
                        <div className="shadow-2xl bg-white">
                            <canvas ref={canvasRef} />
                        </div>
                    </div>

                    {/* Right Sidebar - Properties */}
                    <div className="w-72 bg-white border-l border-gray-200 flex flex-col z-10 shadow-sm">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-semibold text-gray-800">Properti</h3>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto">
                            {selectedObject ? (
                                <div className="space-y-6">
                                    {/* Color Picker */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Warna Isi
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={selectedObject.fill || "#000000"}
                                                onChange={handleColorChange}
                                                className="h-10 w-full rounded cursor-pointer border border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Stroke Color (for lines/shapes) */}
                                    {(selectedObject.type === 'line' || selectedObject.stroke) && (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                                Warna Garis
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={selectedObject.stroke || "#000000"}
                                                    onChange={handleStrokeColorChange}
                                                    className="h-10 w-full rounded cursor-pointer border border-gray-300"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Text Properties */}
                                    {selectedObject.type === 'i-text' && (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                                Ukuran Font
                                            </label>
                                            <input
                                                type="number"
                                                value={selectedObject.fontSize || 24}
                                                onChange={handleFontSizeChange}
                                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    )}

                                    {/* Opacity */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Transparansi: {Math.round((selectedObject.opacity || 1) * 100)}%
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={selectedObject.opacity || 1}
                                            onChange={handleOpacityChange}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Layering & Actions */}
                                    <div className="pt-4 border-t border-gray-100 space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={bringForward}
                                                className="flex items-center justify-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                                                title="Bawa ke Depan"
                                            >
                                                <ArrowUp size={16} className="mr-1" />
                                                Depan
                                            </button>
                                            <button
                                                onClick={sendBackward}
                                                className="flex items-center justify-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                                                title="Kirim ke Belakang"
                                            >
                                                <ArrowDown size={16} className="mr-1" />
                                                Belakang
                                            </button>
                                        </div>

                                        <button
                                            onClick={cloneSelected}
                                            className="w-full flex items-center justify-center px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition-colors"
                                        >
                                            <Copy size={18} className="mr-2" />
                                            Duplikasi
                                        </button>

                                        <button
                                            onClick={deleteSelected}
                                            className="w-full flex items-center justify-center px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors"
                                        >
                                            <Trash2 size={18} className="mr-2" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 py-12">
                                    <Layers size={48} className="mx-auto mb-4 opacity-20" />
                                    <p className="text-sm">Pilih objek di kanvas untuk melihat dan mengedit propertinya</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ToolButton({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-bluey transition-all group active:scale-95"
            title={label}
        >
            <div className="mb-1 group-hover:text-bluey transition-colors">{icon}</div>
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
}
