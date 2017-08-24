var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var JobSchema = new Schema({
    url: String,
    job_status: String,
    data: String,

});

module.exports = mongoose.model('Job', JobSchema);