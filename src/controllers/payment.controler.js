'use strict'
const { updatePayment } = require('../services/payment.service')

const updatePaymentData = async (req, res) => {
  try {
    const data = req.body
    const shop = await updatePayment({
      ...data
    })
    return res.status(200).json(shop)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  updatePaymentData
}
