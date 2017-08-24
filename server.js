var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var Job = require('./app/models/job');
var fetch = require('node-fetch');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database


// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Working on it!');
    next();
});


app.get('/api/', function(req, res) {
    res.json({ message: 'Welcome to the job queue!' });   
});

// Create a job (accessed at POST http://localhost:8080/api/jobs)
app.post('/api/jobs', function(req, res) {

        var new_job = new Job();      // create a new instance of the Job model
        new_job.url = req.body.url;  // set the job url of requested site (comes from the request)
        new_job.job_status = "In Progress";
        var new_job_id = null;


        // Save the new job and check for errors
        new_job.save(function(err) {
            if (err)
                res.send(err);

            new_job_id = new_job._id;

            res.json({ message: 'Job created. ID: '+new_job_id });
        });

        //Fetch HTML for URL. Something to consider: {mode: 'no-cors'}?
        fetch(new_job.url)
          .then(data => data.text())
          .then((text) => {
            // console.log(text);
            new_job.data = text;  // update the job's data info
            new_job.job_status = "Job completed!";
            console.log("Job completed!");
            new_job.save(function(err) {
                if (err)
                    res.send(err);
            })
          }).catch(function (error) {
            console.log('request failed', error)
          });
    });

app.get('/api/jobs', function(req, res) {
        Job.find(function(err, jobs) {
            if (err)
                res.send(err);

            res.json(jobs);
        });
    });


//Get individual job status and results

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

app.get('/', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happening on port ' + port);