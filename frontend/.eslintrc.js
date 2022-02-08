module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es2021": true,
    "jest": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@emotion",
  ],

  "rules": {
    "semi": ["error", "always"],
    "react/prop-types": "off",
    "indent": ["error", 2, { "StaticBlock": {"body": 1} }],
    "object-curly-spacing": ["error", "always"],
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
    
    // emotion rules
    "@emotion/syntax-preference": [2, "string"],
    "@emotion/no-vanilla": "error",
    "@emotion/import-from-emotion": "error",
    "@emotion/styled-import": "error",
  },
};
