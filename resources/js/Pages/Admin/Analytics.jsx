import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    User,
    GraduationCap,
    Award,
    TrendingUp,
    Users,
    BookOpen,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

export default function Analytics({ auth, title, stats, topCourses, recentUsers }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value) => {
        return new Intl.NumberFormat("id-ID").format(value);
    };

    // Mock Data for Charts
    const revenueData = [
        { name: "Jan", value: 240000000 },
        { name: "Feb", value: 139800000 },
        { name: "Mar", value: 980000000 },
        { name: "Apr", value: 390800000 },
        { name: "May", value: 480000000 },
        { name: "Jun", value: 380000000 },
        { name: "Jul", value: 430000000 },
    ];

    const userGrowthData = [
        { name: "Mon", users: 40 },
        { name: "Tue", users: 30 },
        { name: "Wed", users: 20 },
        { name: "Thu", users: 27 },
        { name: "Fri", users: 18 },
        { name: "Sat", users: 23 },
        { name: "Sun", users: 34 },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-bluey mb-6">
                            Analitik Plato
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Total Pengguna Card */}
                            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 overflow-hidden shadow-lg sm:rounded-xl p-6 text-white relative">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <User size={64} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Users size={24} />
                                        </div>
                                        <p className="text-white/90 font-medium">
                                            Total Pengguna
                                        </p>
                                    </div>
                                    <p className="text-4xl font-bold mb-2">
                                        {formatNumber(stats.total_users)}
                                    </p>
                                    <div className="flex items-center text-sm text-white/80">
                                        <TrendingUp size={16} className="mr-1" />
                                        <span>+12% dari bulan lalu</span>
                                    </div>
                                </div>
                            </div>

                            {/* Kursus Aktif Card */}
                            <div className="bg-gradient-to-br from-green-400 to-emerald-600 overflow-hidden shadow-lg sm:rounded-xl p-6 text-white relative">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <GraduationCap size={64} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <BookOpen size={24} />
                                        </div>
                                        <p className="text-white/90 font-medium">
                                            Kursus Aktif
                                        </p>
                                    </div>
                                    <p className="text-4xl font-bold mb-2">
                                        {formatNumber(stats.active_courses)}
                                    </p>
                                    <div className="flex items-center text-sm text-white/80">
                                        <TrendingUp size={16} className="mr-1" />
                                        <span>+3 kursus baru minggu ini</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pendapatan Global Card */}
                            <div className="bg-gradient-to-br from-red-400 to-pink-600 overflow-hidden shadow-lg sm:rounded-xl p-6 text-white relative">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Award size={64} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Award size={24} />
                                        </div>
                                        <p className="text-white/90 font-medium">
                                            Pendapatan Global
                                        </p>
                                    </div>
                                    <p className="text-3xl font-bold mb-2">
                                        {formatCurrency(stats.global_revenue)}
                                    </p>
                                    <div className="flex items-center text-sm text-white/80">
                                        <TrendingUp size={16} className="mr-1" />
                                        <span>+8.5% dari tahun lalu</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Revenue Chart */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-800 mb-4">
                                Tren Pendapatan (6 Bulan Terakhir)
                            </h4>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={revenueData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorRevenue"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tickFormatter={(value) => `${value / 1000000}M`}
                                        />
                                        <Tooltip 
                                            formatter={(value) => formatCurrency(value)}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* User Growth Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-800 mb-4">
                                Pengguna Baru (Minggu Ini)
                            </h4>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={userGrowthData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                        <Tooltip 
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="users" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Top Courses & Recent Users */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Courses */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-800 mb-4">
                                Kursus Terpopuler
                            </h4>
                            <div className="space-y-4">
                                {topCourses.map((course, index) => (
                                    <div key={course.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="font-bold text-gray-400 w-6">{index + 1}</div>
                                        {course.thumbnail_url ? (
                                            <img src={course.thumbnail_url} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                <BookOpen size={20} />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h5 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h5>
                                            <p className="text-sm text-gray-500">{course.students_count} Siswa</p>
                                        </div>
                                    </div>
                                ))}
                                {topCourses.length === 0 && (
                                    <p className="text-gray-500 text-center py-4">Belum ada data kursus.</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Users */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-800 mb-4">
                                Pengguna Terbaru
                            </h4>
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="w-10 h-10 bg-bluey text-white rounded-full flex items-center justify-center font-bold">
                                            {user.avatar_initial}
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-semibold text-gray-900">{user.name}</h5>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <span className="text-xs text-gray-400">{user.joined_at}</span>
                                    </div>
                                ))}
                                {recentUsers.length === 0 && (
                                    <p className="text-gray-500 text-center py-4">Belum ada pengguna baru.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
