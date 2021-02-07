import { Usuario } from './usuario';
//centralizar la logica de los usuarios

export class UsuarioLista {

    private lista:Usuario[] = [];


    constructor(){

    }

    //Metodo para agregar un usuario
    public agregar( usuario: Usuario ){

        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;

    }

    //Actualizar nombre
    public actualizarNombre( id:string, nombre:string ){

        for(let usuario of this.lista ){

            if( usuario.id === id ){

                usuario.nombre = nombre;
                break;

            }
        }

        console.log(' Actualizando usuario ....');
        console.log( this.lista );

    }

    //metodo para obtener lista de usuarios conectados
    public getLista(){

        return this.lista;

    }


    //metodo para retornar un usuario
    public getUsuario( id:string ){

        return this.lista.find( usuario => usuario.id === id );

    }


    //Obtener usuarios en una sala en particular:
    public getusuarioSala( sala:string ){

        return this.lista.filter( usuario => usuario.sala === sala );

    }


    // borrar usuario:

    public borrarUsuario( id:string ){

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;
    }
}