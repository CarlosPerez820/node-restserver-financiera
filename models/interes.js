const {Schema, model} = require('mongoose');

const InteresSchema = Schema({
    sucursal: {
        type: String,
        required: [true, 'La Sucursal es obligatoria']
    },
    limiteInferior:{
        type: Number,
        required: [true, 'El limite inferior es obligatorio']
    },
    limiteSuperior:{
        type: Number,
        required: [true, 'El limite superior es obligatorio']
    },
    porcentaje:{
        type: Number,
        required: [true, 'El porcentaje es obligatorio']
    }
});

InteresSchema.methods.toJSON = function(){
    const{__v, ...interes} = this.toObject();
    return interes;
}

module.exports = model('Interes', InteresSchema);