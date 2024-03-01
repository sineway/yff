import fs from 'fs-extra';
import * as log from './log.js';

const templates = {
    'AppAsset.php': 'frontend/assets/AppAsset.php',
    'main.css': 'frontend/views/layouts/main.css',
    'main.js': 'frontend/views/layouts/main.js',
    '.prettierrc.json': '.prettierrc.json',
    'build.setup.js': 'build.setup.js',
    'package.json': 'package.json',
    'tsconfig.json': 'tsconfig.json',
};

async function init() {
    for (const key in templates) {
        try {
            const source = `${import.meta.dirname}/../templates/${key}`;
            const destination = templates[key];

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
