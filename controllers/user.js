const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = async(req, res = response) => {

   // const query = req.query;
    //const {q, nombre='no name', key} = req.query;
    const {limite =150, desde=0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {password, google, correo, _id, ...resto} = req.body;

    //Validar contra la BD
    if(password)
    {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        usuario
    })
}

const usuariosPost = async (req, res = response) => {
    
    //Obtener los datos que recibimos en el Body por la peticion
    const {password, correo, ...resto} = req.body;
    const usuario = new Usuario({password, correo, ...resto});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en la BD
    await usuario.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        usuario
    })
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //Borrar Fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: "DELETE a mi API - Controlador",
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador"
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}