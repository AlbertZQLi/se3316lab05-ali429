var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentSchema   = new Schema({
    item: String,
    comment: String,
    user: String,
    rating: Number,
    hidden: Boolean
});

module.exports = mongoose.model('', CommentSchema);