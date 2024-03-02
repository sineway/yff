import bs from 'browser-sync';
import config from './config.js';
import {buildCss, buildJs} from './build.js';

/**
 * @param {number} port
 */
async function watch(port) {
    bs.init({
        logPrefix: 'watch',
        proxy: `localhost:${port}`,
        online: false,
        timestamps: false,
        ui: false,
        notify: false,
        ghostMode: false,
        open: false,
    });

    bs.watch(`${config.watch.dir}/${config.watch.files}`).on('change', () => {
        bs.reload();
    });

    bs.watch(`${config.watch.dir}/**/*.css`).on('change', async () => {
        await buildCss();
        bs.reload('*.css');
    });

    bs.watch(`${config.watch.dir}/**/*.js`).on('change', async () => {
        await buildJs();
        bs.reload();
    });
}

export default watch;
