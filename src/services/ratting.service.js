const RatingModel = require('../models/Ratting.model')

exports.createRatting = async (data) => {
  return await RatingModel.create(data)
}
exports.getRatting = async (query) => {
  return await RatingModel.find({
    productId: query.productId
  })
}
exports.updateRatting = async (query) => {
  return await RatingModel.findOneAndUpdate(
    {
      _id: query._id,
      userId: query.userId,
      productId: query.productId
    },
    {
      $set: {
        ...query
      }
    },
    { new: true }
  )
}
exports.deleteRatting = async (query) => {
  return await RatingModel.deleteOne({
    _id: query._id,
    userId: query.userId,
    productId: query.productId
  })
}
