import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import tseslint from 'typescript-eslint'
>>>>>>> 9dff4cf (meow)
=======
import tseslint from 'typescript-eslint'
>>>>>>> 10bb505 (serious meow)
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
<<<<<<< HEAD
<<<<<<< HEAD
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
=======
=======
>>>>>>> 10bb505 (serious meow)
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
<<<<<<< HEAD
>>>>>>> 9dff4cf (meow)
=======
>>>>>>> 10bb505 (serious meow)
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
<<<<<<< HEAD
<<<<<<< HEAD
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
=======
>>>>>>> 9dff4cf (meow)
=======
>>>>>>> 10bb505 (serious meow)
    },
  },
])
