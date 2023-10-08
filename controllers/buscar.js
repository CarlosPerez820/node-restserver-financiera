const {response} = require('express');
const Cliente = require('../models/cliente')

const buscarClientes  = async(req, res= response)=>{
   /* const regex = new RegExp(termino, 'i');

    const clientes = await Cliente.find({numeroIdentificacion:regex});

    res.json({
        results: clientes
    })

*/
    //*----------
    const {termino} = req.params;

    const {limite = 15, desde=0} = req.query;
    const query = {$and:[{estado: true},{ numeroIdentificacion: termino}]};

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

const buscar = (req, res= response) =>{
    const {termino} = req.params;

    buscarClientes(termino, res)
}

module.exports = {
    buscar,
    buscarClientes
}