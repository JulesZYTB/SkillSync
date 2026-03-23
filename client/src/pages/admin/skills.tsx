import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Plus, Trash2, Book } from "lucide-react";

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.skills.browse()
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const { insertId } = await api.skills.add({ label: newSkill });
    setSkills([...skills, { id: insertId, label: newSkill }]);
    setNewSkill("");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer ?")) {
      await api.skills.destroy(id);
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Chargement...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Catalogue des Compétences</h1>

      <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            placeholder="Nouvelle compétence..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded text-sm outline-none"
          />
          <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 font-medium">
            <Plus size={16} />
            <span>Ajouter</span>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {skills.map(skill => (
          <div key={skill.id} className="group p-3 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Book size={14} className="text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{skill.label}</span>
            </div>
            <button type="button"
              onClick={() => handleDelete(skill.id)}
              className="text-red-500 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 dark:hover:bg-red-900/10 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
