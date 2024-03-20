module.exports = {
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "prettier", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
