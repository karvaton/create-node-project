import fs from 'fs';
import path from 'path';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// file templates
const packageJson = require('./static/package.template.json');
// import packageJson from './static/package.template.json' assert { type: 'json'};
const tsDevDep = require("./static/ts-devDep.json");
// import tsDevDep from "./static/ts-devDep.json" assert { type: "json" };
const tsconfig = require("./static/tsconfig.template.json");
// import tsconfig from "./static/tsconfig.template.json" assert { type: "json" };
const tsconfigBuild = require("./static/tsconfig.build.template.json");
// import tsconfigBuild from "./static/tsconfig.build.template.json" assert { type: "json" };
const eslint = require("./static/eslint.template.json");
// import eslint from "./static/eslint.template.json" assert { type: "json" };
const eslintTs = require("./static/ts-eslint-ext.json");
// import eslintTs from "./static/ts-eslint-ext.json" assert { type: "json" };


function createFileCallback(err, filename) {
    if (!err) {
        console.log(`File "${filename}" created!`);
    }
}

function createFile(filesPath, filename, content) {
    fs.writeFile(
        path.resolve(filesPath, filename),
        JSON.stringify(content),
        (err) => createFileCallback(err, filename)
    );
}

export function generateConfigFiles(filesPath, ts) {
    let eslintrc = eslint;
    const separator = filesPath.indexOf("\\") ? "\\" : "/";
    packageJson.name = filesPath.split(separator).at(-1).toLowerCase();

    if (ts) {
        packageJson.devDependencies = {
            ...packageJson.devDependencies,
            ...tsDevDep
        }
        eslintrc = {
            ...eslint,
            ...eslintTs
        }
        createFile(filesPath, "tsconfig.json", tsconfig);
        createFile(filesPath, "tsconfig.build.json", tsconfigBuild);
    }

    createFile(filesPath, "package.json", packageJson);
    createFile(filesPath, ".eslintrc.json", eslintrc);
}