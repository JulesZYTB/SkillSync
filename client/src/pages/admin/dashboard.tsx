import { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  Users,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useAuth } from "../../services/AuthContext";

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth<any>();

  useEffect(() => {
    api.users.getStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 text-sm">Chargement...</div>;
  }

  if (!stats) return null;

  const userDistribution = stats.users.map((u: any) => ({
    name: u.role.charAt(0).toUpperCase() + u.role.slice(1),
    value: u.count
  }));

  const projectStatus = stats.projects.map((p: any) => ({
    name: p.status.charAt(0).toUpperCase() + p.status.slice(1),
    count: p.count
  }));

  const totalUsers = stats.users.reduce((acc: number, curr: any) => acc + curr.count, 0);

  return (
    // Statics dashboard crée a l'un de l'ia pour les graphiques
    <div className="space-y-6">
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          Tableau de Bord
        </h1>
        <p className="text-gray-500 text-sm">Résumé de l'activité.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {user.role === "admin" && (
          <StatCard title="Utilisateurs" value={totalUsers} label="Total" /> 
        )}
        <StatCard title="Projets" value={stats.projects.find((p: any) => p.status === 'active')?.count || 0} label="Actifs" />
        <StatCard title="Compétences" value={stats.skills} label="Catalogue" />
        <StatCard title="Tâches" value={stats.tasks.find((t: any) => t.status === 'done')?.count || 0} label="Terminées" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {user.role === "admin" && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-bold flex items-center gap-2 mb-4">
              <Users size={16} className="text-blue-600" />
              Répartition des Rôles
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {userDistribution.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-bold flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-indigo-600" />
            État des Projets
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-bold mb-4">Missions en cours</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <ActivitySummary title="En attente" count={stats.tasks.find((t: any) => t.status === 'todo')?.count || 0} color="text-orange-500" />
          <ActivitySummary title="En revue" count={stats.tasks.find((t: any) => t.status === 'review')?.count || 0} color="text-blue-500" />
          <ActivitySummary title="Objectifs" count={stats.tasks.find((t: any) => t.status === 'done')?.count || 0} color="text-green-500" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, label }: any) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-gray-500 text-xs font-medium uppercase">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white my-1">{value}</p>
      <span className="text-[10px] text-gray-400">{label}</span>
    </div>
  );
}

function ActivitySummary({ title, count, color }: any) {
  return (
    <div className="px-4 py-2 border rounded border-gray-100 dark:border-gray-700 flex flex-col items-center min-w-[120px]">
      <span className="font-bold text-lg">{count}</span>
      <span className={`text-[10px] font-medium uppercase ${color}`}>{title}</span>
    </div>
  );
}
