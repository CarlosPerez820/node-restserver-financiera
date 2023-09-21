const path = require('path');
const {response} = require('express');
const {subirArchivo} = require('../helpers');
const Parametro = require('../models/parametro');
const Cliente = require('../models/cliente');
const Prestamo = require('../models/prestamo');
const { model } = require('mongoose');

const cargarArchivo = async (req, res=response) => {
    const {ruta, subruta, nombre} = req.params;

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json({ msg:'No existen archivos que subir'});
      return;
    }
    try {
        const nombreFinal = await subirArchivo(req.files,ruta,subruta,nombre);
        res.json({
            nombreFinal
        })
    } catch (msg) {
        res.status(400).json({msg});
    }  
}

actualizarImagen = async (req, res=response)=>{
    const {id, coleccion, ruta, subruta, nombre, opcion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'parametros':
            modelo = await Parametro.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe parametro con ese id'
                });
            }
            else{
                const rutaURL = await subirArchivo(req.files,ruta,subruta,nombre);
                modelo.urlLogo = rutaURL;

                await modelo.save();
            }
            break;

        case 'clientes':
            modelo = await Cliente.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe cliente con ese id'
                });
            }
            else{
                const rutaURL = await subirArchivo(req.files,ruta,subruta,nombre);
                switch (opcion) {
                    case 'comprobante':
                        modelo.fotoComprobante = rutaURL;
                        await modelo.save();
                        break;
                    case 'frente':
                        modelo.fotoIneFrente = rutaURL;
                        await modelo.save();
                        break;        
                    case 'reverso':
                        modelo.fotoIneReverso = rutaURL;
                        await modelo.save();
                        break;        
                    default:
                        return res.status(400).json({
                            msg: 'No existe esta opcion'
                        });
                        break;
                }
            }
            break;

        case 'prestamos':
            modelo = await Prestamo.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe prestamo con ese id'
                });
            }
            else{
                const rutaURL = await subirArchivo(req.files,ruta,subruta,nombre);
                switch (opcion) {
                    case 'dinero':
                        modelo.urlDinero = rutaURL;
                        await modelo.save();
                        break;
                    case 'pagare':
                        modelo.urlPagare = rutaURL;
                        await modelo.save();
                        break;        
                    case 'fachada':
                        modelo.urlFachada = rutaURL;
                        await modelo.save();
                        break;        
                    default:
                        return res.status(400).json({
                            msg: 'No existe esta opcion'
                        });
                        break;
                }
            }
            break;

        default:
            return res.status(500).json({msg: 'Validacion faltante'});
            break;
    }

    res.json(modelo);
}

module.exports={
    cargarArchivo,
    actualizarImagen,
}