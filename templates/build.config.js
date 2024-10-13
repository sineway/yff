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
    serve.dir = 'frontend/web';
    clean.dir = 'frontend/web/bundles';

    css.input = 'frontend/views/layouts/main.css';
    css.output.dir = clean.dir;

    js.input = 'frontend/views/layouts/main.js';
    js.output.dir = clean.dir;

    watch.dir = 'frontend/{controllers,models,views}';
    watch.files = '**/*.{php,html,svg}';
};
