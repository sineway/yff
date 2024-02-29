import fs from 'fs-extra';
import config from './config.js';
import * as log from './log.js';

async function clean() {
    log.scope('clean', config.clean.dir);
    await fs.emptyDir(config.clean.dir);
}

export default clean;
