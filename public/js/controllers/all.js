var jobController = angular.module("jobController", []);

jobController.controller('mainController', function($scope, $http, Jobs) {
        $scope.formData = {};

        //when landing on the page, get number of jobs and show them
        Jobs.get()
            .success(function(data) {
                $scope.jobs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the url to the node API to create a job
        $scope.createJob = function() {
            Jobs.create($scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log(data);
                    $scope.message = data.message;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
});

jobController.controller('checkController', function($scope, $http, Jobs) {

        // when submitting the check form, send the ID to the node API for status and results
        $scope.getJob = function() {
            console.log($scope.formData);
            Jobs.findOne($scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log(data);
                    $scope.result = "Job Status: "+data.job_status;
                    $scope.htmldata = data.data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
});

