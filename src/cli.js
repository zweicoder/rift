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

/**
 * Given some absolute paths, recursively explores directories and returns array of absolute file paths. Returns the input if it's not a directory.
 * @param paths
 * @param maxDepth  - max depth to traverse
 * @returns {Array|*|{type, data}}
 */
function getFilesRecursively(dir, maxDepth = -1) {
    const paths = getFilepathsFromDir(dir);
    return paths.reduce((memo, _path)=> {
        const stat = fs.statSync(_path);
        if (stat.isFile()) {
            return memo.concat(_path)
        } else if (stat.isDirectory()) {
            if (maxDepth > 0) {
                return memo.concat(getFilesRecursively(_path, maxDepth - 1))
            }
            // Stop going deeper
            return memo
        } else {
            console.log('Skipping unknown file at %s', _path);
            return memo
        }
    })
}

cli.version('1.0.0');

cli
    .command('serve [files...]') // isDefault doesn't work properly with variadic commands, see https://github.com/tj/commander.js/issues/539
    .alias('s')
    .description('serves file(s)/directory specified. Defaults to current directory if none specified')
    .action((files) => {
        console.log(files)
        if (!files || files.length == 0) {
            const items = getFilepathsFromDir(process.cwd());
            serve(items, true);
            return;
        }
        const items = files.map((filename) => {
            return path.resolve(process.cwd(), filename)
        });
        // todo maybe check if path is valid
        serve(items, true);
        return
    });

cli.parse(process.argv);