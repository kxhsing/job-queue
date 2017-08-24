var jobQueue = angular.module('jobQueue', []);


function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get number of jobs and show them
    $http.get('/api/jobs')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createJob = function() {
        $http.post('/api/jobs', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.jobs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };