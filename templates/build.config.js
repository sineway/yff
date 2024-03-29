/**
 * @param {{
 *     clean: {dir: string};
 *     css: import('rollup').RollupOptions;
 *     js: import('rollup').RollupOptions;
 *     serve: {dir: string};
 *     watch: {dir: string; files: string};
 *     proxy?: import('browser-sync').Options;
 * }} config
 */
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
