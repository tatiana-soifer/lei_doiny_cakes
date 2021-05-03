//SUSCRIPCIÓN AL NEWSLETTER
const suscripcion = document.querySelector('.suscripcion');
$(document).ready(function(){
    const APIURL = 'https://jsonplaceholder.typicode.com/posts';
    const suscripcion = {mail:"leidoinycakes@gmail.com"}
    $('.suscripcion').prepend(`<div class="suscripcion">
                                <h4>Newsletter</h4>
                                <h5>Dejanos tu mail y recibí las novedades!</h5>
                                <input type="text" placeholder="E-mail">
                                <button id="boton_suscripcion">
                                    <img src="img/send.png" alt="send" title="send">
                                </button>
                            </div>`);
    $("#boton_suscripcion").click(()=>{
        $.ajax({
            method: "POST",
            url: APIURL,
            data: suscripcion,
            success: function (respuesta){
                $('.suscripcion').prepend(`<div>${respuesta}</div>`);
            }
        });
    });
});
