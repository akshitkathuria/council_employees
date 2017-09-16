var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var storage = new Schema({
  user_name: String
});


var wholedata =  new Schema({
    heading: String,
    subject: String,
    date: Date,
    link: String,
})

module.exports ={
  storage,
  wholedata
}

