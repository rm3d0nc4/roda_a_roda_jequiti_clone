import * as net from 'net'
import PromptSync from 'prompt-sync';
const promt = PromptSync();
const input = (msg: string) => promt(msg); 


const socket: net.Socket = new net.Socket();

socket.connect(3000, 'localhost', () => {
    console.log('Conectado ao servidor');
 });

socket.on('data', (data) => {
    let decodedData = JSON.parse(data.toString());
    // console.log(decodedData);
    if(decodedData['type'] === 'request') {
        if (decodedData['use'] === 'register') {
            let name = input(decodedData['query-string']);
            socket.write(JSON.stringify({
                "type": 'response',
                "response-type": 'string',
                "use" : decodedData['use'],
                "query-string": name,
            }))
        } 
    } else if(decodedData['type'] === 'response') {
        if (decodedData['use'] === 'none') {
            console.log(decodedData['query-string']);
        }
    }

})