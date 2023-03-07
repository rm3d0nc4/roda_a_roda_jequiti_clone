import * as net from 'net'
let prompt = require('prompt-sync');

export class Player {
    socket: net.Socket
    score: number = 0;
    name: string;

    constructor(name: string, socket: net.Socket) {
        this.name = name;
        this.socket = socket;
    }
}
