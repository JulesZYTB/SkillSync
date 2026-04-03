import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Settings from "../pages/settings";
import { useAuth } from "../services/AuthContext";

vi.mock("../services/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Settings Page", () => {
  it("affiche les informations de l'utilisateur connecté", () => {
    (useAuth as any).mockReturnValue({
      user: {
        full_name: "Jean Dupont",
        email: "jean.dupont@example.com",
      },
    });

    render(<Settings />);

    expect(screen.getByText("Jean Dupont")).toBeInTheDocument();
    expect(screen.getByText("jean.dupont@example.com")).toBeInTheDocument();
  });
});
