const {response} = require('express');
const Parametro = require('../models/parametro');

const parametroGet = async(req, res = response) => {
    const {limite =150, desde=0} = req.query;

    const [total, parametros] = await Promise.all([
        Parametro.countDocuments(),
        Parametro.find()
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        parametros
    })
}

const parametroFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const parametros = await Parametro.find({sucursal: financiera});

    res.json({
        parametros
    })
}

const parametroPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, _id, ...resto} = req.body;

    //Validar contra la BD
    const parametro = await Parametro.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        parametro
    })
}

const parametroPost = async(req, res = response) => {
    const body = req.body;
    const parametro = new Parametro(body);

    //Guardar en la BD
    await parametro.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        parametro
    })
}

const parametroDelete = async(req, res = response) => {
    const {id} = req.params;

    //Borrar Fisicamente
    const parametro = await Parametro.findByIdAndDelete(id);
    res.json({
        msg: "DELETE a mi API - Controlador",
        parametro
    })
}

const parametroPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador"
    })
}


module.exports = {
    parametroGet,
    parametroFinancieraGet,
    parametroPut,
    parametroPost,
    parametroDelete,
    parametroPatch
}