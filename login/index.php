<?php
session_start();
?>

<html>
<head>
	<title>Login</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/stylos.css">
</head>
<body>
	
	<div class="container well" id="cont">
	<div class="row">
		<div class="col-xs-4 col-xs-offset-4">
			<img src="imagenes/avatar.png" class="img-responsive" id="avatar">
		</div>
	<div/>
	<form action = "php/Validar.php"  class="login" method="POST">
			<div class="form-group">
				<h1>Iniciar Sesion</h1>
				<input class="form-control" type="Usuario" name="usuario" placeholder="Usuario" required>
			</div>
			<div class="form-group">
				<input class="form-control " type="password" name="pass" placeholder="Pass" required>
			</div>
			<div class="form-group">
				<button class="btn btn-lg btn-success btn-block" type="submit" id="inicio" >Loguear</button>
			</div>
	</form>
	
	<script src="js/jquery.js"></script>
	<script src="js/bootstrap.min.js"></script>
</body>
</html>

