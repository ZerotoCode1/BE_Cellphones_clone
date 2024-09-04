const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)
RatingSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})
module.exports = mongoose.model('Rating', RatingSchema)
