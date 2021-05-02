//Formulario de Contacto
let timeout = null;
document.querySelectorAll('.form-group').forEach((box) => {
    const box_input = box.querySelector('input');
    box_input.addEventListener('keydown', (event) => {
        clearTimeout (timeout);
        timeout = setTimeout (() => {
            console.log(`${box_input.name}`, box_input.value);
        }, 300);
    });
});

//ALERTA DE CONFIRMACION DE ENVIO FORMULARIO
$('#btn_enviar').click(function(e){
    e.preventDefault();
    swal({
        title: 'Formulario Eviado', 
        icon: "success",
        button: false,
        timer: 5000,
        });
});
