import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProjectTasks from "../pages/dashboard/projects";
import { useAuth } from "../services/AuthContext";
import { api } from "../services/api";

vi.mock("../services/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../services/api", () => ({
  api: {
    projects: {
      browse: vi.fn(),
      mine: vi.fn(),
    },
    users: {
      browse: vi.fn(),
    },
    tasks: {
      browse: vi.fn(),
    },
  },
}));

describe("ProjectTasks Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche la liste des projets pour un administrateur", async () => {
    (useAuth as any).mockReturnValue({
      user: { id: 1, role: "admin" },
    });

    const mockProjects = [
      { id: 1, title: "Projet Alpha", status: "en cours" },
      { id: 2, title: "Projet Beta", status: "terminé" },
    ];

    (api.projects.browse as any).mockResolvedValue(mockProjects);
    (api.users.browse as any).mockResolvedValue([]);
    (api.tasks.browse as any).mockResolvedValue([]);

    render(<ProjectTasks />);

    await waitFor(() => {
      expect(screen.getByText("Projet Alpha")).toBeInTheDocument();
      expect(screen.getByText("Projet Beta")).toBeInTheDocument();
    });
  });

  it("affiche un message si aucun projet n'est trouvé", async () => {
    (useAuth as any).mockReturnValue({
      user: { id: 1, role: "admin" },
    });

    (api.projects.browse as any).mockResolvedValue([]);
    (api.users.browse as any).mockResolvedValue([]);

    render(<ProjectTasks />);

    await waitFor(() => {
      expect(screen.getByText("Aucun projet assigné")).toBeInTheDocument();
    });
  });
});
