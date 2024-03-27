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

Available commands:

```sh
# Start development server with live reload
npm start

# Apply formatting to the source files
npm run style

# Check syntax and type errors
npm run lint
```

## Config

Use `build.config.js` to override default paths:

```js
export default ({clean, css, js, serve, watch}) => {
    clean.dir = 'frontend/web/bundles';

    css.input = 'frontend/views/layouts/main.css';
    css.output.file = 'frontend/web/bundles/main.css';

    js.input = 'frontend/views/layouts/main.js';
    js.output.file = 'frontend/web/bundles/main.js';

    serve.dir = 'frontend/web';

    watch.dir = 'frontend/{assets,views}';
    watch.files = '**/*.{php,svg}';
};
```

Other configuration files:

-   `package.json` (scripts and browserslist)
-   [.prettierrc.json](https://prettier.io/docs/en/configuration.html) (formatting)
-   [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) (type checking)

### Advanced

#### Split CSS by media query

Add `--split-by-media` option to the `start` command in the `package.json`:

```json
"scripts": {
    "start": "yff --split-by-media --minify --reload",
```

#### Create multiple standalone JS bundles

```js
js.input = ['frontend/views/layouts/main.js', 'frontend/views/blog/article.js'];
js.output.file = null;
js.output.dir = 'frontend/web/bundles';
```

#### Configure proxy server

Assign [available options](https://browsersync.io/docs/options) to the `proxy` field in the `build.config.js`
