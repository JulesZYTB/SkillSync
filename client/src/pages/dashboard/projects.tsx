import { useEffect, useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { api } from "../../services/api";
import {
  User as UserIcon,
  Briefcase
} from "lucide-react";
import type { Project, User, Task } from "../../types";

// Voir les projets ou l'on est assigné

export default function ProjectTasks() {
  const { user: currentUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const isCollaborator = currentUser?.role === "collaborator";
      const [projData, userData] = await Promise.all([
        isCollaborator ? api.projects.mine() : api.projects.browse(),
        isCollaborator ? Promise.resolve([]) : api.users.browse()
      ]);
      setProjects(projData);
      setUsers(isCollaborator && currentUser ? [currentUser] : userData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <Briefcase size={48} className="mx-auto mb-2 text-gray-200" />
            <h3 className="font-bold text-gray-400">Aucun projet assigné</h3>
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
            </div>

            <div className="p-4">
              <ProjectTasksList projectId={project.id} users={users} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function ProjectTasksList({ projectId, users }: { projectId: number, users: User[] }) {
  const { user: currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.tasks.browse(projectId)
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <div className="text-xs text-gray-400 italic">Chargement des tâches...</div>;

  const filteredTasks = currentUser?.role === "collaborator" 
    ? tasks.filter(t => t.assigned_to === currentUser.id)
    : tasks;

  if (filteredTasks.length === 0) return <p className="text-gray-400 italic text-xs">Aucune tâche assigné.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {filteredTasks.map(task => {
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
                <UserIcon size={10} className="text-gray-400" />
                <span className="text-[10px] text-gray-500">{assignee?.full_name || "Non assigné"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
