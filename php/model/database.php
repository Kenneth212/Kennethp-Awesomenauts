<?php
	//create a class called database
	//private 5 variables
	//Implementing openConnection Function
	//Implementing closeConnection Fucntion
class Database {
	private $connection;
	private $host;
	private $username;
	private $password;
	private $database;
	public $error;
	// the construct function purpose is create an object
	// the __construct is going to execute the information in the for variables.
	public function __construct($host, $username, $password, $database) {
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

		$this->connection = new mysqli($host, $username, $password);
	
		if ($this->connection->connect_error) {
			die("<p>Error: " . $this->connection->connect_error . "</p>");
	}
	$exists = $this->connection->select_db($database);
	
	if(!$exists) {
		// Why should I use classes rather than just a collection of functions? well because fucntions are part of classes so thats why using classes is better.
		// sends commands to the database
		$query = $this->connection->query("CREATE DATABASE $database");
		// checks if our query is successful
		 if($query) {
			echo "<p>Successfully created database: " . $database . "</p>";
		}
	}
	// 	shows that DATABASE exists 
	else {
		echo "<p>DATABASE already exists</p>";
	}
	}
	//Added a new mysqli object
	public function openConnection() {
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

		if ($this->connection->connect_error) {
			die("<p>Error: " . $this->connection->connect_error . "<p>");
		}
	}

	public function closeConnection() {
		if (isset($this->connection)) {
			$this->connection->close();
		}
	}

	public function query($string) {
		$this->openConnection();
 		//opened the Connection
		$query = $this->connection->query($string);

		if(!$query) {
			$this->error = $this->connection->error;	
		}
		//this will check if its false and if its false it will turn it to true
		$this->closeConnection();
		//closes the Connection
		return $query;
	}
	//The query Variable is going to execute a query variables
	//The database file is going to reuse the code so it can be used over and over agian 
	//Out putting echos
}