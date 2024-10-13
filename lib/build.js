import path from 'node:path';
import fs from 'node:fs/promises';

import postcss from 'postcss';
import * as rollup from 'rollup';
import config from './config.js';
import * as log from './log.js';

async function buildCss() {
    try {
        const inputs = [].concat(config.css.input);
        const promises = inputs.map(async (input) => {
            const {file, dir} = config.css.output;
            const output = file ?? `${dir}/${path.basename(input)}`;

            const start = Date.now();
            // https://github.com/postcss/postcss#js-api
            const css = await fs.readFile(input);
            const result = await postcss(config.css.plugins).process(css, {
                from: input,
                to: output,
                map: {inline: false},
            });
            await fs.writeFile(output, result.css);
            if (result.map) {
                await fs.writeFile(`${output}.map`, result.map.toString());
            }
            log.scope('build', input, `${Date.now() - start}ms`);
        });
        await Promise.all(promises);
    } catch (error) {
        log.scope('build', error.toString());
    }
}

async function buildJs() {
    try {
        const inputs = [].concat(config.js.input);
        const promises = inputs.map(async (input) => {
            const options = {...config.js, input};

            const start = Date.now();
            const build = await rollup.rollup(options);
            const promises = [].concat(options.output).map(build.write);

            await Promise.all(promises);
            await build.close();

            log.scope('build', input, `${Date.now() - start}ms`);
        });
        await Promise.all(promises);
    } catch (error) {
        log.scope('build', error.message);
    }
}

async function build() {
    await Promise.all([buildCss(), buildJs()]);
}

export {buildCss, buildJs};
export default build;
