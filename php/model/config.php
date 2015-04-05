<?php
	require_once(__DIR__ . "/Database.php");
	require_once(__DIR__ . "/date.php");
	session_start();
	session_regenerate_id(true);

	$path = "/Kennethnauts/php/";

	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";

	if(!isset($_SESSION["connection"])) {
		$connection = new Database($host, $username, $password, $database);
		$_SESSION["connection"] = $connection;
	}
