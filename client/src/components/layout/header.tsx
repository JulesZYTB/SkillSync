import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { LayoutDashboard, Users, BookOpen, LogOut, Settings, Briefcase } from "lucide-react";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <>
            {user && (
                <aside className="w-56 p-4 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                    <div>
                        <div className="mb-8 pl-2">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">SkillSync</h2>
                        </div>

                        <nav className="space-y-1">
                            <NavLink to={user.role === 'admin' ? '/admin' : '/'} className={({ isActive }) => `flex items-center gap-3 p-2 rounded text-sm transition-colors ${isActive ? "bg-blue-600 text-white font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                <LayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </NavLink>

                            {(user.role === "admin" || user.role === "manager") && (
                                <>
                                    {user.role === "admin" && (
                                        <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 p-2 rounded text-sm transition-colors ${isActive ? "bg-blue-600 text-white font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                            <Users size={18} />
                                            <span>Utilisateurs</span>
                                        </NavLink>
                                    )}
                                    <NavLink to="/admin/projects" className={({ isActive }) => `flex items-center gap-3 p-2 rounded text-sm transition-colors ${isActive ? "bg-blue-600 text-white font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                        <Briefcase size={18} />
                                        <span>Projets</span>
                                    </NavLink>
                                    <NavLink to="/admin/skills" className={({ isActive }) => `flex items-center gap-3 p-2 rounded text-sm transition-colors ${isActive ? "bg-blue-600 text-white font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                        <BookOpen size={18} />
                                        <span>Catalogue</span>
                                    </NavLink>
                                </>
                            )}

                            <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 p-2 rounded text-sm transition-colors ${isActive ? "bg-blue-600 text-white font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                <Settings size={18} />
                                <span>Paramètres</span>
                            </NavLink>
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button onClick={handleLogout} className="flex items-center w-full gap-3 p-2 text-red-600 rounded text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                            <LogOut size={18} />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </aside>
            )}
        </>
    )
}
