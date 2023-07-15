module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: [
    'prettier',
    'simple-import-sort',
    'import',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'prettier/prettier': 'error',
  }
}
