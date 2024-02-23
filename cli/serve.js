import {spawn} from 'node:child_process';
import * as log from './log.js';
import config from './config.js';

/**
 * @returns {Promise<number>}
 */
async function serve() {
    return new Promise((resolve) => {
        const port = Math.floor(8000 + 100 * Math.random());

        const {stdout, stderr} = spawn('./yii', [
            'serve',
            `--docroot=${config.serve.dir}`,
            `--port=${port}`,
        ]);

        stdout.on('data', (data) => {
            log.scope('serve', data);
        });

        stderr.once('data', () => {
            resolve(port);
        });
    });
}

export default serve;
