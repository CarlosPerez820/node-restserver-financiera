const {response} = require('express');
const Seguimiento = require('../models/seguimiento');

const seguimientoFinancieraGet = async (req, res = response) => {

    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = { sucursal: financiera};

    const [total, seguimientos] = await Promise.all([
        Seguimiento.countDocuments(query),
        Seguimiento.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        seguimientos
    })
}

const seguimientoGestorGet = async (req, res = response) => {

    const {financiera, encargado} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{gestor: encargado},{ sucursal: financiera}]};

    const [total, seguimientos] = await Promise.all([
        Seguimiento.countDocuments(query),
        Seguimiento.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        seguimientos
    })
}

const seguimientoPost = async(req, res = response) => {

    const body = req.body;
    const seguimiento = new Seguimiento(body);

    //Guardar en la BD
    await seguimiento.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        seguimiento
    })
}

module.exports = {
    seguimientoPost,
    seguimientoFinancieraGet,
    seguimientoGestorGet
}
