import { Player } from './player';
import * as net from 'net';
import { CircularList } from './circular_list';

let players: CircularList<Player> = new CircularList<Player>();

let server: net.Server = net.createServer((socket: net.Socket) => {
    function notifyAllPlayers(message:string) {
            let sockets: Array<net.Socket> = players.toArray().map((player) => player.socket);
            sockets.forEach((socket) => socket.write(JSON.stringify({
                "type": 'response',
                "response-type": 'string',
                "use" : 'none',
                "query-string": message,
            })));
        

    }

    console.log(`Alguém entrou! ${players.size}`)
    socket.write(JSON.stringify({
        "type": 'request',
        "response-type": 'string',
        "use" : 'register',
        "query-string": 'Bem-vindo! Digite seu nome:'
    }))




    socket.on("data", (data) => {
        let decodedData : any = JSON.parse(data.toString());
        console.log(decodedData);
        if(decodedData['type'] === 'response') {

            if(decodedData['use'] === 'register') {
                let player: Player = new Player(decodedData['query-string'], socket);
                if(players.size > 0) {
                    notifyAllPlayers(`Que bom! ${player.name} também está jogando.`)
                } 
                players.insert(player);
                
            }

        }
    })
})


server.listen(3000, () => {
    console.log('Servidor inicializado na porta 3000');
});