var express = require('express');        
var app = express(); 
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Job = require('./app/models/job');
var fetch = require('node-fetch');
var async = require('async');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logging
app.use(morgan('combined')); 
app.use(express.static('public')); 

// connect to our database and establish port
var port = process.env.PORT || 8080;  
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); 

// create new instance of a queue with 10 workers at a time
var q = async.queue(function (task, callback) {  
  queueJob(task, callback);  
}, 10);  

// when queue is done processing, send message indicating so
q.drain = function () {  
  console.log('The queue has finished processing!');  
};

// ACTIONS FOR QUEUE
// =============================================================================
var queueJob = function(new_job, callback) {
    var new_url = new_job.url;
    var new_id = new_job._id;

    fetch(new_url)
        .then(data => data.text())
        .then((text) => {
            new_job.data = text;  // Update the job's data info
            new_job.job_status = "Completed!";
            new_job.save(function(err) {
                if (err)
                    console.log(err);
            })
        })
          .catch(function (error) {
            console.log('Request failed', error)
          });
          
    callback(); 
    }

// ROUTES FOR API
// =============================================================================
var router = express.Router();              // Get an instance of the express Router

// Middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Working on it!');
    next();
});


app.get('/api/', function(req, res) {
    res.json({ message: 'Welcome to the job queue!' });   
});

// Create a job (accessed at POST http://localhost:8080/api/jobs/)
app.post('/api/jobs', function(req, res) {

        var new_job = new Job();      // Create a new instance of the Job model
        new_job.url = req.body.url;  // Set the job url of requested site (comes from the request)
        new_job.job_status = "In Progress";
        var new_job_id = null;

        // Save the new job and check for errors
        new_job.save(function(err) {
            if (err)
                res.send(err);
            new_job_id = new_job._id;
            res.json({ message: 'Job created. Check below for status. ID: '+new_job_id });
        });

        // Push job onto queue to fetch HTML from URL
        q.push(new_job, function (err, result) {  
          if (err) { console.log(err); }   
          console.log('Finished processing URL!');   
        });

    });

app.get('/api/jobs', function(req, res) {
        Job.find(function(err, jobs) {
            if (err)
                res.send(err);
            res.json(jobs);
        });
    });


// Get individual job status and results
app.get('/api/jobs/:job_id', function(req, res) {
        Job.findById(req.params.job_id, function(err, job) {
            if (err)
                res.send(err);
            res.json(job);
        });
    });

app.delete('/api/jobs/:job_id', function(req, res) {
        Job.remove({
            _id: req.params.job_id
        }, function(err, job) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
  });


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happening on port ' + port);

