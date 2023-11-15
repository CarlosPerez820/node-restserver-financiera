process.env.TZ = 'America/Mexico_City';

const cron = require('node-cron');
const Prestamo = require('../models/prestamo');
const Pago = require('../models/pago');
const Cliente = require('../models/cliente');

const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; 
const year = currentDate.getFullYear();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
const second = currentDate.getSeconds();
const milsecond = currentDate.getMilliseconds();

const formattedDate = `${day}/${month}/${year}`;
const formatHour = `${hour}:${minute}`;


const automa =()=> {
    cron.schedule('00 22 * * 1-5', async () => {

    console.log('Verificación diaria para Mora iniciada:'+formattedDate + '--'+formatHour);

    const query = {$and:[{estado: true},{ estatus: 'Activo'},{fechaPago: { $ne: formattedDate }}]};
    const prestamos = await Prestamo.find(query).exec();

    for (const prest of prestamos) {

      console.log(prest.nombre);
      console.log(prest.fechaPago);
      console.log("-------");

        const recargoPago = new Pago({
            fecha: formattedDate,
            folio: "MOR-"+year+month+day+minute+second+milsecond,
            nombreCliente: prest.nombre,
            numCliente: prest.numeroCliente,
            cobranza: prest.cobranza,
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
        prest.tipoUltiPago = "Mora";
        await prest.save();      


        const clienteEspecifico = await Cliente.find({numeroCliente: prest.numeroCliente}).exec();
        if (clienteEspecifico.length > 0) {
          // Verifica que se haya encontrado al menos un cliente
          const cliente = clienteEspecifico[0]; // El primer (y único) cliente en el array
        

          // Verificar si la cadena es un número usando isNaN()
          if (!isNaN(cliente.puntuacion)) {
            cliente.puntuacion =  parseInt(cliente.puntuacion)+1;
          } else {
            cliente.puntuacion = 1;
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
  cron.schedule('30 0 * * *', async () => {
//    console.log('Verificación diaria de Clasificacion:'+formattedDate)
console.log('Verificación diaria para Clasificacion iniciada:'+formattedDate + '--'+formatHour);

    const query = {$and:[{estado: true},{ prestamosActivos: true}]};
    const clients = await Cliente.find(query).exec();

    for (const clien of clients) {

      try {

        console.log(clien.nombre + "+"+clien.puntuacion+"+"+clien.clasificacion);
        console.log("-------");

      if(parseInt(clien.puntuacion)<30){
        clien.clasificacion="A";
        await clien.save();
      }
      if(parseInt(clien.puntuacion)>=30 && parseInt(clien.puntuacion)<60){
        clien.clasificacion="B";
        await clien.save();
      }
      if(parseInt(clien.puntuacion)>=60){
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
