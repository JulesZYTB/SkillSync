import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { UserPlus, X } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "collaborator"
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    api.users.browse()
      .then(setUsers)
      .finally(() => setLoading(false));
  };

  const handleOpenModal = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        full_name: user.full_name,
        email: user.email,
        password: "",
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        full_name: "",
        email: "",
        password: "",
        role: "collaborator"
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.users.edit(editingUser.id, {
          full_name: formData.full_name,
          email: formData.email,
          role: formData.role
        });
      } else {
        await api.users.add(formData);
      }
      loadUsers();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Erreur");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer ?")) {
      await api.users.destroy(id);
      setUsers(users.filter(u => u.id !== id));
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
        >
          <UserPlus size={16} />
          <span>Ajouter</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Nom</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Email</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Rôle</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{user.full_name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-0.5 border border-gray-200 dark:border-gray-600 rounded text-gray-600 dark:text-gray-400 uppercase">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(user)} className="text-blue-600 hover:underline">Modifier</button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/30">
              <h2 className="font-bold text-gray-900 dark:text-white">
                {editingUser ? "Modifier" : "Nouvel utilisateur"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Nom complet</label>
                <input 
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none focus:border-blue-500 text-sm"
                  required
                />
              </div>

              {!editingUser && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Mot de passe</label>
                  <input 
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Rôle</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none focus:border-blue-500 text-sm appearance-none"
                >
                  <option value="collaborator">Collaborateur</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="flex-1 py-2 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded text-sm"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
