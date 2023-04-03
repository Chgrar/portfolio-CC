// Validación del formulario
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#form").addEventListener('submit', validarFormulario); 
});


function validarFormulario(evento) {
    evento.preventDefault();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let message = document.querySelector('#message').value;

    if(name.length < 2) {
      alert('El nombre debe contener al menos 3 carácteres.');
      return;
    }
    if (!(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email))){
        alert('Debe ingresar un E-mail válido.');
        return;
    }
    if (message.length < 6) {
      alert('El mensaje debe contener al menos 6 carácteres para que podamos entenderlo.');
      return;
    }
    alert('Formulario enviado exitosamente.')
    this.submit();
};

function onStart(){     
    getClima();
};

// API REST del clima
async function getClima(){
    let api_url = "http://api.weatherstack.com/current?";       // Estado actual
    api_url += "access_key=bd2a60e7b3b796c0734c62e26fb16d9e";   // Access Key
    api_url += "&query=Buenos Aires&units=m";                   // Ubicación y unidad
    const response = await fetch(api_url);
    //console.log(response);    // Okey
    const data = await response.json();
    
    document.querySelector("#temp").innerHTML=`La temperatura actual es de: <i>${data.current.temperature} ºC</i>`
    document.querySelector("#windspeed").innerHTML=`La velocidad del viento es de: <i>${data.current.wind_speed} km/h</i>`
    if((data.current.temperature>16 && data.current.temperature<25) && data.current.wind_speed<10)
        document.querySelector("#advice").innerHTML=`<b>Te recomiendo salir sin abrigo</b>`
    else
        document.querySelector("#advice").innerHTML=`<b>Te recomiendo salir con abrigo</b>`
};
