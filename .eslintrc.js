module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    browser: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": ["off", "windows"],
    "comma-dangle": ["error", "only-multiline"],
  },
  plugins: ["ejs"],
};
