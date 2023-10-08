const {response} = require('express');
const Cliente = require('../models/cliente');


const buroGet = async(req, res = response) => {

    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{estado: true},{ clasificacion: 'C'}]};

    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        clientes
    })
}

const clientesGet = async(req, res = response) => {
    const {limite =150, desde=0} = req.query;
    const query = {estado: true};

    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        clientes
    })
}

const clientesFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera}]};

    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        clientes
    })
}

const clientesPorNumeroFinancieraGet = async(req, res= response)=>{
    const {financiera, parametro} = req.params;

    const {limite = 5, desde=0} = req.query;
    const query = {$and:[{estado: true},{ sucursal: financiera},{ numeroCliente: parametro}]};

    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        clientes
    })
}

const clienteEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const cliente = await Cliente.findById(id)

    res.json({
        cliente
    })
}

const clientesPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, numeroCliente, _id, ...resto} = req.body;

    //Validar contra la BD
    const cliente = await Cliente.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        cliente,
        resto
    })
}

const clientesPost = async(req, res = response) => {

    //Obtener los datos que recibimos en el Body por la peticion
    const body = req.body;
    const cliente = new Cliente(body);

    //Guardar en la BD
    await cliente.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        cliente
    })
}

const clientesDelete = async(req, res = response) => {
    const {id} = req.params;

    const cliente = await Cliente.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: "DELETE a mi API - Controlador",
        cliente
    })
}

const clientesPatch = (req, res = response) => {
    res.json({
        msg: "PATCH a mi API - Controlador clientes"
    })
}

module.exports = {
    clientesGet,
    buroGet,
    clientesFinancieraGet,
    clienteEspecificoGet,
    clientesPut,
    clientesPost,
    clientesDelete,
    clientesPatch,
    clientesPorNumeroFinancieraGet
}