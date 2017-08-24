angular.module('jobService', [])

    // each function returns a promise object 
    .factory('Jobs', function($http) {
        return {
            get : function() {
                return $http.get('/api/jobs');
            },
            create : function(jobData) {
                return $http.post('/api/jobs', jobData);
            },
            findOne : function(id) {
                var requestUrl = '/api/jobs/'+id._id+"/";
                return $http.get(requestUrl);
            },
            delete : function(id) {
                return $http.delete('/api/jobs/' + id);
            }
        }
    });