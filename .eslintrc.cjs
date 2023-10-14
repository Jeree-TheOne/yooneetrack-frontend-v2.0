module.exports = {
  root: true,
  extends: [ 'eslint:recommended', '@nuxtjs/eslint-config-typescript' ],
  rules: {
    'no-console': 'error',
    'vue/require-prop-types': 'error',
    'vue/attribute-hyphenation': [ 'error', 'always' ],
    'vue/html-end-tags': 'error',
    'vue/component-name-in-template-casing': [ 'error', 'kebab-case' ],
    'vue/attributes-order': 'warn',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/order-in-components': 'off',
    'vue/first-attribute-linebreak': [ 'error', {
      singleline: 'beside',
      multiline: 'below'
    } ],
    'vue/multi-word-component-names': 'off',
    'vue/no-spaces-around-equal-signs-in-attribute': [ 'error' ],
    'vue/html-closing-bracket-newline': [ 'error' ],
    'vue/no-v-html': 'off',
    'space-before-function-paren': 'off',
    'no-empty-pattern': 'off',
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    semi: 'warn',
    curly: [ 2, 'multi-or-nest' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    quotes: [ 2, 'single', { avoidEscape: true } ],
    'comma-dangle': [ 'error', 'never' ],
    'block-spacing': [ 2, 'always' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
