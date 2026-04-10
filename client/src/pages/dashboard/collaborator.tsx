import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Star, CheckCircle, Briefcase, ListTodo, AlertCircle } from "lucide-react";
import type { Project, Task, UserSkill, Skill } from "../../types";

// Selon le role que l'on n'a on a un dashboard différent
// Collaborator, Manager, Admin
// Collaborator : Dashboard avec ses compétences et ses tâches
// Manager : Dashboard avec ses projets et ses tâches
// Admin : Dashboard avec ses utilisateurs et ses projets

export default function CollaboratorDashboard() {
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [catalogue, setCatalogue] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.skills.mine(), 
      api.skills.browse(),
      api.projects.mine(),
      api.tasks.mine()
    ])
    .then(([mySkills, allSkills, myProjects, myTasks]) => {
      setSkills(mySkills);
      setCatalogue(allSkills);
      setProjects(myProjects);
      setTasks(myTasks);
    })
    .finally(() => setLoading(false));
  }, []);

  const handleEvaluate = async (skillId: number, level: number) => {
    try {
      await api.skills.evaluate({ skill_id: skillId, level });
      setMessage("Compétence mise à jour !");
      setTimeout(() => setMessage(""), 3000);
      
      const skill = catalogue.find(s => s.id === skillId);
      if (!skill) return;
      const skillName = skill.label;
      
      const existing = skills.find(s => s.label === skillName);
      if (existing) {
        setSkills(skills.map(s => s.label === skillName ? { ...s, level } : s));
      } else {
        setSkills([...skills, { label: skillName, level }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold mb-1">Mon Profil</h1>
        <p className="text-gray-500 text-sm">Évaluez vos compétences.</p>
      </div>

      {message && (
        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 border border-green-200 rounded text-sm font-medium">
          <CheckCircle size={16} />
          <span>{message}</span>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Mes Tops Skills</h2>
          <div className="space-y-2">
            {skills.length === 0 ? (
              <p className="p-6 text-center text-gray-400 bg-gray-50 dark:bg-gray-800 border rounded italic text-sm">
                Aucune compétence.
              </p>
            ) : (
              skills.sort((a,b) => b.level - a.level).map((skill) => (
                <div key={skill.label} className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm">
                  <span className="font-medium text-sm">{skill.label}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={14} className={`${star <= skill.level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold">Auto-évaluer</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 space-y-4 shadow-sm">
            <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-700">
              {catalogue.slice(0, 10).map(skill => {
                const myLevel = skills.find(s => s.label === skill.label)?.level || 0;
                return (
                  <div key={skill.id} className="pt-3 first:pt-0 flex items-center justify-between">
                    <span className="font-medium text-sm">{skill.label}</span>
                    <div className="flex gap-1 items-center">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                                  <button 
                                    key={star} 
                                    type="button"
                                    onClick={() => handleEvaluate(skill.id, star)}
                                    className="hover:scale-110 active:scale-[0.9] transition-transform"
                                  >
                            <Star size={18} className={`${star <= myLevel ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 dark:text-gray-600 hover:text-yellow-200'}`} />
                          </button>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 w-8">{myLevel > 0 ? `${myLevel}/5` : '-'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {catalogue.length > 10 && <p className="text-center text-xs text-blue-600 hover:underline cursor-pointer font-medium">Tout voir</p>}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={20} className="text-blue-500" />
            <h2 className="text-lg font-bold">Mes Missions</h2>
          </div>
          <div className="space-y-3">
            {projects.length === 0 ? (
              <p className="p-6 text-center text-gray-400 bg-gray-50 dark:bg-gray-800 border rounded italic text-sm">
                Aucun projet assigné.
              </p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm group hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{project.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 border border-gray-200 dark:border-gray-600 rounded text-gray-500 uppercase font-medium">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ListTodo size={20} className="text-indigo-500" />
            <h2 className="text-lg font-bold">Mes Tâches à faire</h2>
          </div>
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="p-6 text-center text-gray-400 bg-gray-50 dark:bg-gray-800 border rounded italic text-sm">
                Aucune tâche en attente.
              </p>
            ) : (
              tasks.filter(t => t.status !== 'done').map((task) => (
                <div key={task.id} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-l-blue-500 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] px-1.5 py-0.5 border rounded font-bold uppercase ${task.priority === 'high' || task.priority === 'urgent' ? 'border-red-200 text-red-600' : 'border-blue-200 text-blue-600'}`}>
                      {task.priority}
                    </span>
                    <h4 className="font-bold text-xs truncate">{task.title}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                       <AlertCircle size={10} className="text-gray-400" />
                       <span className="text-[10px] text-gray-500 capitalize">{task.status.replace('_', ' ')}</span>
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => api.tasks.updateStatus(task.id, 'done').then(() => window.location.reload())}
                      className="text-[9px] px-2 py-0.5 bg-green-100 text-green-700 hover:bg-green-200 rounded font-bold transition-colors"
                    >
                      Terminer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
