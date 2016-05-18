import WebTorrent from 'webtorrent';
import _ from 'underscore';
import os from 'os';

const TORRENT_NAME = 'MYTORRENT';
const PORT = '8080';
const client = new WebTorrent();

function getIp() {
    return _.chain(os.networkInterfaces())
        .values() // object values
        .flatten() // flatten all nested arrays
        .find({ family: 'IPv4', internal: false }) // find ipv4
        .value() //get value from chain
        .address;
}

function serve(torrent) {
    const server = torrent.createServer();
    console.log('Torrenting now on %s:%s', getIp(), PORT);
    server.listen(PORT);
    return server
}

function reportDownloadSpeed(client) {
    return setInterval(function () {
        if (client.downloadSpeed > 0) {
            console.log('Seeding... %s @ %s', client.progress, client.downloadSpeed);
        }
    }, 2000)
}

export default function (files, mock=false) {
    console.log('Seeding %s', files);
    if (mock) return;
    client.seed(files, { name: TORRENT_NAME }, function (torrent) {
        serve(torrent);
        reportDownloadSpeed(client);
    });
}
