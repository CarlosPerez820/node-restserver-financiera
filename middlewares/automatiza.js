process.env.TZ = 'America/Mexico_City';

//Importaciones
const cron = require('node-cron');
const Prestamo = require('../models/prestamo');
const Pago = require('../models/pago');
const Cliente = require('../models/cliente');

//Se declaran las variables globales para crear el formato de fecha
let day;
let month; 
let year;
let hour;
let minute;
let formattedDate;
let formatHour;

//Funcion de flecha para obtener la fecha y la hora actual
const obtencionFecha = () =>{
  let currentDate = new Date();
  day = currentDate.getDate();
  month = currentDate.getMonth() + 1; 
  year = currentDate.getFullYear();
  hour = currentDate.getHours();
  minute = currentDate.getMinutes();
  formattedDate = `${day}-${month}-${year}`;
  formatHour = `${hour}:${minute}`;
}

//Funcion para calcular la fecha correspondiente al proximo pago
const calcularProximoPago=()=>{
  //Se optiene la fecha actual
  const ultimaFechaPago = new Date(); ;
  const proximoPago = new Date(ultimaFechaPago);
  //Se optiene la nueva fecha aumentando 7 dias
  proximoPago.setDate(ultimaFechaPago.getDate() + 7);

  const dia = proximoPago.getDate();
  const mes = proximoPago.getMonth() + 1;
  const anio = proximoPago.getFullYear();
  const fechaFormateada = `${dia}-${mes}-${anio}`;
  return fechaFormateada;
}

//Funcion de automatizar la asignacion de las moras y la edicion del prestamo   
const automa =()=> {
    cron.schedule('0 22 * * 1-5', async () => {
    
    console.log("Asignacion de moras");
    obtencionFecha();

    //Obtenemos la lista de los prestamos que no se han registrados en el dia actual
    const query = {$and:[{estado: true},{ estatus: 'Activo'},{fechaPago: { $ne: formattedDate }}]};
    const prestamos = await Prestamo.find(query).exec();

    let varDatosFolio;

    for (const prest of prestamos) {
      //Se filtran por una condicion los prestamos semanales 
      if(prest.tipoPrestamo=='Diario' || (prest.tipoPrestamo=='Semanal' && prest.fechaPago!=prest.proximoPago && prest.proximoPago==formattedDate))
      {
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
            //Se registra la mora
          await recargoPago.save();    

        try {
          prest.fechaPago = formattedDate;
          prest.totalRestante = prest.totalRestante+prest.cobranza;
          prest.tipoUltiPago = "Mora";
          await prest.save();      
          //Se actualiza la informacion del prestamo

          //Se optienen los clientes
          const clienteEspecifico = await Cliente.find({numeroCliente: prest.numeroCliente}).exec();
          if (clienteEspecifico.length > 0) {
            const cliente = clienteEspecifico[0]; 
          
            //Se actualiza la informacion del cliente
            if (!isNaN(cliente.puntuacion)) {
              cliente.puntuacion =  parseInt(cliente.puntuacion)+1;
            } else {
              cliente.puntuacion = 1;
            }
            await cliente.save();
          }else{
            //console.log("No hay cliente");
          }
          } catch (error) {
            console.error('Error en la actualización del prestamo (Mora):', error);
          } 
        } 
      }
    });
}

//Funcion correspondiente al cambio de fecha proxima para los prestamos semanales
const cambioSiguienteFecha=()=>{
  cron.schedule('17 22 * * 1-5', async () => {
    obtencionFecha();
    console.log("Cambios de fecha");
    const query = {$and:[{estado: true},{ estatus: 'Activo'},{ tipoPrestamo: 'Semanal'}, { proximoPago: formattedDate}]};
    const prestamos = await Prestamo.find(query).exec();

    for (const prest of prestamos) {
      if(prest.tipoPrestamo=='Semanal' && prest.proximoPago==formattedDate){
        prest.proximoPago=calcularProximoPago();
        await prest.save();      
        console.log("Tacos !!!!!!!!!!!!!!!!111 Actualizo fecha");
      }
    }
  });
}

//Funcion correspondiente a la asignacion de clasificacion
const automatizaClasificacion =()=> {
  cron.schedule('30 0 * * *', async () => {

    const query = {$and:[{estado: true},{ prestamosActivos: true}]};
    const clients = await Cliente.find(query).exec();

    for (const clien of clients) {

      try {
        console.log("------- Clasificaciones");
        console.log(clien.nombre + "+"+clien.puntuacion+"+"+clien.clasificacion);

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
    automatizaClasificacion,
    cambioSiguienteFecha,
}
