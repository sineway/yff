import ps from 'node:process';
import {babel as rollupBabel} from '@rollup/plugin-babel';
import rollupTerser from '@rollup/plugin-terser';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSplitByMedia from 'postcss-split-by-media';
import cssnano from 'cssnano';

/**
 * @type {{
 *     clean: {dir: string};
 *     css: import('rollup').RollupOptions & {
 *         output: import('rollup').OutputOptions;
 *         plugins: import('postcss').AcceptedPlugin[];
 *     };
 *     js: import('rollup').RollupOptions;
 *     serve: {dir: string};
 *     watch: {dir: string; files: string};
 *     proxy?: import('browser-sync').Options;
 * }}
 */
const config = {
    clean: {
        dir: 'frontend/web/bundles',
    },

    css: {
        input: 'frontend/views/layouts/main.css',
        output: {
            file: 'frontend/web/bundles/main.css',
        },
        plugins: [],
    },

    js: {
        input: 'frontend/views/layouts/main.js',
        output: {
            file: 'frontend/web/bundles/main.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins: [],
    },

    watch: {
        dir: 'frontend/{assets,views}',
        files: '**/*.{php,svg}',
    },

    serve: {
        dir: 'frontend/web',
    },

    proxy: {},
};

try {
    const {default: custom} = await import(`${ps.cwd()}/build.config.js`);

    custom(config);
} catch {
    // do nothing
}

if (Array.isArray(config.css.plugins)) {
    config.css.plugins.push(
        postcssImport(),
        // @ts-ignore
        postcssPresetEnv({
            preserve: false,
        })
    );

    if (ps.argv.includes('--minify')) {
        config.css.plugins.push(cssnano);
    }

    if (ps.argv.includes('--split-by-media')) {
        config.css.plugins.push(postcssSplitByMedia);
    }
}

if (Array.isArray(config.js.plugins)) {
    config.js.plugins.push(
        rollupBabel({
            presets: ['@babel/preset-env'],
            babelHelpers: 'bundled',
        })
    );

    if (ps.argv.includes('--minify')) {
        // @ts-ignore
        config.js.plugins.push(rollupTerser());
    }
}

export default config;
