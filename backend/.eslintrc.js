module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'indent': ['error', 2],

    'object-curly-spacing': ['error', 'always'],

    'array-bracket-spacing': ['error', 'always'],

  },
};
