import js from "@eslint/js";
import globals from "globals";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".next", "src_legacy_vite"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...nextVitals,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
