const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Volunteer', volunteerSchema);