import { jest } from "@jest/globals";
import { userController } from "../controllers/user.js";
import { User } from "../database/models/user.js";

// commenter les lignes 28 à 37 de l'index.js dans le backend pour effectuer les tests

// Mock de Sequelize
jest.spyOn(User, "findByPk");

describe("userController.getOne", () => {
  it("devrait retourner un utilisateur avec ses associations", async () => {
    const req = { user: { id: 1 } }; // ID de l'utilisateur connecté
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock du retour de findByPk
    User.findByPk.mockResolvedValue({
      id: 1,
      pseudo: "TestPseudo",
      email: "test@mail.com",
      createdChallenges: [{ id: 10, title: "Challenge 1", description: "desc" }],
      participatedChallenges: [{ id: 20, title: "Challenge 2", description: "desc" }],
      favoriteGames: ["Game 1", "Game 2"],
    });

    await userController.getOne(req, res);

    // Vérifications
    expect(User.findByPk).toHaveBeenCalledWith(1, {
      include: [
        { association: "createdChallenges", attributes: ["id", "title", "description"] },
        { association: "participatedChallenges", attributes: ["id", "title", "description"] },
        { association: "favoriteGames" },
      ],
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      pseudo: "TestPseudo",
      email: "test@mail.com",
      createdChallenges: [{ id: 10, title: "Challenge 1", description: "desc" }],
      participatedChallenges: [{ id: 20, title: "Challenge 2", description: "desc" }],
      favoriteGames: ["Game 1", "Game 2"],
    });
  });

  it("devrait retourner 404 si l'utilisateur n'existe pas", async () => {
    const req = { user: { id: 999 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findByPk.mockResolvedValue(null);

    await userController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Jeu non trouvé" });
  });
});
