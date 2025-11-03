import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["/setupTests.ts"],
  },
});

//Exécution les tests avec npx vitest