/**
 * @param {{
 *     clean: {dir: string};
 *     css: import('rollup').RollupOptions;
 *     js: import('rollup').RollupOptions;
 *     watch: {dir: string};
 *     serve: {dir: string};
 * }} config
 */
export default ({clean, css, js, watch, serve}) => {
    clean.dir = 'frontend/web/bundles';

    css.input = 'frontend/views/layouts/main.css';
    css.output.file = 'frontend/web/bundles/main.css';

    js.input = 'frontend/views/layouts/main.js';
    js.output.file = 'frontend/web/bundles/main.js';

    watch.dir = 'frontend/{assets,views}';
    serve.dir = 'frontend/web';
};
