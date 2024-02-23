#!/usr/bin/env node

import ps from 'node:process';

import init from './cli/init.js';
import clean from './cli/clean.js';
import build from './cli/build.js';
import serve from './cli/serve.js';
import watch from './cli/watch.js';

if (ps.argv.includes('--init')) {
    await init();
} else {
    await clean();
    await build();

    if (ps.argv.includes('--reload')) {
        await watch(await serve());
    }
}
