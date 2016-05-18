# Rift
Send files over your local network from the command line using [WebTorrent](https://github.com/feross/webtorrent). As of now a server is hosted so clients on the same network can connect to the host's IP.

## Installation
`npm install -g rift`

## Usage

Open terminal at / `cd` to your current directory
`$ cd <directory>`

Open a rift to your current directory
```
$ rift .
Seeding /home/pewpew/code/rift/files
Torrenting now on 10.21.112.232:8080
```

Or select a few files
```
$ rift barney.jpg wallpapers/
Seeding /home/pewpew/Pictures/barney.jpg,/home/pewpew/Pictures/wallpapers
Torrenting now on 10.21.112.232:8080
```

People on the same network can now access and download the files by visiting the IP address and port given.

## Development
Git clone and install dependencies
```
git clone git@github.com:zweicoder/rift.git
cd rift && npm install
```

Watch files
`npm run watch`

Link and test the CLI interface when ready
`npm link`

## Suggestions
Suggestions on how to improve and make file sharing even more frictionless are welcome! Send a PR anytime!

## TODO
- [ ] User friendly interface for discovery of magnet links to support inter-network transfer
- [ ] Proper interface to easily download multiple files, perhaps a website or outputting a torrent file for torrent applications to manage
- [ ] Allow host to customize link / Self generate a user-friendly url