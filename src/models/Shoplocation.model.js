const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { paginate } = require('./plugins/pagnigate')

const shopLocationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    image: { type: String, required: true },
    nameShop: { type: String, required: true },
    location: { type: String },
    province: { type: String },
    nameProvince: { type: String },
    district: { type: String },
    nameDistrict: { type: String },
    status: { type: Number, default: 1 }
  },
  {
    timestamps: true
  }
)
shopLocationSchema.plugin(paginate)

module.exports = mongoose.model('ShopLocation', shopLocationSchema)
