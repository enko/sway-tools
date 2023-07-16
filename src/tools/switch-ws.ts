import { Sway } from "..";
import child_process = require("child_process");
import * as lodash from 'lodash';
import { TreeNode } from "../interfaces/tree.interface";

type Entry = {
    id: number;
    workspace: string;
    appName: string;
    appTitle: string;
}

function getAppName(window: TreeNode) {
    if (typeof window.app_id === 'string') {
        const name = window.app_id.split('.').pop();

        if (typeof name === 'string') {
            return name;
        }
    }

    if (typeof window.window_properties !== 'undefined') {
        return window.window_properties.class;
    }

    return '???';
}

async function main() {
    const sway = new Sway();

    const tree = (await sway.getTree()).nodes
        .flatMap(node => node.nodes);

    const items: Entry[] = [];

    for(const workspace of tree) {
        const windows = workspace.nodes.flatMap(node => {
            if (node.nodes.length > 0) {
                return node.nodes;
            } else {
                return node;
            }
        });
        for (const window of windows) {
            items.push({
                id: window.id,
                workspace: workspace.name,
                appTitle: window.name,
                appName: getAppName(window),
            });
        }
    }

    const maxWorkspaceLength = items.map(item => item.workspace.length).reduce((prev, curr) => {
        if (prev >= curr) {
            return prev;
        } else {
            return curr;
        }
    });

    const maxAppTitleLength = items.map(item => item.appName.length).reduce((prev, curr) => {
        if (prev >= curr) {
            return prev;
        } else {
            return curr;
        }
    });

    const dmenu = lodash.sortBy(items, ['appName']).map(item => `${item.workspace.padEnd(maxWorkspaceLength)} ${item.appName.padEnd(maxAppTitleLength)} ${item.appTitle} (${item.id})`).join('\n');

    const rofi = child_process.exec('rofi -dmenu -i -p "Select a Window" -format');

    rofi.stdin.write(dmenu);
    rofi.stdin.end()

    let output = '';

    for await (const chunk of rofi.stdout) {
        output += chunk;
    }

    const idMatch = output.trim().match(/\([0-9]+\)$/);

    if (idMatch !== null) {
        const id = idMatch[0].slice(1, -1);
        child_process.execSync(`swaymsg "[con_id=${id}] focus"`)
    }
}

void main();