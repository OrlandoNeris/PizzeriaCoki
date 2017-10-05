
<?php  
session_start();
if (@!$_SESSION['usuario']) {
	 header("Location: index.php"); 
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Index 2 </title>
</head>
<body>
	<form action="php/Desconectar.php" method="POST">
	<div class="form-group">
				<button class="btn btn-lg btn-success btn-block" type="submit" id="Cierre" >Desloguear</button>
				
	</form>
</body>
</html>