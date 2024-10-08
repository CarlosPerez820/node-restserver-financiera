const {response} = require('express');
const Dotacion = require('../models/dotacion');

const dotacionFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = { sucursal: financiera};

    const [total, dotaciones] = await Promise.all([
        Dotacion.countDocuments(query),
        Dotacion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        dotaciones
    })
}

const dotacionDiaGet = async(req, res= response)=>{
    const {financiera, dia} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{ sucursal: financiera}, {fecha:dia}]};

    const [total, dotaciones] = await Promise.all([
        Dotacion.countDocuments(query),
        Dotacion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        dotaciones
    })
}

const dotacionResponsableGet = async(req, res= response)=>{
    const {financiera, usuario} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{ sucursal: financiera}, {gestor:usuario}]};

    const [total, dotaciones] = await Promise.all([
        Dotacion.countDocuments(query),
        Dotacion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        dotaciones
    })
}

const dotacionEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const dotacion = await Dotacion.findById(id)

    res.json({
        dotacion
    })
}

const dotacionPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, _id, ...resto} = req.body;

    const dotacion = await Dotacion.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        dotacion
    })
}

const dotacionPost = async(req, res = response) => {
    const body = req.body;
       const dotacion = new Dotacion(body);
   
       await dotacion.save();
   
       res.json({
           msg: "POST a mi API----- Controlador",
           dotacion
       })
}

const dotacionDelete = async(req, res = response) => {

    const {id} = req.params;
    const dotacion = await Dotacion.findByIdAndDelete(id);

    res.json({
        msg: "DELETE a mi API - Controlador",
        dotacion
    })
}

module.exports = {
    dotacionFinancieraGet,
    dotacionDiaGet,
    dotacionResponsableGet,
    dotacionEspecificoGet,
    dotacionPost,
    dotacionPut,
    dotacionDelete

}