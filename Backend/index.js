// imports
import "dotenv/config";
import express from "express";
import { router } from "./router.js";


export const app = express();

const PORT = process.env.PORT || 3000;

// test Configuration
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 l'api a démarré sur http://localhost:${PORT}`);
});
