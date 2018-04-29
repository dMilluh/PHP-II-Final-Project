app = angular.module('studentsApp', ['ngRoute']);

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

app.controller('gpaCtrl', function($scope, $http) {
    $http.get("getStudentData.php")
        .then(function (response) {
            $scope.students = response.data
        });
});

app.controller('addCtrl', function($scope, $http) {

    $scope.addRecord = function() {
        params = "sql=insert";
        params += "&student_id=" + $scope.student_id;
        params += "&first_name=" + $scope.first_name;
        params += "&last_name=" + $scope.last_name;
        params += "&hrs_completed=" + $scope.hrs_completed;
        params += "&hrs_attempted=" + $scope.hrs_attempted;
        params += "&gpa_points=" + $scope.gpa_points;
        params += "&major=" + $scope.major;
        params += "&advisor_id=" + $scope.advisor_id;
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

    $scope.getRecord = function() {
        id = $scope.sid;

        $scope.student = $scope.students[0];
};

    $scope.updateRecord = function() {
        params = "sql=update";
        params += "&sid=" + $scope.sid;
        params += "&first_name=" + $scope.student.first_name;
        params += "&last_name=" + $scope.student.last_name;
        params += "&hrs_completed=" + $scope.student.hrs_completed;
        params += "&hrs_attempted=" + $scope.student.hrs_attempted;
        params += "&gpa_points=" + $scope.student.gpa_points;
        params += "&major=" + $scope.student.major;
        params += "&advisor_id=" + $scope.student.advisor_id;
        params += "&email=" + $scope.student.email;

        url = "getStudentData.php?" + params;

        $http.get(url)
            .then(function (response) {
                $scope.students = response.data;
            });
    };

    $scope.deleteRecord = function() {
        params = "sql=delete";
        tempID = $scope.sid;
        params += "&sid=" + tempID;

        url = "getStudentData.php?" + params;

        $http.get(url)
            .then(function (response) {
                $scope.students = response.data;
            });

    };
});