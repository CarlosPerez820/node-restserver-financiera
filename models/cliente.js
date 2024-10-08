const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    numeroCliente: {
        type: String,
        required: [true, 'El numero de cliente es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    edad: {
        type: String,
        required: [true, 'La edad es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatorio']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia es obligatorio']
    },
    senasDomicilio: {
        type: String
    },
    entreCalles: {
        type: String
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatorio']
    },
    celular: {
        type: String,
        required: [true, 'El celular es obligatorio']
    },
    telefonoFijo: {
        type: String
    },
    telefonoAdicional: {
        type: String
    },
    estadoCivil: {
        type: String,
        required: [true, 'El estado civil es obligatorio']
    },
    tiempoCasados: {
        type: String
    },
    dependientes: {
        type: String,
        required: [true, 'Los dependientes son obligatorio']
    },
    tipoVivienda: {
        type: String,
        required: [true, 'El tipo de vivienda es obligatorio es obligatorio']
    },
    tiempoViviendo: {
        type: String
    },
    pagoRenta: {
        type: String
    },
    tipoNegocio: {
        type: String,
        required: [true, 'El tipo de negocio es obligatorio']
    },
    tiempoNegocio: {
        type: String
    },
    numeroIdentificacion: {
        type: String,
        required: [true, 'El numero de identificacion es obligatorio']
    },
    RFC: {
        type: String,
        required: [true, 'El RFC es obligatorio']
    },
    nombreConyugue: {
        type: String,
        required: [true, 'El nombre del conyugue es obligatorio']
    },
    trabajoConyugue: {
        type: String
    },
    domicilioConyugue: {
        type: String
    },
    antiguedadConyugue: {
        type: String
    },
    ingresoSolicitante: {
        type: Number,
        required: [true, 'El ingreso es obligatorio']
    },
    ingresoConyugue: {
        type: Number
    },
    gastosTotales: {
        type: Number,
        required: [true, 'Los gastos totales son obligatorio']
    },
    gestorAsignado: {
        type: String,
        required: [true, 'El gestor es obligatorio']
    },
    fotoComprobante: {
        type: String
    },
    fotoPerfil: {
        type: String
    },
    fotoFachada: {
        type: String
    },
    fotoIneFrente: {
        type: String
    },
    fotoIneReverso: {
        type: String
    },
    tipo: {
        type: String,
        required: [true, 'El tipo de cliente es obligatorio']
    },
    fechaRegistro: {
        type: String,
        required: [true, 'La fecha Registro es obligatorio']
    },
    numeroPrestamos: {
        type: Number,
        required: [true, 'El numero de prestamos es obligatorio']
    },
    numeroActivos: {
        type: Number,
        required: [true, 'El numero de prestamos Activos es obligatorio']
    },
    prestamosActivos: {
        type: Boolean,
        required: [true, 'Si tiene prestamos activos es obligatorio'],
        default: false
    },
    clasificacion: {
        type: String,
        required: [true, 'La clasificacion es obligatorio']
    },
    sucursal: {
        type: String,
        required: [true, 'La sucursal es obligatorio']
    },
    puntuacion: {
        type: String,
        default:0
    },
    comentarios: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }

});

ClienteSchema.methods.toJSON = function(){
    const{__v, ...cliente} = this.toObject();
    return cliente;
}

module.exports = model('Cliente',ClienteSchema);