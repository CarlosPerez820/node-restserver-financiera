const {Schema, model} = require('mongoose');

const solicitudSchema = Schema({

    fechaSolicitud:{
        type: String,
        required:[true, 'La fecha de la solicitud es obligatorio']
    },
    montoSolicitado:{
        type: Number,
        required:[true, 'El monto solicitado es obligatorio']
    },
    montoAutorizado:{
        type: Number,
        required:[true, 'El monto autorizado es obligatorio']
    },
    totalPagar:{
        type: Number,
        required:[true, 'El total a pagar es obligatorio']
    },
    pagoDiario:{
        type: Number,
        required:[true, 'El pago diario es obligatorio']
    },
    plazo:{
        type: String,
        required:[true, 'El plazo es obligatorio']
    },
    numeroCliente: {
        type: String,
        required: [true, 'El numero de cliente es obligatorio'],
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
        type: String
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
        type: String,
        required: [true, 'El tiempo casados es obligatorio']
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
    infoCredito:{
        type: String,
        required: [true, 'La informacion del credito es es obligatorio']
    },
    estatus:{
        type: String,
        required: [true, 'El estatus es obligatorio']
    },
    tipo:{
        type: String,
        require: [true, 'El tipo (nuevo/renovacion)  es obligatorio']
    },
    tipoPrestamo:{
        type: String,
        require: [true, 'El tipo de prestamo (diario/semanal)  es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    sucursal:{
        type: String,
        required: [true, 'La sucursal es obligatoria']
    }

});

solicitudSchema.methods.toJSON = function(){
    const{__v, ...solicitud} = this.toObject();
    return solicitud;
}

module.exports = model('Solicitud', solicitudSchema);
