const {Schema, model} = require('mongoose');

const GestorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    usuario: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    sucursal: {
        type: String,
        required: [true, 'La Sucursal es obligatoria']
    },
    efectivo: {
        type: Number,
        default:0
    },
    desembolso: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }
});

GestorSchema.methods.toJSON = function(){
    const{__v, ...gestor} = this.toObject();
    return gestor;
}

module.exports = model('Gestor', GestorSchema);