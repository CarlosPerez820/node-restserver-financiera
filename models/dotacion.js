const {Schema, model} = require('mongoose');

const DotacionSchema = Schema({
    sucursal: {
        type: String,
        required: [true, 'La Sucursal es obligatoria']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria'],
    },
    gestor: {
        type: String,
        required: [true, 'El gestor es obligatorio']
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio']
    }
});

DotacionSchema.methods.toJSON = function(){
    const{__v, ...dotacion} = this.toObject();
    return dotacion;
}

module.exports = model('Dotacion', DotacionSchema);