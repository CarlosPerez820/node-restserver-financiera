const {response} = require('express');
const Gasto = require('../models/gasto');

const GastosFinancieraGet = async(req, res= response)=>{
    const {financiera} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = { sucursal: financiera};

    const [total, gastos] = await Promise.all([
        Gasto.countDocuments(query),
        Gasto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        gastos
    })
}

const GastosDiaGet = async(req, res = response) => {
    const { financiera, fechaInicio, fechaFin } = req.params; // Aceptamos fecha de inicio y fecha de fin
    const { limite = 200, desde = 0 } = req.query;

    // Modificamos el query para buscar entre un rango de fechas como cadenas de texto
    const query = {
        $and: [
            { sucursal: financiera },
            { fecha: { $gte: fechaInicio, $lte: fechaFin } } // No convertimos las fechas a Date
        ]
    };

    const [total, gastos] = await Promise.all([
        Gasto.countDocuments(query),
        Gasto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        gastos
    });
};

const GastosResponsableGet = async(req, res= response)=>{
    const {financiera, usuario} = req.params;

    const {limite = 200, desde=0} = req.query;
    const query = {$and:[{ sucursal: financiera}, {responsable:usuario}]};

    const [total, gastos] = await Promise.all([
        Gasto.countDocuments(query),
        Gasto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        gastos
    })
}

const GastoEspecificoGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const gasto = await Gasto.findById(id)

    res.json({
        gasto
    })
}

const GastoPut = async(req, res = response) => {
    const {id} = req.params;
    const {sucursal, _id, ...resto} = req.body;

    const gasto = await Gasto.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        gasto
    })
}

const GastoPost = async(req, res = response) => {
    const body = req.body;
       const gasto = new Gasto(body);
   
       await gasto.save();
   
       res.json({
           msg: "POST a mi API----- Controlador",
           gasto
       })
}

const GastoDelete = async(req, res = response) => {

    const {id} = req.params;
    const gasto = await Gasto.findByIdAndDelete(id);

    res.json({
        msg: "DELETE a mi API - Controlador",
        gasto
    })
}

module.exports = {
    GastosFinancieraGet,
    GastosDiaGet,
    GastosResponsableGet,
    GastoEspecificoGet,
    GastoPost,
    GastoPut,
    GastoDelete

}