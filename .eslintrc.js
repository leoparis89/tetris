const OFF = 0;
const ERROR = 2;

module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "import", "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,
    'no-multi-spaces': ERROR,
    'brace-style': [ERROR, '1tbs'],
    'keyword-spacing': [ERROR, {after: true, before: true}],
    'eol-last': ERROR,
    'eqeqeq': [ERROR, 'allow-null'],
    'no-useless-concat': OFF,
    'object-curly-spacing': [ERROR, 'never']

    // 'comma-dangle': [ERROR, 'always-multiline'],
  }
};