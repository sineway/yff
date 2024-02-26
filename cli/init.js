import path from 'node:path';
import fs from 'fs-extra';
import * as log from './log.js';

const files = [
    'frontend/assets/AppAsset.php',
    'frontend/views/layouts/main-template.css',
    'frontend/views/layouts/main-template.js',
    '.prettierrc.json',
    'build.setup-template.js',
    'package-template.json',
    'tsconfig.json',
];

async function init() {
    for (const file of files) {
        try {
            const source = path.resolve(`node_modules/yff/${file}`);
            const destination = file.replace('-template', '');

            await fs.copy(source, destination);
            log.pass(destination);
        } catch (error) {
            log.fail(error.message);
        }
    }
    log.custom('almost done');
    log.item('run', 'npm install', 'to complete installation');
    log.item('run', 'npm start');
}

export default init;
