const cron = require('node-cron');
const Prestamo = require('../models/prestamo');
const Pago = require('../models/pago');
const Cliente = require('../models/cliente');

const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1.
const year = currentDate.getFullYear();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
const second = currentDate.getSeconds();

const formattedDate = `${day}/${month}/${year}`;
const formatHour = `${hour}:${minute}`;


const automa =()=> {
    cron.schedule('00 22 * * *', async () => {

    console.log('Verificación diaria iniciada:'+formattedDate);

    const query = {$and:[{estado: true},{ estatus: 'Activo'},{fechaPago: { $ne: formattedDate }}]};
    const prestamos = await Prestamo.find(query).exec();

    for (const prest of prestamos) {

        const recargoPago = new Pago({
            fecha: formattedDate,
            folio: "MOR-"+year+month+day+minute+second,
            nombreCliente: prest.nombre,
            numCliente: prest.numeroCliente,
            cobranza: 0,
            cantidadPrestamo:prest.cantidadPrestamo,
            plazo:prest.plazoPrestamo,
            totalPagar:prest.cantidadPagar,
            totalRestante:prest.totalRestante+prest.cobranza,
            pagoDiario:prest.pagoDiario,
            folioPrestamo:prest.folio,
            fechaPago:formattedDate,
            horaPago:formatHour,
            gestor:prest.gestor,
            tipo:"Mora",
            abono: prest.cobranza,
            personasCobrador:"Sistema",
            sucursal:prest.sucursal,

          });

        await recargoPago.save();    

       try {
        prest.fechaPago = formattedDate;
        prest.totalRestante = prest.totalRestante+prest.cobranza;
        await prest.save();      


        const clienteEspecifico = await Cliente.find({numeroCliente: prest.numeroCliente}).exec();
        if (clienteEspecifico.length > 0) {
          // Verifica que se haya encontrado al menos un cliente
          const cliente = clienteEspecifico[0]; // El primer (y único) cliente en el array
        

          // Verificar si la cadena es un número usando isNaN()
          if (!isNaN(cliente.tipo)) {
            cliente.tipo =  parseInt(cliente.tipo)+1;
          } else {
            cliente.tipo = 1;
          }
          // Guarda el cambio en la base de datos
          await cliente.save();
        }else{
          //console.log("No hay cliente");
        }
        
        } catch (error) {
          console.error('Error en la actualización:', error);
        }
      }

    });
}

const automatizaClasificacion =()=> {
  cron.schedule('00 00 * * *', async () => {
//    console.log('Verificación diaria de Clasificacion:'+formattedDate)

    const query = {$and:[{estado: true},{ prestamosActivos: true}]};
    const clients = await Cliente.find(query).exec();

    for (const clien of clients) {

      try {

      if(parseInt(clien.tipo)<8){
        clien.clasificacion="A";
        await clien.save();
      }
      if(parseInt(clien.tipo)>=8 && parseInt(clien.tipo)<15){
        clien.clasificacion="B";
        await clien.save();
      }
      if(parseInt(clien.tipo)>=15){
        clien.clasificacion="C";
        await clien.save();
      }
    } catch (error) {
      console.error('Error en la clasificacion:', error);
    }
      // await clien.save;
    }

  });
}

module.exports ={
    automa,
    automatizaClasificacion
}
