#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2))
    .usage('Usage: $0 <command> [options]')
    .command('count', 'Count the lines in a file')
    .example('$0 count -f foo.js', 'count the lines in the given file')
    .options({
        f: { type: 'string' },
    })
    .nargs('f', 1)
    .describe('f', 'Load a file')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019').argv;

const s = fs.createReadStream(argv.f);

let lines = 0;
s.on('data', function (buf) {
    lines += buf.toString().match(/\n/g).length;
});

s.on('end', function () {
    console.log(lines);
});
