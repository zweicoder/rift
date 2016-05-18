#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import cli from 'commander';
import serve from './server';

/**
 * Given a directory returns the absolute file paths for all files in the directory
 * @param dir
 * @returns {Array|*|{type, data}}
 */
function getFilepathsFromDir(dir) {
    return fs.readdirSync(dir).map((filename) => {
        return path.resolve(dir, filename)
    });
}

cli.version('0.0.1')
    .arguments('[files...]')
    .description('serves file(s)/directory specified. Defaults to current directory if none specified')
    .action((files) => {
        if (!files || files.length == 0) {
            const items = getFilepathsFromDir(process.cwd());
            serve(items);
            return;
        }
        const items = files.map((filename) => {
            return path.resolve(process.cwd(), filename)
        });
        // todo maybe check if path is valid
        serve(items);
        return
    });

cli.parse(process.argv);