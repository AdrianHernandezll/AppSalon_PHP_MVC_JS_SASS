let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  nombre: '',
  fecha: '',
  hora: '',
  servicios: []
}

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); //Muestra y oculta secciones
  tabs(); //Cambia la seccion cuando presionen tabs
  botonesPaginador(); // Agrega o quita los botones del paginador
  paginaSiguiente();
  paginaAnterior();

  consultarAPI(); // Consultar API Al backend PHP

  nombreCliente(); //Agrega el no,bre de cliente al objeto de cita
  sellecionarFecha(); // Agrega la fecha de la cita del objeto
  seleccionarHora(); // Agrega la hora del objeto
  mostrarResumen(); //Muestra el objeto lleno
}

function mostrarSeccion() {
  //Ocultar las demas secciones

  const seccionAnterior = document.querySelector(".mostrar");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }

  //Sellecionar la seccion con el paso..
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("mostrar");

  //Quita la clase de actual al tab anterior
  const tabAnterior = document.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  //Resaltar tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function tabs() {
  const botones = document.querySelectorAll(".tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      paso = parseInt(e.target.dataset.paso);

      mostrarSeccion();
      botonesPaginador();

      
    });
  });
}

function botonesPaginador(){
     const paginaAnterior = document.querySelector('#anterior');
     const paginaSiguiente = document.querySelector('#siguiente');

     if(paso === 1){
          paginaAnterior.classList.add("ocultar");
          paginaSiguiente.classList.remove("ocultar");
     }else if(paso === 3){
          paginaAnterior.classList.remove("ocultar");
          paginaSiguiente.classList.add("ocultar");

          mostrarResumen();
     }else{
          paginaAnterior.classList.remove("ocultar");
          paginaSiguiente.classList.remove("ocultar");
     }

     mostrarSeccion();


}
function paginaAnterior(){
     const paginaAnterior = document.querySelector('#anterior');
     paginaAnterior.addEventListener('click', function(){
          if(paso <= pasoInicial) return;

          paso--;

          botonesPaginador();

     })
}

function paginaSiguiente(){

    const paginaSiguiente = document.querySelector('#siguiente');
     paginaSiguiente.addEventListener('click', function(){
          if(paso >= pasoFinal) return;

          paso++;

         botonesPaginador();
     })

}

async function consultarAPI(){

  try {
      const url = 'http://localhost:3000/api/servicios';
      const resultado = await fetch(url);
      const servicios = await resultado.json();
      mostrarServicios(servicios);
      
    } catch (error) {
    console.log(error);
  }

}

function mostrarServicios(servicios){

      servicios.forEach(servicio => {
        const {id,nombre,precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;


        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
          seleccionarServicio(servicio);
        }

        //Agregamos al div los demas items
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        //Inyectamos archivos al ID servicios
        document.querySelector('#servicios').appendChild(servicioDiv);


      })
}

function seleccionarServicio(servicio){
  const {id} = servicio;
  const {servicios} = cita;

  //Identifica al elemento que le das click en div
  const idServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  if( servicios.some( agregado => agregado.id === id)){
       //Eliminar el servicio
      cita.servicios = servicios.filter( agregado => agregado.id !== id);
      idServicio.classList.remove('seleccionado');
  } else{
    cita.servicios = [...servicios, servicio];
    idServicio.classList.add('seleccionado');
  }

  

}

function nombreCliente(){

    cita.nombre = document.querySelector('#nombre').value;

}

function sellecionarFecha(){

  const inputFecha = document.querySelector('#fecha');

  inputFecha.addEventListener('input', function(e){

    const dia = new Date(e.target.value).getUTCDay();
    
    if([6,0].includes(dia)){
      e.target.value = '';
      mostrarAlerta('Fines de semana no permitidos','error', '.formulario');
    }else{
      cita.fecha = e.target.value;
    }
  })
}

function seleccionarHora(){

  const inputHora = document.querySelector('#hora');
  inputHora.addEventListener('input', function(e){


    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];

    if(hora < 10 || hora > 18){
          e.target.value = '';
          mostrarAlerta('Hora Invalida', 'error', '.formulario')
    }else{
      cita.hora = e.target.value;

    }

  })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
  //Previene clonacion de alerta
  const alertaPrevia = document.querySelector('.alerta');
  if(alertaPrevia){
    alertaPrevia.remove();
  }

  const alerta = document.createElement('DIV');
  alerta.textContent = mensaje;
  alerta.classList.add('alerta');
  alerta.classList.add(tipo);

  const referencia = document.querySelector(elemento);
  referencia.appendChild(alerta);

  if(desaparece){
    //Eliminar Alerta
    setTimeout(() =>{
      alerta.remove();
    }, 3000)
  }

}

function mostrarResumen(){

    const resumen = document.querySelector('.contenido-resumen');

    

    //Limpiar el contenido Reusmen

    while(resumen.firstChild){
      resumen.removeChild(resumen.firstChild);
    }

    if(Object.values(cita).includes("") || cita.servicios.length === 0){

      mostrarAlerta('Faltan datos de Servicios, Fecha u Hora','error','.contenido-resumen', desaparece = false);

      return;
    }

    //Formatear el DIV de resumen

    const {nombre,fecha,hora,servicios} = cita;

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fecha}`

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`

    servicios.forEach(servicio => {
      const  {id,precio,nombre} = servicio;
      const contenedorServicio = document.createElement('DIV');
      contenedorServicio.classList.add('contenedor-servicio');

      const textoServicio = document.createElement('P');
      textoServicio.textContent = nombre;

      const precioServicio = document.createElement('P');
      precioServicio.innerHTML = `<span>Precio:</span> $${precio}`

      contenedorServicio.appendChild(textoServicio)
      contenedorServicio.appendChild(precioServicio)

      resumen.appendChild(contenedorServicio)

      
    })


    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
   


}

