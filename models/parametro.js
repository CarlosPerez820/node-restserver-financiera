const {Schema, model} = require('mongoose');

const ParametroSchema = Schema({
    urlLogo: {
        type: String
    },
    montoMora: {
        type: Number,
        required: [true, 'El monto de la mora es obligatoria']
    },
    horaLimite: {
        type: String,
        required: [true, 'La hora limite de los pagos es obligatoria']
    },
    tipoCobro: {
        type: String,
        required: [true, 'El tipo de cobro es importante']
    },
    idAdministrador: {
        type: String,
        required: [true, 'El ID del administrador asignado es obligatorio']
    },
    sucursal:{
        type: String,
        required: [true, 'El tnombre de la sucursal es importante']
    }
});

ParametroSchema.methods.toJSON = function(){
    const{__v, ...parametro} = this.toObject();
    return parametro;
}

module.exports = model('Parametro', ParametroSchema);