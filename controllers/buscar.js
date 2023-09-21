const {response} = require('express');
const Cliente = require('../models/cliente')

const buscarClientes = async(termino = '', res=response)=>{

    const regex = new RegExp(termino, 'i');

    const clientes = await Cliente.find({numeroIdentificacion:regex});

    res.json({
        results: clientes
    })
}

const buscar = (req, res= response) =>{
    const {termino} = req.params;

    buscarClientes(termino, res)
}

module.exports = {
    buscar
}