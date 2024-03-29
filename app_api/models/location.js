var mongoose = require( 'mongoose' );

var reviewSchema = new mongoose.Schema({
  author: {
    displayName: {type: String, required: true}
  },
  rating: {type: Number, required: true, min: 0, max: 5},
  reviewText: {type: String, required: true},
  createdOn: {type: Date, "default": Date.now}
});

var openingTimeSchema = new mongoose.Schema({
  days: {type: String, required: true},
  opening: String,
  closing: String,
  closed: {type: Boolean}
});

var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: String,
  rating: {type: Number, "default": 0, min: 0, max: 5},
  facilities: [String],
  coords: {type: [Number], index: '2dsphere'},
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

// Compile model from schema
mongoose.model('Location', locationSchema);