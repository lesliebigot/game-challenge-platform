import { jest } from "@jest/globals";
import { userController } from "../controllers/user.js";
import { User } from "../database/models/user.js";
import argon2 from "argon2";

// commenter les lignes 28 à 37 de l'index.js dans le backend pour effectuer les tests

jest.spyOn(User, "create"); // Spy au lieu de mock complet
jest.mock("argon2", () => ({
  hash: jest.fn((password) => `hashed-${password}`),
}));

describe("userController.createOne", () => {
  it("devrait créer un utilisateur et renvoyer les bonnes données", async () => {
    // Données du test
    const req = { body: { pseudo: "TestPseudo", email: "test@mail.com", password: "123456" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock du retour de User.create
    User.create.mockResolvedValue({
      id: 1,
      pseudo: req.body.pseudo,
      email: req.body.email,
      firstname: "John",
      lastname: "Doe",
      birthdate: "1990-01-01",
    });

    await userController.createOne(req, res);

    // Vérifications
    expect(argon2.hash).toHaveBeenCalledWith("123456");
    expect(User.create).toHaveBeenCalledWith({
      ...req.body,
      password: "hashed-123456",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Utilisateur créé avec succès",
      user: {
        id: 1,
        pseudo: "TestPseudo",
        email: "test@mail.com",
        firstname: "John",
        lastname: "Doe",
        birthdate: "1990-01-01",
      },
    });
  });
});