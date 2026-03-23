import { useAuth } from "./services/AuthContext";
import { Briefcase } from "lucide-react";
import CollaboratorDashboard from "./pages/dashboard/collaborator";
import AdminDashboard from "./pages/admin/dashboard";

// Cette application web et disponible que pour les utilisateurs connectés eet qui ont un role comme admin, manager ou collaborator!

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-full">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-20">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
          Bienvenue sur SkillSync
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          La plateforme intelligente pour la gestion des compétences et des projets.
        </p>
        <a href="/login" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-lg transition-all active:scale-[0.98]">
          Commencer maintenant
        </a>
      </div>
    );
  }

  // Redirect or render dashboard based on role
  if (user.role === "collaborator") {
    return <CollaboratorDashboard />;
  }

  if (user.role === "admin" || user.role === "manager") {
    return <AdminDashboard />;
  }


  return (
    // Dans une prochaine version je pourrai rajoute le dashboard manager pour géré les projets et les collaborateurs
    // Version tempo avec le dashboard admin ! 
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Dashboard Manager</h1>
        <p className="text-gray-600 dark:text-gray-400">Gérez vos projets et votre équipe.</p>
      </div>

      <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
        <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-bold mb-2">Module Manager en cours d'extension</h2>
        <p className="text-gray-500">Bientôt disponible : Gestion complète des projets et assignation des tâches.</p>
      </div>
    </div>
  );
}

export default App;
