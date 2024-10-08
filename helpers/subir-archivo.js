const path = require('path');

const subirArchivo = (files, carpeta='', subcarpeta='', nombre='')=>{

    return new Promise((resolve, reject) =>{
        const {archivo} = files;

        //Validar la extension .

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length-1];
        //Validacion
        const extensionesValidas = ['png','jpg','jpeg']

        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es valida, solo ${extensionesValidas}`);
        }

        const nombreTemp = nombre+'.'+extension;

        const uploadPath = path.join(__dirname, '../public/uploads/', carpeta, subcarpeta, nombreTemp);
    
        const rutaImagen = path.join('uploads/', carpeta, subcarpeta, nombreTemp);

        archivo.mv(uploadPath, function(err) {
            if (err) {
            reject(err);
        }
    
        resolve(rutaImagen);
        });    
    });
}

module.exports = {
    subirArchivo
}