import * as cp from 'child_process';
import * as util from 'util';
import * as shelljs from 'shelljs';

import { Output } from "./interfaces/output.interface";
import { Tree } from './interfaces/tree.interface';
import path = require('path');

const exec = util.promisify(cp.execFile);

export class Sway {
    private commands: string[] = [
    ];

    public async getOutputs(): Promise<Output[]> {
        const json = shelljs.exec('swaymsg -r -t get_outputs', {
            async: false,
            silent: true,
        });

        return JSON.parse(json);
    }

    public async getTree() {
        const json = shelljs.exec('swaymsg -t get_tree', {
            async: false,
            silent: true,
        });

        return JSON.parse(json) as Tree;
    }

    public focus() {
        this.commands.push('focus');
        return this;
    }

    public output(output: Output) {
        this.commands.push('output');
        this.commands.push(`"${output.make} ${output.model} ${output.serial}"`);
        return this;
    }

    public bg(file: string, mode: 'fill') {
        this.commands.push('bg');
        this.commands.push(`"${file}"`);
        this.commands.push(mode);
        return this;
    }

    public async exec() {
        await exec('swaymsg', this.commands);

        this.commands = [];
    }
}

if (require.main.filename === path.join(__dirname, __filename)) {
    console.dir({ x: require.main.filename, y: __filename});
}
