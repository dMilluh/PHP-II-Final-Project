<?php
$dsn = "mysql:dbname=student_data; charset=utf8";
$username = "root";
$password = "";

try {
    $conn = new PDO( $dsn, $username, $password );
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}
catch ( PDOException $e ) {
    echo "Connection failed: " . $e->getMessage();
}

    function returnStudents() {
        global $conn;

        $sql = "SELECT s.student_id, s.first_name, s.last_name, s.hrs_completed, s.hrs_attempted, s.gpa_points, s.major, s.advisor_id, s.email, a.name, ROUND(s.gpa_points/s.hrs_attempted, 1) as gpa, a.email as advisor_email FROM students as s, advisors as a WHERE s.advisor_id=a.advisor_id";
        $rows = $conn->query( $sql );

        $all_students = $rows->fetchAll(PDO::FETCH_ASSOC);

        $output = json_encode($all_students);
        echo $output;
}

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        if(isset($_GET['sql']) && $_GET['sql']=='insert') {
            $id = $_GET['student_id'];
            $fn = $_GET['first_name'];
            $ln = $_GET['last_name'];
            $co = $_GET['hrs_completed'];
            $at = $_GET['hrs_attempted'];
            $po = $_GET['gpa_points'];
            $ma = $_GET['major'];
            $ad = $_GET['advisor_id'];
            $em = $_GET['email'];

            $sql = "INSERT INTO students VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $st = $conn->prepare($sql);
            $st->execute(array($id, $fn, $ln, $co, $at, $po, $ma, $ad, $em));

        }
        elseif(isset($_GET['sql']) && $_GET['sql']=='update') {
            $id = $_GET['student_id'];
            $fn = $_GET['first_name'];
            $ln = $_GET['last_name'];
            $co = $_GET['hrs_completed'];
            $at = $_GET['hrs_attempted'];
            $po = $_GET['gpa_points'];
            $ma = $_GET['major'];
            $ad = $_GET['advisor_id'];
            $em = $_GET['email'];

            $sql = "UPDATE students SET student_id = ?, first_name = ?, last_name = ?, hrs_completed = ?, hrs_attempted = ?, gpa_points = ?, major = ?, advisor_id = ?, email = ? WHERE student_id = $id";
            $st = $conn->prepare($sql);
            $st->execute(array($id, $fn, $ln, $co, $at, $po, $ma, $ad, $em));

            returnStudents();
        }
        elseif(isset($_GET['sql']) && $_GET['sql']=='delete') {
            $student_id = $_GET['student_id'];

            $sql = "DELETE FROM students WHERE student_id = $student_id";
            $r = $conn->exec( $sql );

            returnStudents();
        }
        else {

            returnStudents();

        }
    }
?>