const {Schema, model} = require('mongoose');

const prestamoSchema = Schema({
    fecha: {
        type: String,
        required: [true, 'La fecha del prestamo es obligatorio']
    },
    folio: {
        type: String,
        required: [true, 'El folio del prestamo es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefofno es obligatoria']
    },
    cobranza: {
        type: Number,
        required: [true, 'La cobranza es obligatoria']
    },
    cantidadPrestamo: {
        type: Number,
        required: [true, 'La cantidad del prestamo es obligatoria']
    },
    cantidadPagar: {
        type: Number,
        required: [true, 'La cantidad a pagar del prestamo es obligatoria']
    },
    plazoPrestamo: {
        type: Number,
        required: [true, 'El plazo del prestamo es obligatoria']
    },
    totalRestante: {
        type: Number,
        required: [true, 'El total restante del prestamo es obligatoria']
    },
    pagoDiario: {
        type: Number,
        required: [true, 'El pago diario del prestamo es obligatoria']
    },
    fechaPago: {
        type: String,
        required: [true, 'La fecha del ultimo pago es obligatoria']
    },
    tipoUltiPago: {
        type: String,
        required: [true, 'El tipo del ultimo pago es obligatoria']
    },
    gestor: {
        type: String,
        required: [true, 'El gestor es obligatoria']
    },
    estatus: {
        type: String,
        required: [true, 'El estatus  del prestamo es obligatorio']
    },
    nota: {
        type: String,
        required: [true, 'La nota  del prestamo es obligatorio']
    },
    numeroCliente: {
        type: String,
        required: [true, 'El numero de cliente del prestamo es obligatoria']
    },
    urlDinero: {
        type: String
    },
    urlPagare: {
        type: String
    },
    urlFachada: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    sucursal: {
        type: String,
        required: [true, 'La sucursal es obligatoria']
    }
});

prestamoSchema.methods.toJSON = function(){
    const{__v, ...prestamo} = this.toObject();
    return prestamo;
}

module.exports = model('Prestamos', prestamoSchema);