import { WebSocketServer } from 'ws';
import { User } from './User';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws: any) {
    console.log("yser connected")
    let user = new User(ws)
    console.log("yser connected1")
    ws.on('error', console.error);

    ws.on('close', () => {
        user.destroy();
    })
});