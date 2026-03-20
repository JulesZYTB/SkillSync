import { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  Plus,
  Trash2,
  User,
  X,
  Briefcase
} from "lucide-react";

// crée des projets et assigner des tâches aux utilisateurs

export default function ProjectTasks() {
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    status: "planned"
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
    priority: "medium",
    project_id: null as number | null
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projData, userData] = await Promise.all([
        api.projects.browse(),
        api.users.browse()
      ]);
      setProjects(projData);
      setUsers(userData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.projects.add(projectForm);
      setProjectModalOpen(false);
      setProjectForm({ title: "", description: "", status: "planned" });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm("Supprimer ce projet ?")) {
      try {
        await api.projects.destroy(id);
        loadData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!taskForm.project_id) return;
      await api.tasks.add({
        ...taskForm,
        assigned_to: taskForm.assigned_to ? Number(taskForm.assigned_to) : null
      });
      setTaskModalOpen(false);
      setTaskForm({ title: "", description: "", assigned_to: "", priority: "medium", project_id: null });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (confirm("Supprimer cette tâche ?")) {
      try {
        await api.tasks.destroy(id);
        loadData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projets & Missions</h1>
          <p className="text-gray-500 text-sm">Gérez les projets et assignez des missions.</p>
        </div>
        <button
          onClick={() => setProjectModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700"
        >
          <Plus size={16} />
          Nouveau Projet
        </button>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <Briefcase size={48} className="mx-auto mb-2 text-gray-200" />
            <h3 className="font-bold text-gray-400">Aucun projet</h3>
          </div>
        ) : projects.map(project => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 border border-gray-200 dark:border-gray-600 rounded text-gray-500 uppercase tracking-tighter">
                    {project.status}
                  </span>
                  <h2 className="font-bold">{project.title}</h2>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-600 hover:underline text-xs"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => {
                    setTaskForm({ ...taskForm, project_id: project.id });
                    setTaskModalOpen(true);
                  }}
                  className="bg-white dark:bg-gray-700 text-indigo-600 px-3 py-1 border border-indigo-200 dark:border-indigo-800 rounded text-xs font-bold hover:bg-indigo-50"
                >
                  Ajouter tâche
                </button>
              </div>
            </div>

            <div className="p-4">
              <ProjectTasksList projectId={project.id} users={users} onDeleteTask={handleDeleteTask} />
            </div>
          </div>
        ))}
      </div>

      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
              <h2 className="font-bold">Nouveau Projet</h2>
              <button onClick={() => setProjectModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateProject} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Titre</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <textarea
                  required
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none h-24 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 text-sm"
              >
                Créer
              </button>
            </form>
          </div>
        </div>
      )}

      {taskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h2 className="font-bold">Nouvelle Tâche</h2>
              <button onClick={() => setTaskModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateTask} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Titre</label>
                <input
                  type="text"
                  required
                  value={taskForm.title}
                  onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Assigner</label>
                <select
                  value={taskForm.assigned_to}
                  onChange={e => setTaskForm({ ...taskForm, assigned_to: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded outline-none text-sm appearance-none"
                >
                  <option value="">Non assigné</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.full_name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Priorité</label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high', 'urgent'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTaskForm({ ...taskForm, priority: p as any })}
                      className={`flex-1 py-1 text-[10px] font-bold uppercase rounded border transition-all ${taskForm.priority === p
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-700 text-gray-400 border-gray-200 dark:border-gray-600'
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 text-sm"
              >
                Assigner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectTasksList({ projectId, users, onDeleteTask }: { projectId: number, users: any[], onDeleteTask: (id: number) => void }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.tasks.browse(projectId)
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <div className="text-xs text-gray-400 italic">Chargement des tâches...</div>;

  if (tasks.length === 0) return <p className="text-gray-400 italic text-xs">Aucune tâche.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tasks.map(task => {
        const assignee = users.find(u => u.id === task.assigned_to);
        return (
          <div key={task.id} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex justify-between items-center group">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[8px] px-1 border rounded font-bold uppercase ${task.priority === 'urgent' ? 'border-red-200 text-red-600' :
                  task.priority === 'high' ? 'border-orange-200 text-orange-600' :
                    'border-blue-200 text-blue-600'
                  }`}>
                  {task.priority}
                </span>
                <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate max-w-[100px]">{task.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={10} className="text-gray-400" />
                <span className="text-[10px] text-gray-500">{assignee?.full_name || "Non assigné"}</span>
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-red-500 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            >
              <Trash2 size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
