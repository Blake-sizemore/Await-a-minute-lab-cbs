const fs = require('fs');
// brings in file store for nodeJS
let chirps = { nextid: 1 };
// ID key for the eventual array full of objects that will be chirps

if (fs.existsSync('chirpsAsync.json')) {
    chirps = JSON.parse(fs.readFileSync('chirpsAsync.json'));
}
// checks to see if the "folder" already has an the file

const requestShouldBreak = () => {
    return 1 / 4 > Math.random();
};

let getChirps = () => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject("GET ALL BROKE: request broke on getChirps :(")
        } else {
            resolve(Object.assign({}, chirps));
        }
    })
}

let getChirp = id => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject(`GET ONE BROKE:request broke on getChirp[${id}] :(`)
        } else {
            resolve(Object.assign({}, chirps[id]));
        }
    })
}

let createChirp = (chirp) => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject("CREATE BROKE: request broke on createChirp :(")
        } else {
            chirps[chirps.nextid++] = chirp;
            writeChirps();
            resolve();
        }
    })
}

let updateChirp = (id, chirp) => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject("UPDATE BROKE: request broke on updateChirp :(")
        } else {
            chirps[id] = chirp;
            writeChirps();
            resolve();
        }
    })
}

let deleteChirp = id => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject("DELETE BROKE: request broke on updateChirp :(")
        } else {
            delete chirps[id];
            writeChirps();
            resolve("deleteChirp was successful");
        }
    })
}

let writeChirps = () => {
    fs.writeFileSync('chirpsAsync.json', JSON.stringify(chirps));
}
// function that edits the file in question

module.exports = {
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp,
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp
}