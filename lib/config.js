import ps from 'node:process';
import {babel as rollupBabel} from '@rollup/plugin-babel';
import rollupTerser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSplitByMedia from 'postcss-split-by-media';
import cssnano from 'cssnano';

/**
 * @type {{
 *     clean: {dir: string};
 *     css: import('rollup').RollupOptions;
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
        logLevel: 'silent',
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
        // @ts-ignore
        postcss({
            extract: true,
            // @ts-ignore
            to: config.css.output.file,
            sourceMap: true,
            plugins: [
                postcssImport,
                // @ts-ignore
                postcssPresetEnv({
                    preserve: false,
                }),
                ...(ps.argv.includes('--minify') ? [cssnano] : []),
                ...(ps.argv.includes('--split-by-media')
                    ? [postcssSplitByMedia]
                    : []),
            ],
        })
    );
}

if (Array.isArray(config.js.plugins)) {
    config.js.plugins.push(
        rollupBabel({
            presets: ['@babel/preset-env'],
            babelHelpers: 'bundled',
        }),
        ...(ps.argv.includes('--minify')
            ? [
                  // @ts-ignore
                  rollupTerser({
                      mangle: {properties: {regex: '^_[a-z]'}},
                  }),
              ]
            : [])
    );
}

export default config;
