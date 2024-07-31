'use strict'
const {
  createRatting,
  deleteRatting,
  getRatting,
  updateRatting
} = require('../services/ratting.service')

const getRattingControler = async (req, res) => {
  try {
    const response = await getRatting(req.query)
    return res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const CreateRattingProductId = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body
    if (!userId || !productId || !rating || !comment) {
      return res.status(500).json({ error: 'data ratting is required!' })
    }
    if (typeof rating !== 'number') {
      return res.status(500).json({ error: 'ratting is number!' })
    }
    const response = await createRatting(req.body)
    return res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const UpdateRattingProductId = async (req, res) => {
  const { userId, productId, rating, comment } = req.body
  console.log(req.body)
  if (!userId || !productId || !rating || !comment) {
    return res.status(500).json({ error: 'data ratting is required!' })
  }
  if (typeof rating !== 'number') {
    return res.status(500).json({ error: 'ratting is number!' })
  }
  try {
    const response = await updateRatting(req.body)
    if (!response) {
      return res.status(500).json({ error: 'cannot update ratting' })
    }
    return res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const DeleteRattingProductId = async (req, res) => {
  try {
    const response = await deleteRatting(req.query)
    if (!response) {
      return res.status(500).json({ error: 'cannot update ratting' })
    }
    return res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getRattingControler,
  CreateRattingProductId,
  UpdateRattingProductId,
  DeleteRattingProductId
}
