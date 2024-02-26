/**
 * @param {{
 *     clean: {dir: string};
 *     css: import('rollup').RollupOptions;
 *     js: import('rollup').RollupOptions;
 *     watch: {dir: string};
 *     serve: {dir: string};
 * }} config
 */
export default (config) => {
    config.clean.dir = 'frontend/web/bundles';

    config.css.input = 'frontend/views/layouts/main.css';
    config.css.output.file = 'frontend/web/bundles/main.css';

    config.js.input = 'frontend/views/layouts/main.js';
    config.js.output.file = 'frontend/web/bundles/main.js';

    config.watch.dir = 'frontend/{assets,views}';
    config.serve.dir = 'frontend/web';
};
