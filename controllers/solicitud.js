const {response} = require('express');
const Solicitud = require('../models/solicitud');

const solicitudGet = async(req, res = response) => {
    const {limite =150, desde=0} = req.query;
    const query = {estado: true};

    const [total, solicitudes] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        solicitudes
    })
}

const solicitudFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 300, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera}]};

    const [total, solicitudes] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        solicitudes
    })
}

const solicitudValidosGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 300, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera},{estatus:'Pendiente'}]};

    const [total, solicitudes] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        solicitudes
    })
}

const solicitudEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const solicitud = await Solicitud.findById(id)

    res.json({
        solicitud
    })
}

const solicitudPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, _id, ...resto} = req.body;

    //Validar contra la BD
    const solicitud = await Solicitud.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        solicitud,
        resto
    })
}

const solicitudPost = async(req, res = response) => {
    const body = req.body;
    const solicitud = new Solicitud(body);

    //Guardar en la BD
    await solicitud.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        solicitud
    })
}

const solicitudDelete = async(req, res = response) => {
    const {id} = req.params;

    const solicitud = await Solicitud.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: "DELETE a mi API - Controlador",
        solicitud
    })
}

const solicitudPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador"
    })
}


module.exports = {
    solicitudGet,
    solicitudFinancieraGet,
    solicitudValidosGet,
    solicitudEspecificoGet,
    solicitudPut,
    solicitudPost,
    solicitudDelete,
    solicitudPatch
}