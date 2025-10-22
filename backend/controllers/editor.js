import { Editor } from "../models/editor.js";

export const editorController = {
  async getOne(req, res) {
    
    const editorId = parseInt(req.params.id, 10);
    const editor = await Editor.findByPk(editorId);

    if (!editor) {
      return res.status(404).json({ error: "Éditeur non trouvé" });
    }

    res.json(editor);
  } 
    
};
