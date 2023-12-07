const {Schema, model} = require('mongoose');

const PagoSchema = Schema({
    fecha: {
        type: String,
        required: [true, 'La fecha en que realizo el pago es obligatorio']
    },
    folio: {
        type: String,
        required: [true, 'El folio del prestamo es obligatorio'],
    },
    nombreCliente: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },
    numCliente: {
        type: String,
        required: [true, 'El numero de cliente es obligatoria']
    },
    cobranza: {
        type: Number,
        required: [true, 'La cobranza es obligatoria']
    },
    cantidadPrestamo: {
        type: Number,
        required: [true, 'La cantidad del prestamo es obligatoria']
    },
    plazo: {
        type: Number,
        required: [true, 'El plazo del prestamo es obligatorio']
    },
    totalPagar: {
        type: Number,
        required: [true, 'El total a pagar es obligatorio']
    },
    totalRestante: {
        type: Number,
        required: [true, 'El total restante es obligatorio']
    },
    pagoDiario: {
        type: Number,
        required: [true, 'El pago diario es obligatorio']
    },
    folioPrestamo: {
        type: String,
        required: [true, 'El folio del prestamo es obligatorio']
    },
    fechaPago: {
        type: String,
        required: [true, 'La fecha del ultimo pago del prestamo es obligatoria']
    },
    horaPago: {
        type: String,
        required: [true, 'La Hora del ultimo pago del prestamo es obligatoria']
    },
    gestor: {
        type: String,
        required: [true, 'El gestor asignado es obligatorio']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo del pago es obligatorio']
    },
    comentario: {
        type: String,
    },
    abono: {
        type: Number,
        required: [true, 'El abono es obligatorio']
    },
    personasCobrador: {
        type: String,
        required: [true, 'La persona que cobro es obligatoria']
    },
    sucursal: {
        type: String,
        required: [true, 'La sucursal es obligatoria']
    }
});

PagoSchema.methods.toJSON = function(){
    const{__v, ...pago} = this.toObject();
    return pago;
}

module.exports = model('Pago', PagoSchema);