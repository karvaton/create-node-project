import fs from "fs";

export async function createDir(dirPath) {
    fs.mkdir(dirPath, (err) => {
        if (!err) {
            console.log(`Folder '${dirPath.split('/').at(-1)}' successfuly created`);
        }
    });
}

export async function deleteDir(dirPath) {
    fs.rmdir(dirPath, (err) => {
        if (!err) {
            console.log(`Folder '${dirPath.split('/').at(-1)}' successfuly removed`);
        }
    });
}