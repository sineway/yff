import * as rollup from 'rollup';
import config from './config.js';
import * as log from './log.js';

/**
 * @param {rollup.RollupOptions} options
 */
async function buildWith(options) {
    const start = Date.now();
    const build = await rollup.rollup(options);
    const promises = [].concat(options.output).map(build.write);

    await Promise.all(promises);
    await build.close();

    log.scope('build', String(options.input), `${Date.now() - start}ms`);
}

async function buildCss() {
    try {
        await buildWith(config.css);
    } catch (error) {
        log.scope('build', error);
    }
}

async function buildJs() {
    try {
        await buildWith(config.js);
    } catch (error) {
        log.scope('build', error.message);
    }
}

async function build() {
    await Promise.all([buildCss(), buildJs()]);
}

export {buildCss, buildJs};
export default build;
