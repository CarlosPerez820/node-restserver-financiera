const dbalidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');

module.exports={
    ...dbalidators,
    ...generarJWT,
    ...subirArchivo
}