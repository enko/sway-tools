import * as shelljs from 'shelljs';
import * as _ from 'lodash';
import * as fs from 'fs-extra';

import { Sway } from '..';
import minimist = require('minimist');

(async function () {
  const args = minimist(process.argv.slice(2));
  const bgDirectory = args._[0];

  const exists = await fs.pathExists(bgDirectory);

  if (exists === false) {
    console.error(`Path ${bgDirectory} does not exists`);
    process.exit(1);
  }

  const sway = new Sway();
  const outputs = await sway.getOutputs();

  const files = shelljs
    .exec(`find ${bgDirectory} -type f`, {
      async: false,
      silent: true,
    })
    .split('\n');

  for (const output of outputs) {
    await sway.output(output).bg(_.sample(files), 'fill').exec();
  }
})();
