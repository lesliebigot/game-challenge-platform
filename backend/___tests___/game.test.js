import { jest } from "@jest/globals";
import { gameController } from "../controllers/game.js";
import { Game } from "../database/models/game.js";

// commenter les lignes 28 à 37 de l'index.js dans le backend pour effectuer les tests

jest.spyOn(Game, "findByPk");

describe("gameController tests", () => {
  describe("getOne()", () => {
    it("devrait récupérer un jeu avec l'ID valide", async () => {
      const mockGame = {
        id: 1,
        title: "Battlefield 6",
        description: "Un jeu de guerre",
        challenges: [{ id: 1, title: "Challenge 1", description: "Description 1" }],
        Genre: { id: 1, name: "FPS" },
        platforms: [{ id: 1, name: "PC" }],
        editor: { id: 1, name: "Electronic Arts" },
      };

      Game.findByPk.mockResolvedValue(mockGame);

      const req = { params: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await gameController.getOne(req, res);

      expect(Game.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGame);
    });
  });
});
