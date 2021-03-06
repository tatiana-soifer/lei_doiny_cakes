//ESTILOS DEL NAVBAR
$(window).scroll(function() {
    if ($("#menu2").offset().top > 800) {
        $("#menu2").addClass('fondo_nav');
    } else {
        $("#menu2").removeClass('fondo_nav');
    }
});




//COMIENZA EL CARRITO DE COMPRAS

//VARIABLES GLOBALES PARA EL CARRITO
const boton_agregar = document.querySelectorAll('.boton');
const tbody = document.querySelector('.tbody');
let carrito = [];

//BOTON PARA AGREGAR PRODUCTOS AL CARRITO 
boton_agregar.forEach(btn => {
    btn.addEventListener('click', agregar_carrito);
});

//FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
function agregar_carrito(e) {
    const boton = e.target;
    const item = boton.closest('.card');
    const item_titulo = item.querySelector('.card-title').textContent;
    const item_precio = item.querySelector('.precio').textContent;
    const item_img = item.querySelector('.card-img-top').src;
    const item_nuevo = {
        nombre: item_titulo,
        precio: item_precio,
        foto: item_img,
        cantidad: 1,
    };
    agregar_nuevo_producto(item_nuevo);
};

//FUNCION PARA CREAR UN NUEVO PRODUCTO EN EL CARRITO
function agregar_nuevo_producto(item_nuevo){
    //ALERTA DE CONFIRMACION QUE SE AGREGO UN NUEVO PRODUCTO
    const alert = document.querySelector('.alert');
    setTimeout(function(){
        alert.classList.add('hide')
    }, 2000)
        alert.classList.remove('hide')
    //AGREGANDO NUEVO ELEMENTO AL CARRITO
    const input_elemento = tbody.getElementsByClassName('input_elemento')
    for (let i =0; i< carrito.length; i++){
        if (carrito[i].nombre.trim() === item_nuevo.nombre.trim()){
            carrito[i].cantidad ++;
            const valor = input_elemento[i]
            valor.value++;
            total_carrito()
            return null;
        };
    };
    carrito.push(item_nuevo);
    tabla_carrito();
};

//FUNCION PARA ACTUALIZAR EL CARRITO, DONDE SE VAN CREANDO LAS TORTAS QUE SE AGREGAN EN PRODUCTOS
function tabla_carrito(){
    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('item_carrito');
        const contenido = `
            <td class="tabla_productos">
                <img src=${item.foto} alt="..">
                <h5 class="tabla_titulo">${item.nombre}</h5>
            </td>
            <td class="tabla_precio"><p>${item.precio}</p></td>
            <td class="tabla_cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input_elemento">
                <button class="delete btn btn-danger boton_carrito_borrar">Cancelar</button>
            </td>
        `
        tr.innerHTML = contenido;
        tbody.append(tr);
        tr.querySelector(".delete").addEventListener('click', item_borrar_carrito);
        tr.querySelector(".input_elemento").addEventListener('change', suma_cantidad);
    });
    total_carrito();
};

//FUNCION TOTALES EN CARRITO
function total_carrito(){
    let total = 0;
    const item_total_carrito = document.querySelector('.item_total_carrito');
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''));
        total = total + precio*item.cantidad;
    })
    item_total_carrito.innerHTML = `Total $${total}`;
    addLocalStorage()
};

//FUNCION PARA SUMAR CANTIDADES EN CARRITO
function suma_cantidad(e){
    const suma_input  = e.target;
    const tr = suma_input.closest(".item_carrito");
    const titulo = tr.querySelector('.tabla_titulo').textContent;
    carrito.forEach(item => {
        if(item.nombre.trim() === titulo){
            suma_input.value < 1 ? (suma_input.value = 1): suma_input.value;
            item.cantidad = suma_input.value;
            total_carrito();
        };
    });
};

//FUNCION PARA BORRAR UN PRODUCTO COMPLETO EN CARRITO
function item_borrar_carrito(e){
    const boton_borrar = e.target;
    const tr = boton_borrar.closest(".item_carrito");
    const titulo = tr.querySelector('.tabla_titulo').textContent;
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].nombre.trim() === titulo.trim()){
        carrito.splice(i, 1);
        };
    };
    tr.remove();
    total_carrito();
};

//FUNCION LOCAL STORAGE PARA GUARDAR LOS PRODUCTOS SELECCIONADOS UNA VEZ QUE SE CIERRA EL NAVEGADOR
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
};
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        tabla_carrito()
    };
};

//ALERTA DE CONFIRMACION DE ENVIO PEDIDO FINAL
$('#btn_finalizar_compra').click(function(e){
    e.preventDefault();
    swal({
        title: '??Muchas gracias por confiar en nosotros!',
        text: 'Pronto nos estaremos comunicando con vos',
        icon: "success",
        button: false,
        timer: 5000,
    });
});




//MENU DE PRODUCTOS
$(document).ready(function(){
	$('.menu_listado .categoria_item[category="todos"]').addClass('item_active');
    $('.categoria_item').click(function(){
		let categoria_producto = $(this).attr('category');
		console.log(categoria_producto);
        $('.categoria_item').removeClass('item_active');
		$(this).addClass('item_active');
        $('.producto_item').css('transform', 'scale(0)');
		function ocultar_producto(){
			$('.producto_item').hide();
		}
        setTimeout(ocultar_producto, 400);
        function mostrar_producto(){
			$('.producto_item[category="'+categoria_producto+'"]').show();
			$('.producto_item[category="'+categoria_producto+'"]').css('transform', 'scale(1)');
		}
        setTimeout(mostrar_producto, 400);
	});
    $('.categoria_item[category="todos"]').click(function(){
		function mostrar_todo(){
			$('.producto_item').show();
			$('.producto_item').css('transform', 'scale(1)');
		} 
        setTimeout(mostrar_todo, 400);
	});
});




//FUNCION INFO DESCRIPCION DE TORTAS
$(function(){
    $('[data-toggle="popover"]').popover()
});




//PREGUNTAS FRECUENTES
$(document).ready(function(){
    $('.respuesta_A').prepend('<p>En el proceso de compra vas a poder indicarnos la fecha de tu env??o, cu??ndo quer??s que lo entreguemos o si vas a venir a retirarlo personalmente.</p>');
    $('.respuesta_A').hide();
    $('.pregunta_A').on('click', function(){
        $('.respuesta_A').toggle();    
    });
    $('.respuesta_B').prepend('<p>Todas las piezas de pasteler??a son super frescas y duran en las cajas que enviamos m??s heladera perfectamente una semana.</p>');
    $('.respuesta_B').hide();
    $('.pregunta_B').on('click', function(){
        $('.respuesta_B').toggle();
    });
    $('.respuesta_C').prepend('<p>Debes realizarlo con 48 hs de anticipaci??n como m??nimo.</p>');
    $('.respuesta_C').hide();
    $('.pregunta_C').on('click', function(){
        $('.respuesta_C').toggle();    
    });
    $('.respuesta_D').prepend('<p>En el proceso de compra, vas a poder indicarnos tu domicilio y ver el costo correspondiente del mismo. Ingresando en la secci??n "Delivery" podes fijarte si llegamos hasta tu domicilio.</p>');
    $('.respuesta_D').hide();
    $('.pregunta_D').on('click', function(){
        $('.respuesta_D').toggle();    
    });
    $('.respuesta_E').prepend('<p>No, todos los pedidos, ya sean para delivery o para Retirar por el mostrador dulce, se deben realizar m??nimo con 24hs de anticipaci??n.</p>');
    $('.respuesta_E').hide();
    $('.pregunta_E').on('click', function(){
        $('.respuesta_E').toggle();    
    });
    $('.respuesta_F').prepend('<p>Primero, ten??s que saber los d??as de entrega de tu zona y la franja horaria correspondiente a cada una. Luego, si quer??s recibir o enviar tu pedido al d??a siguiente deb??s realizar la compra antes de las 18hs del d??a anterior.</p>');
    $('.respuesta_F').hide();
    $('.pregunta_F').on('click', function(){
        $('.respuesta_F').toggle();    
    });
});




//FORMULARIO DE CONTACTO
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




//SUSCRIPCI??N AL NEWSLETTER
const suscripcion = document.querySelector('.suscripcion');
$(document).ready(function(){
    const APIURL = 'https://jsonplaceholder.typicode.com/posts';
    const suscripcion = {mail:"Mail enviado con exito"}
    $('.suscripcion').prepend(`<h4>Newsletter</h4>
                                <p>Dejanos tu mail y recib?? las novedades!</p>
                                <input type="text" placeholder="E-mail">
                                <img src="img/send.png" id="boton_suscripcion" alt="send" title="send">`);
    $("#boton_suscripcion").click(()=>{
        $.ajax({
            method: "POST",
            url: APIURL,
            data: suscripcion,
            success: function (respuesta){
                $('.suscripcion').prepend(`<div>${respuesta.mail}</div>`);
            }
        });
    });
});