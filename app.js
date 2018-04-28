var app = angular.module('studentsApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'partials/all_students.html',
            controller : 'allCtrl'
        })
        .when('/all_students', {
            templateUrl : 'partials/all_students.html',
            controller : 'allCtrl'
        })
        .when('/gpa', {
            templateUrl : 'partials/gpa.html',
            controller : 'gpaCtrl'
        })
        .when('/add_student', {
            templateUrl : 'partials/add_student.html',
            controller : 'addCtrl'
        })
        .when('/edit_student', {
            templateUrl : 'partials/edit_student.html',
            controller : 'editCtrl'
        })
        .otherwise({
            redirectTo: 'partials/all_students.html'
        });
});

app.controller('allCtrl', function($scope, $http) {

    $http.get("getStudentData.php")
        .then(function (response) {
            $scope.students = response.data;
        });
});

app.controller('addCtrl', function($scope, $http) {

    $scope.addRecord = function() {
        params = "sql=insert";
        params += "&student_id=" + $scope.student_id;
        params += "&first=" + $scope.first_name;
        params += "&last=" + $scope.last_name;
        params += "&completed=" + $scope.hrs_completed;
        params += "&attempted=" + $scope.hrs_attempted;
        params += "&points=" + $scope.gpa_points;
        params += "&major=" + $scope.major;
        params += "&advisor=" + $scope.advisor_id;
        params += "&email=" + $scope.email;

        url = "getStudentData.php?" + params;

        $http.get(url)
            .then(function (response) {
                $scope.status = response.statusText;
            });
    };
});
app.controller('editCtrl', function($scope, $http) {

    $http.get("getStudentData.php")
        .then(function (response) {
            $scope.students = response.data;
        });

    $scope.updateRecord = function() {
        params = "sql=update";
        params += "&student_id=" + $scope.students.student_id;
        params += "&first=" + $scope.first_name;
        params += "&last=" + $scope.last_name;
        params += "&completed=" + $scope.hrs_completed;
        params += "&attempted=" + $scope.hrs_attempted;
        params += "&points=" + $scope.gpa_points;
        params += "&major=" + $scope.major;
        params += "&advisor=" + $scope.advisor_id;
        params += "&email=" + $scope.email;

        url = "getCarData.php?" + params;
        $http.get(url)
            .then(function (response) {
                $scope.students= response.data;
            });

    };

    $scope.deleteRecord = function() {
        params = "sql=delete";
        tempID = $scope.student_id;
        params += "&student_id=" + tempID;

        url = "getStudentData.php?" + params;
        $http.get(url)
            .then(function (response) {
                $scope.students = response.data;
            });

    };
});