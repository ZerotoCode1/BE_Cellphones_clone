const paymentModel = require('../models/Payment.model')

exports.createPayment = async (data) => {
  return await paymentModel.create(data)
}
