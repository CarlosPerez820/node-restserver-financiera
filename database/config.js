const mongoose = require('mongoose');

const dbConnection= async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Conectado a la Base en linea")

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de conectarse a la BD');
    }
}

module.exports ={
    dbConnection
}