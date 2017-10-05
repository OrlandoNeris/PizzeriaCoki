var num = 0;


function buscar(){

	var Buscar=$('#Buscar').val();

	$.ajax({
		type: "POST",
		url: 'php/cl_abm.php',
		data: 'Buscar='+Buscar+'&boton=buscar'
	}).done(function(data){
		if(data){
			data_busqueda = eval(data);
			$("#busqueda [name='idprod']").val(data_busqueda[0].id);
			$("#busqueda [name='nombreproducto']").val(data_busqueda[0].ProdNombre);
		}else {
			alert("No Disponible");
		}

	});
}


function confirmar()
{

		var Usuario=$('#Usuario').val();
		var Contrasena=$('#Contrasena').val();

		$.ajax({
			type: "POST",
			dataType: 'json',
			url: "php/cl_abm.php",
			data: 'Usuario='+Usuario+'&Contrasena='+Contrasena+"&boton=ingresar"
		}).done(function(resp){
			if(resp){
				location.href='main.php';
			}else {
				alert('Usuario o Contraseña incrorrecto');
			}
		});
}

function cerrar()
{
	$.ajax({
			url:'php/cl_abm.php',
			type:'POST',
			data:"boton=cerrar"
		}).done(function(resp){
			window.location.href = "index.php";
		});
}

function limpiar()
{
	$("#formulario [type='text']").val("")//limpiar formulario (todos los  type="text")
	$("#formulario select").val(0)//loimpiar select de los formulario

}

function test(){
	var data_form = $("#productos").serialize();
	var id_prod = $("#id_producto0");
	$.ajax({
		url:'php/cl_abm.php',
		type:'POST',
		data: 'id_prod='+id_prod+"&boton=test"
	}).done(function(resp){

			alert(resp);
	});
}


function factura_venta()
{
	var id_prod= $('#id_prod').val();
	var Cantidad = $('#Cantidad').val();
	var fecha = $('#fecha').val();
	var cliente = $('#cliente').val();
	var dir = $('#dir').val();
	var formapago = $('#formapago').val();
	var tipo_factura = $('#tipo_factura').val();
	var Descuento = $('#Descuento').val();
	//var data_form = $("#productos").serialize();

	$.ajax({
		url:'php/cl_abm.php',
		type:'POST',
		data: 'data_form='+data_form+'&Descuento='+Descuento+'&id_prod='+id_prod+'&Cantidad='+Cantidad+'&fecha='+fecha+'&cliente='+cliente+'&dir='+dir+'&formapago='+formapago+'&tipo_factura='+tipo_factura+"&boton=factura"
	}).done(function(resp){
		if(resp == 9){
			NumeroFactura= 0;
		}else {
			alert(resp);
		}
	});
}

function validar()
{

	var id_prod= $('#id_prod').val();
	var Cantidad = $('#Cantidad').val();

	$.ajax({
		url:'php/cl_abm.php',
		type:'POST',
		data: 'Cantidad='+Cantidad+'&id_prod='+id_prod+"&boton=validar"
	}).done(function(resp){
		if(resp == 1){
			agregar(id_prod, Cantidad);

		}else {
			alert(resp);
		}
	});
}


function agregar(id_prod, Cantidad)
{

		$.ajax({
			url:'php/cl_abm.php',
			type:'POST',
			data: 'Cantidad='+Cantidad+'&id_prod='+id_prod+"&boton=agregar"
		}).done(function(resp){
				alert("OK");
				var listado = "";
				data = eval(resp);
				var  id_fila = "num"+num;
				listado += '<tr id="'+id_fila+'">'
				listado += '<td  id="id_producto'+num+'" style="width:30%">'+data[0]["Id"]+'</td>'
				listado += '<td  style="width:50%">'+data[0]["NombreProducto"]+'</td>'
				listado += '<td id="Cantidad'+num+'" ><input style="width:30%" type="text" value="'+Cantidad+'"></td>'
				listado += '<td><input type="button" value="Eliminar" onclick="$('+id_fila+').remove();" /></td>'
				listado += '</tr>'
				$('#productos').append(listado);
				//$("#productos").html(listado);
				alert(num);
				num +=1;
		});
}

function mostrar_factura()
{
	//location.href='factura_ya.php';
	alert(NumeroFactura[0]);
	var num = NumeroFactura[0];
	alert(num);
	$.ajax({
		url:'php/cl_abm.php',
		type:'POST',
		data: 'num='+num+"&boton=factura_ya"
	}).done(function(resp){
		data = eval(resp);
		var listado = "";
		listado += '<tr>'
		listado += '<td  style="width:50%" valign="top">EMPRESA: '
		listado += '<br>'
		listado += '<p align="center"> Pizeria Lo Vago SA</p>'
		listado += '</td>'
		listado += '<td style="width:50%">TIPO FACTURA: '+data[0].tipo+' <br>'
		listado += 'NUMERO: '+data[0].numero+' <br> FECHA: '+data[0].fecha+' <br> CUIT: MICUIT  <br>'
		listado += '</td>'
		listado += '</tr>'
		$("#numero1").html( listado );
		var listado = "";
		listado += '<br>NOMBRE CLIENTE: '+data[0].nombre_persona+'  </b>'
		listado += '<br>domicilio: '+data[0].direccion+'  '
		listado += '<br>LUGAR de EMISION: '+data[0].direccion_emision+' '
		$("#numero2").html(listado);
		var listado = "";
		listado += '<br>'
		listado += 'CUIT/CUIL: <br> '+data[0].cuit+' '
		$("#numero3").html(listado);
		var listado = "";
		listado += '<br>'
		listado += 'Forma de pago: <br> '+data[0].forma_pago+' '
		$("#numero4").html(listado);
	});
	$.ajax({
	type: "POST",
	url: 'php/cl_abm.php',
	data: 'num='+num+"&boton=detalle_factura"
	}).done(function(resp){
		datos = eval(resp);
		var subtotal = 0;
		var listado = "";
		alert(datos[0]["Precio"]);
		for(var i=0;i<datos.length;i++){
			var bgcolor = (i%2==0) ? "#FFFFFF":"#EDEDED";
			listado += '	<tr bgcolor="'+bgcolor+'">'
			listado += ' 		<td style="width:50%">'+datos[i]["NombreProducto"]+'</td>'
			listado += ' 		<td style="width:20%">'+datos[i]["Cantidad"]+'</td>'
			listado += ' 		<td style="width:20%">$'+datos[i]["Precio"]+'</td>'
			listado += ' 		<td style="width:10%">$'+datos[i]["Precio"]*datos[i]["Cantidad"]+'</td>'
			listado += '	</tr>'
			subtotal += datos[i]["Precio"]*datos[i]["Cantidad"];
		}
		$("#numero5").html(listado);
		iva = subtotal*(datos[0]["Iva"]);
		total = (iva + subtotal)-(datos[0]["Descuento"]);
		var lista = "";
		lista += ' $'+subtotal.toFixed(2)+''
		lista += ' <br> $'+datos[0]["Descuento"]+' '
		lista += '<br> $'+iva.toFixed(2)+''
		$("#numero6").html(lista);

		var lista = "";
		lista += 'TOTAL'
		lista += '<br>'
		lista += '<p align="center"> $'+total.toFixed(2)+'</p>'
		$("#numero7").html(lista);

	});
}
