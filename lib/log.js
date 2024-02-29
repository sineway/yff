import {log} from 'node:console';
import chalk from 'chalk';

const {red, yellow, green, blue, magenta, dim} = chalk;

/**
 * @param {string} name
 * @param {string} message
 * @param {string} [data]
 */
function scope(name, message, data = '') {
    log('[%s] %s', blue(name), message, magenta(data));
}

/**
 * @param {string} message
 */
function pass(message) {
    log(green('✔'), dim(message));
}

/**
 * @param {string} message
 */
function fail(message) {
    log(red('✖'), dim(message));
}

/**
 * @param {string} message
 * @param {string} [extra]
 * @param {...string} [rest]
 */
function item(message, extra, ...rest) {
    log(yellow('➜'), message, dim(extra), ...rest);
}

export {scope, pass, fail, item, log as custom};
