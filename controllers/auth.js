const {response} = require('express');
const Usuario = require('../models/usuario');
const Gestor = require('../models/gestor');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response)=>{
    const {correo, password} = req.body;

    try {
     
        //Verificar si el Email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-correo'
            })
        } 

        //verificar si es usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-estado:False'
            })
        } 

        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-password'
            })
        } 

        const token = await generarJWT(usuario.id, usuario.sucursal, '','');

        res.json({
            msg:'Login OK',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte con el administrador'
        })
    }
}

const movil = async(req, res = response)=>{
    const {usuario, password} = req.body;

    try {
        
        //Verificar si el usuario existe
        const gestor = await Gestor.findOne({usuario});
        if(!gestor){
            return res.status(400).json({
                msg: 'Usuario / Password Verifica tus credenciales'
            })
        }
 
        //verificar si es usuario esta activo
        if(!gestor.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-estado:False'
            })
        } 
 
        //verificar la contraseña
        if(gestor.password!=password){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-password'
            })
        } 
 
        const token = await generarJWT(gestor.id, gestor.sucursal, gestor.usuario, gestor.nombre);
 
        res.json({
            msg:'Login MOVIL OK',
            gestor,
            token
        })
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte con el administrador'
        })
    }
}


module.exports={
    login,
    movil
}