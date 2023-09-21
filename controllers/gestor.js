const {response} = require('express');
const Gestor = require('../models/gestor');
const bcryptjs = require('bcryptjs');


const gestoresGet = async(req, res = response) => {

    const {limite =150, desde=0} = req.query;
    const query = {estado: true};

    const [total, gestores] = await Promise.all([
        Gestor.countDocuments(query),
        Gestor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        gestores
    })
}

const gestoresFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera}]};

    const [total, gestores] = await Promise.all([
        Gestor.countDocuments(query),
        Gestor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        gestores
    })
}

const gestorEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const gestor = await Gestor.findById(id)

    res.json({
        gestor
    })
}

const gestoresPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, _id, ...resto} = req.body;

    //Validar contra la BD
    const gestor = await Gestor.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        gestor
    })
}

const gestoresPost = async(req, res = response) => {

       const body = req.body;
       const gestor = new Gestor(body);
   
       //Guardar en la BD
       await gestor.save();
   
       res.json({
           msg: "POST a mi API----- Controlador",
           gestor
       })
}

const gestoresDelete = async(req, res = response) => {
    const {id} = req.params;
   
    const gestor = await Gestor.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: "DELETE a mi API - Controlador",
        gestor
    })
}

const gestoresPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador"
    })
}


module.exports = {
    gestoresGet,
    gestoresFinancieraGet,
    gestorEspecificoGet,
    gestoresPut,
    gestoresPost,
    gestoresDelete,
    gestoresPatch
}