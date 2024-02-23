import ps from 'node:process';

import * as rollup from 'rollup';
import {babel as rollupBabel} from '@rollup/plugin-babel';
import rollupTerser from '@rollup/plugin-terser';

import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

const browserslist = 'last 13 versions and not dead';

const config = {
    clean: {
        dir: 'frontend/web/bundles',
    },

    /**
     * @type {rollup.RollupOptions}
     */
    css: {
        input: 'frontend/views/layouts/main.css',
        output: {
            file: 'frontend/web/bundles/main.css',
        },
        plugins: [
            // @ts-ignore
            postcss({
                extract: true,
                minimize: ps.argv.includes('--minify'),
                sourceMap: true,
                plugins: [
                    postcssImport,
                    // @ts-ignore
                    postcssPresetEnv({
                        preserve: false,
                        browsers: browserslist,
                    }),
                ],
            }),
        ],
        logLevel: 'silent',
    },

    /**
     * @type {rollup.RollupOptions}
     */
    js: {
        input: 'frontend/views/layouts/main.js',
        output: {
            file: 'frontend/web/bundles/main.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins: [
            rollupBabel({
                presets: ['@babel/preset-env'],
                babelHelpers: 'bundled',
                browserslistEnv: browserslist,
            }),
            ...(ps.argv.includes('--minify')
                ? [
                      rollupTerser({
                          mangle: {properties: {regex: '^_[a-z]'}},
                      }),
                  ]
                : []),
        ],
    },

    watch: {
        dir: 'frontend/{assets,views}',
    },

    serve: {
        dir: 'frontend/web',
    },
};

try {
    const {default: setup} = await import(`${ps.cwd()}/build.setup.js`);

    setup(config);
} catch {
    // do nothing
}

export default config;
