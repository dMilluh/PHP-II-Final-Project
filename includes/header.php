<?php

$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "student_data";

try {
    $conn = new PDO("mysql:host=$hostname;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}

catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student Data</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Student Data</title>
    <link rel="stylesheet"     href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-route.js"></script>
    <script src="app.js"></script>
</head>
<body>

<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Student Data</a>
        </div>
        <div>
            <ul class="nav navbar-nav">
                <li><a href="#all_students">Home</a></li>
                <li><a href="#gpa">Display GPA</a></li>
                <li><a href="#add_student">Add Student</a></li>
                <li><a href="#edit_student">Edit Student</a></li>
            </ul>
        </div>
    </div>
</nav>
