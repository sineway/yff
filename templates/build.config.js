/**
 * @param {{
 *     clean: {dir: string};
 *     css: import('rollup').RollupOptions;
 *     js: import('rollup').RollupOptions;
 *     serve: {dir: string};
 *     watch: {files: string};
 * }} config
 */
export default ({clean, css, js, serve, watch}) => {
    clean.dir = 'frontend/web/bundles';

    css.input = 'frontend/views/layouts/main.css';
    css.output.file = 'frontend/web/bundles/main.css';

    js.input = 'frontend/views/layouts/main.js';
    js.output.file = 'frontend/web/bundles/main.js';

    serve.dir = 'frontend/web';
    watch.files = 'frontend/{assets,views}/**/*.{php,svg}';
};
