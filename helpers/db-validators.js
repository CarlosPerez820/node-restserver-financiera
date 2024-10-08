const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');
const Gestor = require('../models/gestor');
const Interes = require('../models/interes');
const Pago = require('../models/pago');
const Parametro = require('../models/parametro');
const Prestamo = require('../models/prestamo');
const Solicitud = require('../models/solicitud');
const Gasto = require('../models/gasto');
const Dotacion = require('../models/dotacion');


const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol)
    {
        throw new Error(`El rol: ${rol} no existe en la base de datos`);
    }
}

const correoDisponible = async(correo)=>{

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail)
    {
        throw new Error(`El correo: ${correo} ya existe en la base de datos`);
    }
}

const sucursalDisponible = async(sucursal)=>{

    const existeSucursal = await Usuario.findOne({sucursal});
    if(existeSucursal)
    {
        throw new Error(`La sucursal: ${sucursal} ya existe en la base de datos`);
    }

}

const numeroClienteDisponible = async(numeroCliente)=>{

    const existeCliente = await Cliente.findOne({numeroCliente});
    if(existeCliente)
    {
        throw new Error(`El numero de Cliente: ${numeroCliente} ya existe en la base de datos`);
    }

}

const existeUsuarioID = async(id)=>{
    
    const existeUsuario = await Usuario.findById(id);
       
    if(!existeUsuario)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeClienteID = async(id)=>{
    
    const existeCliente = await Cliente.findById(id);
       
    if(!existeCliente)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeGestorID = async(id)=>{
    
    const existeGestor = await Gestor.findById(id);
       
    if(!existeGestor)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeInteresID = async(id)=>{
    
    const existeInteres = await Interes.findById(id);
       
    if(!existeInteres)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existePagoID = async(id)=>{
    
    const existePago = await Pago.findById(id);
       
    if(!existePago)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeGastoID = async(id)=>{
    
    const existeGasto = await Gasto.findById(id);
       
    if(!existeGasto)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeDotacionID = async(id)=>{
    
    const existeDotacion = await Dotacion.findById(id);
       
    if(!existeDotacion)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeParametroID = async(id)=>{
    
    const existeParametro = await Parametro.findById(id);
       
    if(!existeParametro)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existePrestamoID = async(id)=>{
    
    const existePrestamo = await Prestamo.findById(id);
       
    if(!existePrestamo)
    {   
        throw new Error(`El ID: ${id} de prestamo no existe en la base de datos`);
    }
}

const existeSolicitudID = async(id)=>{
    const existeSolicitud = await Solicitud.findById(id);  
    if(!existeSolicitud)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

//Validar Coleccion para Subida de imagenes
const coleccionesPermitidas = (coleccion = '', colecciones=[])=>{

    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La coleccion: ${coleccion} no esta permitida para imagenes`);
    }
    return true;
}

const usuarioDisponible = async(usuario)=>{

    const existeUsuario = await Gestor.findOne({usuario});
    if(existeUsuario)
    {
        throw new Error(`El Usuario: ${usuario} No esta disponible`);
    }

}

module.exports = {
    esRoleValido,
    correoDisponible,
    existeUsuarioID,
    sucursalDisponible,
    numeroClienteDisponible,
    existeClienteID,
    existeGestorID,
    existeInteresID,
    existePagoID,
    existeParametroID,
    existePrestamoID,
    existeGastoID,
    existeDotacionID,
    existeSolicitudID,
    coleccionesPermitidas,
    usuarioDisponible
}