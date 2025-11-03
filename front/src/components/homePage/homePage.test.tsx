//test d'intégration apparition de la balise h1 dans la page
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./homePage"; 
import axios from "axios";
import { vi } from "vitest";

// Mock axios pour éviter les appels réels
vi.mock("axios");

describe("HomePage", () => {
  beforeEach(() => {
    // Mock des données retournées par axios
    vi.mocked(axios.get).mockImplementation((url) => {
      if (url === "http://localhost:3000/challenges/top-liked") {
        return Promise.resolve({
          data: {
            topChallenges: [
              { id: 1, title: "Challenge 1" },
              { id: 2, title: "Challenge 2" },
              { id: 3, title: "Challenge 3" },
            ],
          },
        });
      } else if (url === "http://localhost:3000/games/most-challenged") {
        return Promise.resolve({
          data: {
            games: [
              { id: 1, name: "Game 1" },
              { id: 2, name: "Game 2" },
            ],
          },
        });
      }
      return Promise.reject(new Error("URL non mockée"));
    });
  });

  it("affiche le contenu de la balise h1", async () => {
    // Rendu du composant
    render(<HomePage />);

    // Attendre que le contenu soit chargé
    const h1Element = await screen.findByText("Relevez les défis");
    expect(h1Element).toBeInTheDocument();
    expect(h1Element.tagName).toBe("H1");
  });
});
