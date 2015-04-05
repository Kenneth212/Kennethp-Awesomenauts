<?php
	require_once(__DIR__ . "/../model/config.php");

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

	$salt = "$5$" . "rounds= 5000$" . uniqid(mt_rand(), true) . "$";

	$hashedPassword = crypt($password, $salt);
	//the echo will show us whats being stored in the variable

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
	 	. "email = '$email',"
	 	. "username = '$username',"
	 	. "password = '$hashedPassword',"
	 	. "salt = '$salt', "
	 	. "exp = 0,"
	 	. "exp1 = 0,"
	 	. "exp2 = 0,"
	 	. "exp3 = 0,"
	 	. "exp4 = 0");
	//There is no comma after the last 0 because the code will break if there is a 0.
	//Need this for Ajax on Index.php
	$_SESSION["name"] = $username;

	if ($query) {

		echo "true";
	}
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
