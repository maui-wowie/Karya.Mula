import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StatsCard from "./DashboardComponents/StatsCard";
import {
    Users,
    BookOpen,
    CheckCircle,
    TrendingUp,
    Activity,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";

export default function AdminDashboard({ stats, auth }) {
    console.log(stats);

    // Data untuk Course Completion Chart
    const completionData = [
        {
            name: "Selesai",
            value: stats.completedEnrollments || 0,
            color: "#10b981",
        },
        {
            name: "Dalam Progress",
            value: stats.inProgressEnrollments || 0,
            color: "#f59e0b",
        },
        {
            name: "Belum Dimulai",
            value: stats.notStartedEnrollments || 0,
            color: "#ef4444",
        },
    ];

    // Data untuk User Activity Chart (7 hari terakhir)
    const activityData = stats.recentActivity || [];

    // Data untuk Top Courses
    const topCoursesData = stats.topCourses || [];

    const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <section className="h-full space-y-6">
                <h1 className="text-3xl font-bold text-bluey">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-6">
                    <StatsCard
                        title={"Total Anggota"}
                        stats={stats.totalUsers || 0}
                        icon={<Users className="w-8 h-8 text-bluey" />}
                        color="bg-blue-50"
                    />
                    <StatsCard
                        title={"Total Kursus"}
                        stats={stats.totalCourses || 0}
                        icon={<BookOpen className="w-8 h-8 text-green-600" />}
                        color="bg-green-50"
                    />
                    <StatsCard
                        title={"Total Enrollment"}
                        stats={stats.totalEnrollments || 0}
                        icon={<Activity className="w-8 h-8 text-orange-600" />}
                        color="bg-orange-50"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Course Completion Status */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Status Penyelesaian Kursus
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={completionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(
                                            0
                                        )}%`
                                    }
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {completionData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-6 mt-4">
                            {completionData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className="w-4 h-4 rounded"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-gray-600">
                                        {item.name}: {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Activity */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Aktivitas User (7 Hari Terakhir)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Active Users"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Top Courses */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Top 5 Kursus Populer
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topCoursesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="enrollments"
                                    fill="#3b82f6"
                                    name="Jumlah Enrollment"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Users Table */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Anggota Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bergabung
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Progress
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {stats.recentUsers?.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.joined}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.completedModules}/
                                            {user.totalModules} Modul
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
