import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Placeholder({ auth, title }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <div className="p-4">
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                <p className="mt-4 text-gray-600">Halaman ini belum diimplementasikan. Anda berhasil mengakses route!</p>
            </div>
        </AuthenticatedLayout>
    );
}