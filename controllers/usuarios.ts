import { Request, Response } from "express";
import Usuario from "../models/usuario";
import usuario from "../models/usuario";


export const getUsuarios = async(req : Request, res: Response) => {

    const usuario = await Usuario.findAll();
    console.log(usuario);

        res.json({
            msg: 'get usuarios',
            usuario
        })
}



export const getUsuarioById = async(req : Request, res: Response) => {
    const {id}  = req.params;

    try {
        const usuario = await Usuario.findByPk(id);   
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: `El usuario con el id ${id} no existe en la base`
            })
        }
        res.json({
            msg: 'get usuario',
            usuario
        });
    } catch (error) {
        
    }
}



export const postUsuarios = async(req : Request, res: Response) => {
    const {body} = req;
    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(500).json({
                ok:false,
                msg: `Este email ya existe en la base d edatos`
            })
        }

        const usuario  =  await Usuario.create(body)

        return res.json({
            ok:true,
            usuario
        })

    } catch (error) {
        console.log(error);
        res.json({
            msg: 'hable con el administrador',
        });
    }

}


export const putUsuario = async(req : Request, res: Response) => {
    const {id}  = req.params;
    const {body} = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario) return res.status(400).json({ok:false, msg: 'El usuario no existe en la base de datos'})

        await Usuario.update({...body},{where : {idUsuario: id}});
        

        res.json({
            msg: 'put usuarios',
            id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Este correo ya existe en la base de datos '
        })
    }
}



export const deleteUsuario = async(req : Request, res: Response) => {
    const {id}  = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario) return res.status(400).json({ok:false, msg: 'El usuario no existe en la base de datos'})
        const estado = usuario.getDataValue('estado');
        //eliminacion fisica
         //await usuario.destroy()

         //eliminacion logica
        //await usuario.update({estado: (estado === 1 ) ? 0:1 }, {where:{idUsuario: id}})

        await usuario.update({estado: false }, {where:{idUsuario: id}})


        res.json({
            ok:true,
            msg: `el usuario ${usuario.getDataValue('nombre')} ha sido eliminado`
            
        }) 
    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg: 'Error al eliminar'
        })
        
    }
}


