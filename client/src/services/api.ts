const API_URL = import.meta.env.VITE_API_URL || "/api";

// API Utilisable pour tout les requets api pour evité les repetion de code

export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });


    if (res.status === 204) return null;
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || "Une erreur ses produite ! ");
    }
    
    return data;
  },

  auth: {
    login: (credentials: object) => api.fetch("/login", { 
      method: "POST", 
      body: JSON.stringify(credentials) 
    }),
    logout: () => api.fetch("/logout"),
    me: () => api.fetch("/me"),
  },

  users: {
    browse: () => api.fetch("/users"),
    read: (id: number) => api.fetch(`/users/${id}`),
    add: (user: object) => api.fetch("/users", { 
      method: "POST", 
      body: JSON.stringify(user) 
    }),
    edit: (id: number, user: object) => api.fetch(`/users/${id}`, { 
      method: "PUT", 
      body: JSON.stringify(user) 
    }),
    destroy: (id: number) => api.fetch(`/users/${id}`, { 
      method: "DELETE" 
    }),
    getStats: () => api.fetch("/stats"),
  },


  skills: {
    browse: () => api.fetch("/skills"),
    add: (skill: object) => api.fetch("/skills", { 
      method: "POST", 
      body: JSON.stringify(skill) 
    }),
    destroy: (id: number) => api.fetch(`/skills/${id}`, { 
      method: "DELETE" 
    }),
    mine: () => api.fetch("/me/skills"),
    evaluate: (evaluation: object) => api.fetch("/me/skills", { 
      method: "POST", 
      body: JSON.stringify(evaluation) 
    }),
  },

  projects: {
    browse: () => api.fetch("/projects"),
    add: (project: object) => api.fetch("/projects", { 
      method: "POST", 
      body: JSON.stringify(project) 
    }),
    destroy: (id: number) => api.fetch(`/projects/${id}`, { 
      method: "DELETE" 
    }),
    mine: () => api.fetch("/me/projects"),
  },


  tasks: {
    browse: (projectId?: number) => api.fetch(`/tasks${projectId ? `?project_id=${projectId}` : ""}`),
    add: (task: object) => api.fetch("/tasks", { 
      method: "POST", 
      body: JSON.stringify(task) 
    }),
    mine: () => api.fetch("/me/tasks"),
    updateStatus: (id: number, status: string) => api.fetch(`/tasks/${id}`, { 
      method: "PUT", 
      body: JSON.stringify({ status }) 
    }),
    destroy: (id: number) => api.fetch(`/tasks/${id}`, { 
      method: "DELETE" 
    }),
  }

};
