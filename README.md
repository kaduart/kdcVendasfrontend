# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```.



ANNOTATIONS:
Tutorial ReactRouter 
https://github.com/devsuperior/tutorial-react-router-dom-6-4 

ReactRouter install => 
yarn add react-router-dom@6.4.1 @types/react-router-dom@5.3.3 

Regra geral para sub-rotasaninhadas 
**
 Se uma rota leva a um conteúdo, e dentro deste conteúdo há outro(s) subconteúdo(s) que correspondem a novas rotas, então deve-se definir os subconteúdo(s) como sub-rotas aninhadas. No conteúdo principal deverá haver um elemento <Outlet />para definir onde aparecerá o subconteúdo. 
  <Route path="/a/" element="{<Conteudo />}">  => /a
    <Route path="b" element="{<Subconteudo1 />}" />  => /a/b
    <Route path="c" element="{<Subconteudo2 />}" /> => a/c
  </Route> 
**
