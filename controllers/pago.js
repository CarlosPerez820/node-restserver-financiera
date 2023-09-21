const {response} = require('express');
const Pago = require('../models/pago');

const pagoGet = async(req, res = response) => {
    const {limite =150, desde=0} = req.query;

    const [total, pago] = await Promise.all([
        Pago.countDocuments(),
        Pago.find()
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        pago
    })
}

const pagosFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = { sucursal: financiera};

    const [total, pagos] = await Promise.all([
        Pago.countDocuments(query),
        Pago.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        pagos
    })
}

const pagosPrestamoGet = async(req, res= response)=>{
    const {financiera, folio} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{folioPrestamo: folio},{ sucursal: financiera}]};

    const [total, pagos] = await Promise.all([
        Pago.countDocuments(query),
        Pago.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        pagos
    })
}

const pagosDiaGet = async(req, res= response)=>{
    const {financiera, fech} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{fecha: fech},{ sucursal: financiera}]};

    const [total, pagos] = await Promise.all([
        Pago.countDocuments(query),
        Pago.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        pagos
    })
}

const pagosEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const pago = await Pago.findById(id)

    res.json({
        pago
    })
}


const pagoPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, _id, ...resto} = req.body;

    //Validar contra la BD
    const pago = await Pago.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        pago
    })
}

const pagoPost = async(req, res = response) => {
    const body = req.body;
       const pago = new Pago(body);
   
       //Guardar en la BD
       await pago.save();
   
       res.json({
           msg: "POST a mi API----- Controlador",
           pago
       })
}

const pagoDelete = async(req, res = response) => {

    const {id} = req.params;
    //Borrar Fisicamente
    const pago = await Pago.findByIdAndDelete(id);

    res.json({
        msg: "DELETE a mi API - Controlador",
        pago
    })
}

const pagoPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador"
    })
}


module.exports = {
    pagoGet,
    pagosFinancieraGet,
    pagosDiaGet,
    pagosPrestamoGet,
    pagosEspecificoGet,
    pagoPut,
    pagoPost,
    pagoDelete,
    pagoPatch
}