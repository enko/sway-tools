#!/usr/bin/env node

import { Sway } from '..';
import child_process = require('child_process');
import * as lodash from 'lodash';
import { TreeNode } from '../interfaces/tree.interface';
import * as shelljs from 'shelljs';
import { createLogger } from '../logger';

const logger = createLogger('move-ws-to-output');

async function showMenu(menu: string) {
  const rofi = child_process.exec(
    'rofi -dmenu -i -p "Select a Window" -format',
  );

  rofi.stdin.write(menu);
  rofi.stdin.end();

  let output = '';

  for await (const chunk of rofi.stdout) {
    output += chunk;
  }

  return output.trimEnd();
}

async function main() {
  logger.debug({ file: __filename }, 'Welcome to the move ws to output tool');
  const sway = new Sway();

  const tree = (await sway.getTree()).nodes.flatMap((node) => node.nodes);

  logger.debug('assemabled the tree');

  const workspaces: string[] = [];

  for (const workspace of tree) {
    workspaces.push(workspace.name);
  }

  const dmenu = lodash.sortBy(workspaces).join('\n');

  const selectedWorkspace = await showMenu(dmenu);

  if (selectedWorkspace.length === 0) {
    return;
  }

  logger.debug({ selectedWorkspace }, 'Selected workspace');

  const outputs = await sway.getOutputs();

  const outputMenu = lodash
    .sortBy(outputs, ['name', 'make', 'model', 'serial'])
    .map(
      (output) =>
        `${output.make} ${output.model} ${output.serial} (${output.name})`,
    )
    .join('\n');

  logger.debug({ outputMenu }, 'Spawning the menu');

  const selectedOutput = await showMenu(outputMenu);

  if (selectedOutput.length === 0) {
    return;
  }

  const selectedOutputMatch = selectedOutput.trim().match(/\(.+\)$/);
  let outputName: string | null = null;

  if (selectedOutputMatch !== null) {
    outputName = selectedOutputMatch[0].slice(1, -1);
  }

  if (typeof outputName === 'string' && typeof selectedWorkspace === 'string') {
    logger.debug(
      { selectedWorkspace, outputName },
      'Moving window to workspace',
    );
    shelljs.exec(`swayws move "${selectedWorkspace}" "${outputName}"`);
  }
}

void main();
