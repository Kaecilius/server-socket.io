import SocketIO from 'socket.io';
import { Socket } from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';



export const usuariosConectados = new UsuarioLista();


export const conectarCliente = ( cliente:Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () =>{

        console.log('cliente deconectado');
        usuariosConectados.borrarUsuario( cliente.id );

    });

}


//escuchar mensajes
export const mensaje = (cliente:Socket, io:SocketIO.Server ) => {
    cliente.on('mensaje', (payload:{ de:string, cuerpo:string} )=>{
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

//escuchar usuario conectado desde el login
export const usuario = ( cliente:Socket ) => {

    cliente.on('configurar-usuario', (payload: { nombre:string } , callback:Function)=>{

        //console.log('usuario conectado', payload);

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre )

        callback({
            ok:true,
            mensaje:`Usuario ${ payload.nombre } configurado`
        });

    });

}