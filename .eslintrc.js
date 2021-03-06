'use strict'

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  plugins: [
    '@typescript-eslint',
    'deprecation',
  ],
  extends: [
    'google',
    'eslint:recommended',
  ],
  rules: {
    /* COMMON RULES (JS and TS) */

    // No logging / no debugging :-) Use our wrappers
    'no-console': 'warn',
    'no-debugger': 'warn',

    // Always have spaces around arrays and objects
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],

    // Always have newline character at the end of the file
    'eol-last': [ 'error', 'always' ],

    // Constraints for the max line length
    // 'max-len': [ 'error', { 'code': 120, 'comments': 80 } ],
    'max-len': [ 'off' ],

    // No more than 2 blank lines
    'no-multiple-empty-lines': [ 'error', { 'max': 2, 'maxBOF': 0, 'maxEOF': 1 } ],

    // Srings: either '...' or `... ${...} ...`, and no 'ab' + 'cd'
    'no-template-curly-in-string': [ 'error' ],
    'quotes': [ 'error', 'single', { 'allowTemplateLiterals': false } ],
    'no-useless-concat': [ 'error' ],

    // One variable per declaration, no "const x, y, ..."
    'one-var': [ 'error', 'never' ],

    // No semicolons
    'semi': [ 'error', 'never' ],

    // Remember our TODOs and FIXMEs
    'no-warning-comments': [ 'warn' ],

    // Allow TypeScript triple-slash comments
    'spaced-comment': [ 'error', 'always', { 'markers': [ '/ <reference' ] } ],

    // Warn on use of deprecated code (works only with @typescript-eslint/parser)
    'deprecation/deprecation': [ 'warn' ],

    /* OFF RULES */
    'camelcase': [ 'off' ], // do not require camelCase variables
    'guard-for-in': [ 'off' ], // allow unchecked for-in loops
    'no-undef': [ 'off' ], // it'll mark global types as undefs
    'require-jsdoc': [ 'off' ], // nope!
    'valid-jsdoc': [ 'off' ], // nope as well!
  },
  overrides: [ {
    /* SPECIFIC TYPESCRIPT RULES */
    files: [ '*.ts' ],
    rules: {
      '@typescript-eslint/no-redeclare': [ 'error' ],
      '@typescript-eslint/no-unused-vars': [ 'error' ],
      '@typescript-eslint/no-dupe-class-members': [ 'error' ],
      '@typescript-eslint/no-invalid-this': [ 'error' ],

      '@typescript-eslint/camelcase': [ 'off' ], // do not require camelCase variables (TS)
      '@typescript-eslint/no-floating-promises': [ 'error' ], // don't let promises hanging

      // explicit return types
      '@typescript-eslint/explicit-function-return-type': [ 'error', {
        'allowExpressions': true,
        'allowDirectConstAssertionInArrowFunctions': true,
        'allowConciseArrowFunctionExpressionsStartingWithVoid': true,
      } ],
    },
  }, {
    /* SPECIFIC JAVASCRIPT RULES */
    files: [ '*.js' ],
    rules: {
      'no-redeclare': [ 'error' ],
      'no-unused-vars': [ 'error' ],
      'no-dupe-class-members': [ 'error' ],
      'no-invalid-this': [ 'error' ],

      'strict': [ 'error', 'global' ],
    },
  } ],
}
