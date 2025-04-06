import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig(
  eslintPluginPrettierRecommended,
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  })
);
