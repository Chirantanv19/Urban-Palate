import { supabase } from "@/lib/supabase";
import StatusButtons from "@/components/admin/StatusButtons";
import { logout } from "@/lib/actions/auth";
import { Users, Calendar, Clock, LogOut, LayoutDashboard } from "lucide-react";

export default async function AdminDashboard() {
    const { data: reservations, error } = await supabase
        .from("reservations")
        .select("*")
        .order("reservation_date", { ascending: false });

    if (error) return <div className="p-20 text-center">Connection error.</div>;

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pt-32 pb-12 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest mb-1">
                            <LayoutDashboard size={14} />
                            Management
                        </div>
                        <h1 className="text-4xl font-display font-bold text-slate-900">Dashboard</h1>
                    </div>

                    <form action={logout}>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm">
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </form>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        icon={<Calendar className="text-blue-600" />}
                        label="Total Bookings"
                        value={reservations?.length || 0}
                    />
                    <StatCard
                        icon={<Users className="text-emerald-600" />}
                        label="Total Guests"
                        value={reservations?.reduce((acc, curr) => acc + curr.guests, 0) || 0}
                    />
                    <StatCard
                        icon={<Clock className="text-amber-600" />}
                        label="Pending"
                        value={reservations?.filter(r => r.status === 'pending').length || 0}
                    />
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-slate-800">Recent Reservations</h2>
                        <span className="text-xs font-medium text-slate-400">Real-time updates active</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                                    <th className="px-8 py-4">Guest</th>
                                    <th className="px-8 py-4">Schedule</th>
                                    <th className="px-8 py-4">Party Size</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {reservations?.map((res) => (
                                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="font-bold text-slate-700">{res.customer_name}</p>
                                            <p className="text-xs text-slate-400">{res.email}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-medium text-slate-600">{res.reservation_date}</p>
                                            <p className="text-xs font-bold text-primary-600 italic">{res.reservation_time}</p>
                                        </td>
                                        <td className="px-8 py-5 text-slate-600 font-medium">
                                            {res.guests} Pax
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                                    res.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-amber-100 text-amber-700'
                                                }`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <StatusButtons id={res.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number | string }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <p className="text-3xl font-display font-bold text-slate-800 leading-none mt-1">{value}</p>
            </div>
        </div>
    );
}