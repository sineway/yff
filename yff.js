#!/usr/bin/env node

import ps from 'node:process';
import {spawn} from 'node:child_process';
import {performance as perf} from 'node:perf_hooks';
import {log} from 'node:console';

import * as rollup from 'rollup';
import {babel as rollupBabel} from '@rollup/plugin-babel';
import rollupTerser from '@rollup/plugin-terser';

import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

import bs from 'browser-sync';
import chalk from 'chalk';
import fs from 'fs-extra';

const outputDir = 'frontend/web/bundles';
const browsers = 'last 13 versions and not dead';
const port = Math.floor(8000 + 100 * Math.random());

/**
 * @type {rollup.RollupOptions}
 */
const cssOptions = {
    input: 'frontend/views/layouts/main.css',
    output: {
        file: `${outputDir}/main.css`
    },
    plugins: [
        postcss({
            extract: true,
            minimize: ps.argv.includes('--minify'),
            sourceMap: true,
            plugins: [
                postcssImport,
                postcssPresetEnv({
                    preserve: false,
                    browsers
                })
            ]
        })
    ],
    logLevel: 'silent'
};

async function buildCss() {
    try {
        const start = perf.now();
        const build = await rollup.rollup(cssOptions);

        await build.write(cssOptions.output);
        await build.close();

        logBuildTime(cssOptions.input, start);
    } catch (error) {
        logBuild(error);
    }
}

/**
 * @type {rollup.RollupOptions}
 */
const jsOptions = {
    input: 'frontend/views/layouts/main.js',
    output: {
        file: `${outputDir}/main.js`,
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        rollupBabel({
            presets: ['@babel/preset-env'],
            babelHelpers: 'bundled',
            browserslistEnv: browsers
        }),
        ...(ps.argv.includes('--minify')
            ? [
                  rollupTerser({
                      mangle: {properties: {regex: '^_[a-z]'}}
                  })
              ]
            : [])
    ]
};

async function buildJs() {
    try {
        const start = perf.now();
        const build = await rollup.rollup(jsOptions);

        await build.write(jsOptions.output);
        await build.close();

        logBuildTime(jsOptions.input, start);
    } catch (error) {
        logBuild(error.message);
    }
}

/**
 * @param {rollup.InputOption} file
 * @param {number} start
 */
function logBuildTime(file, start) {
    const elapsed = Math.round(perf.now() - start);

    logBuild(file, chalk.magenta(`${elapsed}ms`));
}

/**
 * @param {...any} messages
 */
function logBuild(...messages) {
    logScope('build', ...messages);
}

/**
 * @param {string} name
 * @param {...any} messages
 */
function logScope(name, ...messages) {
    log('[%s] %s', chalk.blue(name), ...messages);
}

async function clean() {
    logScope('clean', outputDir);
    await fs.emptyDir(outputDir);
}

async function build() {
    await Promise.all([buildCss(), buildJs()]);
}

async function serve() {
    return new Promise((resolve) => {
        const {stdout, stderr} = spawn('./yii', [
            'serve',
            '--docroot=frontend/web',
            `--port=${port}`
        ]);

        stdout.on('data', (data) => {
            logScope('serve', data);
        });

        stderr.once('data', resolve);
    });
}

async function watch() {
    const base = 'frontend/{assets,views}';

    bs.init({
        logPrefix: 'watch',
        proxy: `localhost:${port}`,
        online: false,
        timestamps: false,
        ui: false,
        notify: false,
        ghostMode: false,
        open: false
    });

    bs.watch(`${base}/**/*.php`).on('change', () => {
        bs.reload();
    });

    bs.watch(`${base}/**/*.css`).on('change', async () => {
        await buildCss();
        bs.reload('*.css');
    });

    bs.watch(`${base}/**/*.js`).on('change', async () => {
        await buildJs();
        bs.reload();
    });
}

async function init() {
    const whitelist = [
        '.prettierrc.json',
        'package-template.json',
        'tsconfig.json'
    ];

    for (const file of whitelist) {
        try {
            const source = `node_modules/yff/${file}`;
            const destination = file.replace('-template', '');

            await fs.copy(source, destination);
            log(chalk.green('✔'), chalk.dim(destination));
        } catch (error) {
            log(chalk.red('✖'), chalk.dim(error.message));
        }
    }

    log(`
        ${chalk.bold('well done')}

        ${chalk.yellow('➜')} add ${chalk.dim('/node_modules')} to .gitignore
        ${chalk.yellow('➜')} run ${chalk.dim('npm i')} to complete installation
    `);
}

if (ps.argv.includes('--init')) {
    await init();
} else {
    await clean();
    await build();

    if (ps.argv.includes('--reload')) {
        await serve();
        await watch();
    }
}
