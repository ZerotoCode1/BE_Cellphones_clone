const mongoose = require('mongoose')
const { paginate } = require('./plugins/pagnigate')
const Schema = mongoose.Schema

const paymentSchema = new Schema(
  {
    method: { type: String, required: true },
    amount: { type: Number, required: true },
    item: [
      {
        id: String,
        img: String,
        titleProduct: String,
        salePrice: Number,
        topic: String,
        quantity: Number,
        id_version: String,
        keyColor: String
      }
    ],
    informationShip: { type: Object, required: true },
    nameCusstormer: { type: String, required: true },
    status: { type: Number, required: true },
    userId: { type: String, required: true },
    orderId: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)
paymentSchema.plugin(paginate)
module.exports = mongoose.model('Payment', paymentSchema)
