const {response} = require('express');
const Interes = require('../models/interes');

const interesGet = async(req, res = response) => {
    const {limite =150, desde=0} = req.query;
    const query = {estado: true};

    const [total, intereces] = await Promise.all([
        Interes.countDocuments(),
        Interes.find()
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        intereces
    })
}

const interesFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = { sucursal: financiera};

    const [total, intereces] = await Promise.all([
        Interes.countDocuments(query),
        Interes.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        intereces
    })
}

const interesEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const interes = await Interes.findById(id)

    res.json({
        interes
    })
}

const interesPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, _id, ...resto} = req.body;

    //Validar contra la BD
    const interes = await Interes.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        interes
    })
}

const interesPost = async(req, res = response) => {
    const body = req.body;
       const interes = new Interes(body);
   
       //Guardar en la BD
       await interes.save();
   
       res.json({
           msg: "POST a mi API----- Controlador",
           interes
       })
}

const interesDelete = async(req, res = response) => {
    const {id} = req.params;

    //Borrar Fisicamente
    const interes = await Interes.findByIdAndDelete(id);
    
    res.json({
        msg: "DELETE a mi API - Controlador",
        interes
    })
}

const interesPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador"
    })
}


module.exports = {
    interesGet,
    interesFinancieraGet,
    interesEspecificoGet,
    interesPut,
    interesPost,
    interesDelete,
    interesPatch
}