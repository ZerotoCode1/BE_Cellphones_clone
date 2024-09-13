'use strict'
const {
  createShoplocation,
  getShoplocation,
  updateShoplocation,
  deleteShopLocationById
} = require('../services/shopLocation.service')

const createShopLocation = async (req, res) => {
  try {
    const data = req.body
    const Posts = await createShoplocation(data)
    return res.status(200).json(Posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getShop = async (req, res) => {
  try {
    const shop = await getShoplocation(req.query)
    return res.status(200).json(shop)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const updateShopLocations = async (req, res) => {
  try {
    const data = req.body
    const shop = await updateShoplocation({
      ...data
    })
    return res.status(200).json(shop)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const deleteShopById = async (req, res) => {
  try {
    const shop = await getShoplocation({ _id: req.query._id })
    if (!shop) {
      return res.status(403).json({ message: 'shop not exist' })
    }
    await deleteShopLocationById({ _id: req.query._id })
    return res.status(200).json({
      message: 'delete success !'
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
module.exports = {
  createShopLocation,
  getShop,
  updateShopLocations,
  deleteShopById
}
