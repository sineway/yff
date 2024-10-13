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
    serve.dir = 'frontend/web';
    clean.dir = 'frontend/web/bundles';

    css.input = 'frontend/views/layouts/main.css';
    css.output.dir = clean.dir;

    js.input = 'frontend/views/layouts/main.js';
    js.output.dir = clean.dir;

    watch.dir = 'frontend/{controllers,models,views}';
    watch.files = '**/*.{php,html,svg}';
};
```

Other configuration files:

-   `package.json` (scripts and browserslist)
-   [.prettierrc.json](https://prettier.io/docs/en/configuration.html) (formatting)
-   [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) (type checking)

### Advanced

#### Create multiple standalone bundles

```js
css.input = ['frontend/views/layouts/main.css', 'frontend/views/blog/article.css'];
js.input =  ['frontend/views/layouts/main.js',  'frontend/views/blog/article.js'];
```

#### Split CSS by media query

Add `--split-by-media` option to the `start` command in the `package.json`:

```json
"scripts": {
    "start": "yff --split-by-media --minify --reload",
```

#### Configure proxy server

Assign [available options](https://browsersync.io/docs/options) to the `proxy` field in the `build.config.js`
