//========JQUERY==========//

$('.core').hide()
$('.core').fadeIn(2000)


$('#inicio').append(`
    <h1>
        "Proyecto Final de JavaScript"
    </h1>
`)

$('#titulo h2').hide()
$('#titulo h2').slideDown(1500)

$('#tituloMV').append(`
    <h2>
        Lo Mas Vendido
    </h2>
`)

$('#inicio h1').css('color', '#1b80a1')

$('#titulo').css('color', '#1b80a1')

$('#tituloMV').css('color', '#BA2100')




let prodcutosMV = [
    {
        id: 31,
        nombre: "Pc 1",
        procesador: "i3",
        memoria: "4gb",
        disco: "240gb",
        precio: 80000,
        precioLista: 81000,
        img: "../img/pcc.png"
    },
    {
        id: 32,
        nombre: "Laptop 1",
        procesador: "i3",
        memoria: "4gb",
        disco: "240gb",
        precio: 80000,
        precioLista: 81000,
        img: "../img/notebookc.png"
    },
    {
        id: 33,
        nombre: "Tablet 3",
        display: "8.0",
        memoria: "12gb",
        disco: "128gb",
        precio: 99000,
        precioLista: 110000,
        img: "../img/tabletc.jpg"
    },
]

for (const prod of prodcutosMV) {
    $('#masVendidos').append (`
    <div class="productosMasVendidos">
    <img src=${prod.img} alt="">
    <h3>${prod.nombre}</h3>
    <p class="precioProducto2">Precio: $${prod.precio}</p>
    </div>
    `)
}


//=========BOTON ARRIBA=========//


$(document).ready(function(){

	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});

});

