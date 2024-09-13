const paymentModel = require('../models/Payment.model')

exports.createPayment = async (data) => {
  return await paymentModel.create(data)
}
exports.getPayment = async (query) => {
  return await paymentModel.paginate(query)
}
exports.updatePayment = async (contact) => {
  return await paymentModel.findOneAndUpdate(
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
