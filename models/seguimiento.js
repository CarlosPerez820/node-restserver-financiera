const {Schema, model} = require('mongoose');

const SeguimientoSchema = Schema({
    gestor: {
        type: String,
        required: [true, 'El gestor es obligatorio']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    hora: {
        type: String,
        required: [true, 'La hora es obligatoria']
    },
    latitud: {
        type: String,
        required: [true, 'La lalutud es obligatoria']
    },
    longitud: {
        type: String,
        required: [true, 'La longitud es obligatoria']
    },
    actividad: {
        type: String,
        required: [true, 'La actividad es obligatoria']
    },
    sucursal: {
        type: String,
        required: [true, 'La sucursal es obligatoria']
    }
});

SeguimientoSchema.methods.toJSON = function(){
    const{__v, ...seguimiento} = this.toObject();
    return seguimiento;
}

module.exports = model('Seguimiento', SeguimientoSchema);