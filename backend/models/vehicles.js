var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VehicleSchema   = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    tax : Number,
    horsePower: Number,
    seats: Number,
    topSpeed : Number,
    image : String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);