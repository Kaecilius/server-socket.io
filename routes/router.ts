import { Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();


router.get('/pruebas',(req:Request, res:Response) =>{
    res.json({
        ok:true,
        mensaje:'Mensaje desde prueba ok'
    })

})

router.get('/mensajes',( req: Request, res: Response) => {
    res.json({
        ok:true,
        mensaje: 'Todo esta bien ;)'
    });
});

router.post('/mensajes',( req: Request, res: Response) => {

    //leer la informacion:
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    //payload
    const payload = {
        cuerpo,
        de
    }

    const server = Server.Instance;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok:true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id',( req: Request, res: Response) => {

    //leer la informacion:
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    //obtener el Id
    const id     = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.Instance;

    server.io.in( id ).emit( 'mensaje-privado' , payload );

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    });
});

export default router;