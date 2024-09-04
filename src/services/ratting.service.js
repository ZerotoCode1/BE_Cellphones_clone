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
// exports.getFilterRatting = async (query) => {
//   const filter = { productId: query.productId }
//   if (query.numberRate) {
//     filter.rating = Number(query.numberRate) // Chuyển đổi số điểm thành kiểu Number
//   }
//   return await RatingModel.find(filter)
// }

exports.getFilterRatting = async (query) => {
  const filter = { productId: query.productId }

  if (query.numberRate) {
    filter.rating = Number(query.numberRate) // Chuyển đổi số điểm thành kiểu Number
  }

  if (query.image) {
    filter.image = { $exists: true, $ne: null } // Kiểm tra xem có thuộc tính image và image khác null
  }

  return await RatingModel.find(filter)
}
