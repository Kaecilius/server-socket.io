import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    //importando socket.io
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = new socketIO.Server( this.httpServer,
                                        {   cors:{ origin:true, credentials: true },
                                            transports: ['websocket', 'polling'] 
                                        }
                                    );
        this.escucharScokets();
    }

    public static get Instance() {
        return this._instance || ( this._instance = new this() );
    }

    private escucharScokets() {
        console.log('escuchando conexiones - Sockets');

        this.io.on('connection', (cliente) => {
            console.log('Cliente conectado');

           //Desconectar
           socket.desconectar( cliente );

           //Mensajes
           socket.mensaje( cliente, this.io );
        });
    }

    start( callback:any ){
        this.httpServer.listen( this.port, callback );
    }

}