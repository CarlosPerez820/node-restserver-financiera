const {Schema, model} = require('mongoose');

const GastoSchema = Schema({
    sucursal: {
        type: String,
        required: [true, 'La Sucursal es obligatoria']
    },
    descripcion: {
        type: String,
        required:[true, 'La descripcion del gasto es obligatoria']
    },
    monto:{
        type: Number,
        required: [true, 'El monto del gasto es obligatorio']
    },
    fecha:{
        type: String,
        required: [true, 'La fecha del gasto es obligatoria']
    },
    metodo:{
        type: String,
        required: [true, 'El metodo de pago del gasto es obligatorio']
    },
    categoria:{
        type: String,
        required: [true, 'La categoria del gasto es obligatorio']
    },
    responsable:{
        type: String,
        required: [true, 'El responsable del gasto es obligatorio']
    },
});

GastoSchema.methods.toJSON = function(){
    const{__v, ...gasto} = this.toObject();
    return gasto;
}

module.exports = model('Gasto', GastoSchema);