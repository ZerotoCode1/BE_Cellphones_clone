const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { paginate } = require('./plugins/pagnigate')

const addtributecategorySchema = new Schema(
  {
    categoryId: { type: String, required: true, unique: true },
    numberTechnical: [
      {
        key: String,
        technical: String,
        describe: String,
        representative: Boolean,
        topic: String
      }
    ]
  },
  {
    timestamps: true
  }
)
addtributecategorySchema.plugin(paginate)

module.exports = mongoose.model('Addtributecategory', addtributecategorySchema)
