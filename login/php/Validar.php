<?php 
session_start();

include('conexion.php');

$username = $_POST['usuario'];
$contra = $_POST['pass'];

$sql2=mysql_query("SELECT * FROM usuario WHERE Usuario='$username' ");
if($f2=mysql_fetch_array($sql2)){
	if($contra==$f2['Contrasena']){
		$_SESSION['id']=$f2['Id'];
		$_SESSION['usuario']=$f2['Usuario'];
		echo '<script>alert("WELCOME")</script>';
		echo "<script>location.href='../AdminLTE/empty.html'</script>";

	}else{
		echo '<script>alert("Contrasena Incorrecta!!")</script>';
		echo "<script>location.href='../index.php'</script>";
	}
}else{
		echo '<script>alert("Usuario Incorrecto!!")</script>';
		
	}






 ?>