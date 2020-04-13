## Setup

### Install

```bash
npm i -D rollup tslib typescript
npm i -D @rollup/plugin-commonjs @rollup/plugin-html @rollup/plugin-node-resolve @rollup/plugin-typescript
npm i -D rollup-plugin-serve
```

### Scripts

```js
"build": "rollup -c",
"dev": "rollup -c -w",
"test": "node test/test.js",
"pretest": "npm run build"
```

### Folder structure

```
node_modules\

src\
  index.ts
dist\
  bundle.js
  bundle.umd.js
  bundle.es.js

demo\
  index.js
output
  index.html
  index.js
```

### rollup.config.js

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve'

const libPlugins = [
  resolve(),
  commonjs(),
  typescript()
];

module.exports = [{
  input: 'src/index.ts',
  output: [{
    file: 'dist/bundle.js',
    format: 'cjs'
  }, {
    file: 'dist/bundle.umd.js',
    format: 'umd',
    name: 'RDB'
  }, {
    file: 'dist/bundle.es.js',
    format: 'es'
  }],
  plugins: libPlugins
}, {
  input: 'demo/index.js',
  output: {
    dir: 'output',
    format: 'es'
  },
  plugins: [
    ...libPlugins,
    html(),
    serve({
      open: true,
      openPage: '/',
      contentBase: ['output']
    })
  ]
}];
```

### ESLint

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

#### .eslintrc
```
{
  "extends": ["airbnb"]
}
```

### Prettier

```bash
npm i -D prettier
npm i -D eslint-config-prettier eslint-plugin-prettier
```

#### .eslintrc
```
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  },
}
```

#### .prettierrc
```
{
  "tabWidth": 2
}
```
