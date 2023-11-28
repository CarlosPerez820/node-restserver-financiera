process.env.TZ = 'America/Mexico_City';

const cron = require('node-cron');
const Prestamo = require('../models/prestamo');
const Pago = require('../models/pago');
const Cliente = require('../models/cliente');

let day;
let month; 
let year;
let hour;
let minute;
let formattedDate;
let formatHour;

const obtencionFecha = () =>{
  
  let currentDate = new Date();
  day = currentDate.getDate();
  month = currentDate.getMonth() + 1; 
  year = currentDate.getFullYear();
  hour = currentDate.getHours();
  minute = currentDate.getMinutes();
  formattedDate = `${day}/${month}/${year}`;
  formatHour = `${hour}:${minute}`;
}


const automa =()=> {
    cron.schedule('0 22 * * 1-5', async () => {

    obtencionFecha();

    console.log('Verificación diaria para Mora iniciada:'+formattedDate + '--'+formatHour);
    console.log("Hora Real: "+new Date());

    const query = {$and:[{estado: true},{ estatus: 'Activo'},{fechaPago: { $ne: formattedDate }}]};
    const prestamos = await Prestamo.find(query).exec();

    let varDatosFolio;

    for (const prest of prestamos) {

      console.log(prest.nombre);
      console.log(prest.fechaPago);
      console.log("-------");

      varDatosFolio = new Date();

        const recargoPago = new Pago({
            fecha: formattedDate,
            folio: "MOR-"+year+month+day+minute+varDatosFolio.getSeconds()+varDatosFolio.getMilliseconds(),
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
          console.error('Error en la actualización del prestamo (Mora):', error);
        }
      }

    });
}

const automatizaClasificacion =()=> {
  cron.schedule('30 0 * * *', async () => {

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

      console.log('Verificación diaria para Clasificacion Correcta:');

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
