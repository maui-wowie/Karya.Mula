import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Plus, Image as ImageIcon, CreditCard, Tag, PenTool, Utensils } from "lucide-react";

export default function Index({ auth, designs, templates = [] }) {
    // Icon mapping for templates
    const iconMap = {
        'PenTool': <PenTool size={16} />,
        'ImageIcon': <ImageIcon size={16} />,
        'CreditCard': <CreditCard size={16} />,
        'Tag': <Tag size={16} />,
        'Utensils': <Utensils size={16} />,
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Studio Kreasi
                </h2>
            }
        >
            <Head title="Studio Kreasi" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 text-white mb-10 shadow-xl">
                        <div className="absolute inset-0">
                            <img 
                                src="/images/studioBG.png" 
                                alt="Studio Background" 
                                className="h-full w-full object-cover "
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                        </div>
                        <div className="relative z-1 p-10 md:p-16 max-w-2xl">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                Bangun Identitas Bisnismu
                            </h3>
                            <p className="text-gray-200 text-lg mb-8 max-w-lg">
                                Buat logo, banner, dan kemasan profesional tanpa ribet dengan tools desain kami yang mudah digunakan.
                            </p>
                            <Link
                                href={route("studio.create")}
                                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg mr-4"
                            >
                                <Plus className="mr-2" size={20} />
                                Buat Desain Baru
                            </Link>
                            <Link
                                href={route("assets.index")}
                                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                            >
                                <ImageIcon className="mr-2" size={20} />
                                Perpustakaan Aset
                            </Link>
                        </div>
                    </div>

                    {/* Templates */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-bluey mb-6">
                            Template Desain ({templates.length} templates)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {templates.map((template) => (
                                <Link
                                    key={template.id}
                                    href={route("studio.create", { template_id: template.id })}
                                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col h-full"
                                >
                                    <div className={`aspect-square ${template.thumbnail_url ? 'bg-white' : template.color.split(' ')[0]} flex items-center justify-center p-4 relative overflow-hidden`}>
                                        {template.thumbnail_url ? (
                                            <img 
                                                src={template.thumbnail_url} 
                                                alt={template.name} 
                                                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className={`w-16 h-16 rounded-full bg-white/50 flex items-center justify-center ${template.color.split(' ')[1]}`}>
                                                {iconMap[template.icon] || <PenTool size={32} />}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 text-center">
                                        <h4 className="font-bold text-gray-900 truncate">
                                            {template.name}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Designs */}
                    <div>
                        <h3 className="text-2xl font-bold text-bluey mb-6">
                            Desain Terakhir Anda
                        </h3>
                        
                        {designs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {designs.map((design) => (
                                    <Link
                                        key={design.id}
                                        href={route("studio.edit", design.id)}
                                        className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col h-full"
                                    >
                                        <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
                                            {design.thumbnail_url ? (
                                                <img 
                                                    src={design.thumbnail_url} 
                                                    alt={design.title} 
                                                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                    <PenTool size={32} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-900 mb-1 truncate">
                                                {design.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {new Date(design.updated_at).toLocaleDateString('id-ID', { 
                                                    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
                                                })}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                                    <ImageIcon size={32} />
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">Belum ada desain</h4>
                                <p className="text-gray-500 mb-6">Mulai buat identitas visual brand kamu sekarang.</p>
                                <Link
                                    href={route("studio.create")}
                                    className="text-bluey font-medium hover:underline"
                                >
                                    Buat Desain Pertama
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
