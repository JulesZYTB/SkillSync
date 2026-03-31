import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";
import { useAuth } from "../services/AuthContext";

// Crée a l'aide de tutoriel sur Youtube en bien evidament avec la documentation de vitest et react testing library

// Mock de useAuth pour simuler le comportement de l'authentification
vi.mock("../services/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Login Page", () => {
  it("affiche le titre et les champs du formulaire", () => {
    // Configuration du mock pour ce test
    (useAuth as any).mockReturnValue({ login: vi.fn() });
    
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Vérification de la présence des éléments
    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Se connecter" })).toBeInTheDocument();
  });

  it("affiche un message d'erreur en cas d'échec de connexion", async () => {
    // Mock d'une erreur de connexion
    const mockLogin = vi.fn().mockRejectedValue(new Error("Identifiants invalides"));
    (useAuth as any).mockReturnValue({ login: mockLogin });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simulation de la saisie
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Mot de passe"), { target: { value: "password" } });
    
    // Simulation du clic sur le bouton
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    // Attente et vérification du message d'erreur
    await waitFor(() => {
      expect(screen.getByText("Identifiants invalides")).toBeInTheDocument();
    });
  });
});
