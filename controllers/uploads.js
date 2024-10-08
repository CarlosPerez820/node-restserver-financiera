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

const actualizarImagen = async (req, res) => {
    try {
        const { id, coleccion, ruta, subruta, nombre, opcion } = req.params;

        let modelo;

        switch (coleccion) {
            case 'parametros':
                modelo = await Parametro.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: 'No existe parámetro con ese id'
                    });
                } else {
                    const rutaURL = await subirArchivo(req.files, ruta, subruta, nombre);
                    modelo.urlLogo = rutaURL;

                    await modelo.save();
                }
                break;

            case 'clientes':
                modelo = await Cliente.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: 'No existe cliente con ese id'
                    });
                } else {
                    const rutaURL = await subirArchivo(req.files, ruta, subruta, nombre);
                    switch (opcion) {
                        case 'perfil':
                            modelo.fotoPerfil = rutaURL;
                            break;
                        case 'comprobante':
                            modelo.fotoComprobante = rutaURL;
                            break;
                        case 'fachada':
                            modelo.fotoFachada = rutaURL;
                            break;
                        case 'frente':
                            modelo.fotoIneFrente = rutaURL;
                            break;
                        case 'reverso':
                            modelo.fotoIneReverso = rutaURL;
                            break;
                        default:
                            return res.status(400).json({
                                msg: 'No existe esta opción'
                            });
                    }
                    await modelo.save();
                }
                break;

            case 'prestamos':
                modelo = await Prestamo.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: 'No existe préstamo con ese id'
                    });
                } else {
                    const rutaURL = await subirArchivo(req.files, ruta, subruta, nombre);
                    switch (opcion) {
                        case 'dinero':
                            modelo.urlDinero = rutaURL;
                            break;
                        case 'pagare':
                            modelo.urlPagare = rutaURL;
                            break;
                        case 'fachada':
                            modelo.urlFachada = rutaURL;
                            break;
                        default:
                            return res.status(400).json({
                                msg: 'No existe esta opción'
                            });
                    }
                    await modelo.save();
                }
                break;

            default:
                return res.status(500).json({ msg: 'Validación faltante' });
        }

        res.json(modelo);
    } catch (error) {
        console.error('Error al actualizar la imagen:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

module.exports={
    cargarArchivo,
    actualizarImagen,
}