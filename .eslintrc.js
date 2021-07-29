module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'linebreak-style': 0,
    'comma-dangle': 0,
    'camelcase': 0,
    'quote-props': 0,
    'quotes': 0,
    'indent': 0,
    'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true }]
  },
};
