const mongoose = require('mongoose')
const { paginate } = require('./plugins/pagnigate')
const Schema = mongoose.Schema

const arameterSchema = new Schema(
  {
    categoryId: { type: String, required: true },
    nameParameter: { type: String, required: true }
  },
  {
    timestamps: true
  }
)
arameterSchema.plugin(paginate)
module.exports = mongoose.model('Parameter', arameterSchema)
