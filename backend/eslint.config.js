import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser,
        ...globals.node,
        ...globals.jest },
    },
    rules: {
      "semi": "error",
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    }
  }
];