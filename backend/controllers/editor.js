import { Editor } from "../models/editor.js";

export const editorController = {
  
  async getOne(req, res) {
    
    // Récupération de l'id de l'editeur
    const editorId = parseInt(req.params.id, 10);
    // Recherche de l'editeur par son id
    const editor = await Editor.findByPk(editorId);
    // Gestion d'une erreur
    if (!editor) {
      return res.status(404).json({ error: "Éditeur non trouvé" });
    }
    // Renvoi des données
    res.json(editor);
  } 
    
};
