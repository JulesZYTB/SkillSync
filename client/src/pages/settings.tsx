import { useAuth } from "../services/AuthContext";

export default function Settings() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Paramètres</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 mb-6">Gérez vos préférences et votre compte SkillSync.</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Nom complet</p>
              <p className="font-medium">{user.full_name}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
            <span>Mode Sombre (Soon...)</span>
            <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
            <span>Notifications Email (Soon...)</span>
            <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
