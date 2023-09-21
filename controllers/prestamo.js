const {response} = require('express');
const Prestamo = require('../models/prestamo');

const prestamoGet = async(req, res = response) => {
    const {limite =150, desde=0} = req.query;
    const query = {estado: true};

    const [total, prestamos] = await Promise.all([
        Prestamo.countDocuments(query),
        Prestamo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        prestamos
    })
}

const prestamoFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 300, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera}]};

    const [total, prestamos] = await Promise.all([
        Prestamo.countDocuments(query),
        Prestamo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        prestamos
    })
}

const prestamosValidosGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 300, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera},{estatus:{ $ne: 'Finalizado' }}]};

    const [total, prestamos] = await Promise.all([
        Prestamo.countDocuments(query),
        Prestamo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        prestamos
    })
}

const prestamosClientesGet = async(req, res= response)=>{
    const {financiera, cliente} = req.params;

    const {limite = 300, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera},{numeroCliente:cliente}]};

    const [total, prestamos] = await Promise.all([
        Prestamo.countDocuments(query),
        Prestamo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        prestamos
    })
}

const prestamoEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const prestamo = await Prestamo.findById(id)

    res.json({
        prestamo
    })
}

const prestamoPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, folio, _id, ...resto} = req.body;

    //Validar contra la BD
    const prestamo = await Prestamo.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        prestamo
    })
}

const prestamoPost = async(req, res = response) => {
    const body = req.body;
    const prestamo = new Prestamo(body);

    //Guardar en la BD
    await prestamo.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        prestamo
    })
}

const prestamoDelete = async(req, res = response) => {
    const {id} = req.params;

    const prestamo = await Prestamo.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: "DELETE a mi API - Controlador",
        prestamo
    })
}

const prestamoPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador"
    })
}


module.exports = {
    prestamoGet,
    prestamoFinancieraGet,
    prestamosClientesGet,
    prestamosValidosGet,
    prestamoEspecificoGet,
    prestamoPut,
    prestamoPost,
    prestamoDelete,
    prestamoPatch
}