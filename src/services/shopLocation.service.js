const ShopLocation = require('../models/Shoplocation.model')

exports.createShoplocation = async (data) => {
  return await ShopLocation.create(data)
}
exports.getShoplocation = async (query) => {
  return await ShopLocation.paginate(query)
}
exports.updateShoplocation = async (contact) => {
  return await ShopLocation.findOneAndUpdate(
    {
      _id: contact._id
    },
    {
      $set: {
        ...contact
      }
    },
    { new: true }
  )
}
exports.deleteShopLocationById = async (query) => {
  return await ShopLocation.deleteOne({ _id: query._id })
}
