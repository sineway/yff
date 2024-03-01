Simple CSS/JS bundler for Yii2 projects

## Install

```sh
# Create Yii2 project
composer create-project --prefer-dist yiisoft/yii2-app-advanced my-site
cd my-site
php init

# Install bundler
npx yff --init
npm install
```

## Usage

```sh
# Start development server
npm start

# Format source files
npm run style

# Check syntax and type errors
npm run lint
```

## Config

The `build.setup.js` can be used to override paths:
```js
export default ({clean, css, js, watch, serve}) => {
    clean.dir = 'frontend/web/bundles';

    css.input = 'frontend/views/layouts/main.css';
    css.output.file = 'frontend/web/bundles/main.css';

    js.input = 'frontend/views/layouts/main.js';
    js.output.file = 'frontend/web/bundles/main.js';

    watch.dir = 'frontend/{assets,views}';
    serve.dir = 'frontend/web';
};
```

Other configuration files:
- `package.json` (scripts and browserslist)
- [.prettierrc.json](https://prettier.io/docs/en/configuration.html) (formatting)
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) (type checking)
