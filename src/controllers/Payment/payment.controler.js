'use strict'
const { createPayment, getPayment } = require('../../services/payment.service')
const cloudinary = require('cloudinary').v2

const getDataPayment = async (req, res) => {
  try {
    const dataPayment = await getPayment(req.query)
    return res.status(200).json(dataPayment)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
module.exports = {
  getDataPayment
}
