const jwt = require('jsonwebtoken');

const generarJWT = (uid = '', sucursal ='' , usuario='', nombre='') =>{

    return new Promise((resolve, reject)=>{
        
        const payload = {uid, sucursal, usuario, nombre};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '7d'
        }, (err, token)=>{

            if(err){
                console.log(err);
                reject('No se pudo generar el WebToken')
            }else{
                resolve(token);
            }
        })
    })
}

module.exports={
    generarJWT
}