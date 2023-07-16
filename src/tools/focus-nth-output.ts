import * as shelljs from 'shelljs';
import * as _ from 'lodash';
import * as fs from 'fs-extra';

import { Sway } from "..";
import minimist = require('minimist');

(async function() {
    const args = minimist(process.argv.slice(2));
    const output = Number.parseInt(args._[0]);

    if (output === Number.NaN) {
        console.error('Out put is not a valid number');
        process.exit(1);
    }

    const sway = new Sway();
    const outputs = await sway.getOutputs();

    await sway
        .focus()
        .output(outputs[output - 1])
        .exec();

})()
