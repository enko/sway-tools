import { Sway } from '..';
import minimist = require('minimist');

(async () => {
  const args = minimist(process.argv.slice(2));
  const output = Number.parseInt(args._[0]);

  if (isNaN(output)) {
    console.error('Out put is not a valid number');
    process.exit(1);
  }

  const sway = new Sway();
  const outputs = await sway.getOutputs();

  await sway
    .focus()
    .output(outputs[output - 1])
    .exec();
})();
