module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  rules: {
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  }
};
