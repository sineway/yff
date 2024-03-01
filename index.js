#!/usr/bin/env node

import ps from 'node:process';

import init from './lib/init.js';
import clean from './lib/clean.js';
import build from './lib/build.js';
import serve from './lib/serve.js';
import watch from './lib/watch.js';

if (ps.argv.includes('--init')) {
    await init();
} else {
    await clean();
    await build();

    if (ps.argv.includes('--reload')) {
        await watch(await serve());
    }
}
