#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { createDir, deleteDir } from './createDir.js';
import { generateConfigFiles } from "./createFiles.js";

// eslint-disable-next-line no-undef
const [, , ...argv] = process.argv;

// Project name
const projectName = argv.find(item => item[0] !== '-');
const projectPath = path.resolve('../', projectName);
// Flags
const flags = argv.filter(item => item[0] === '-');


async function start() {
    // change this block after finish developing
    if (fs.existsSync(projectPath)) {
        await deleteDir(projectPath);
    }
    await createDir(projectPath); // end
    
    if (flags.includes('--ts')) {
        generateConfigFiles(projectPath, true);
    } else {
        generateConfigFiles(projectPath);
    }
}

start();