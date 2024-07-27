const { getAllByIdCategory } = require('../services/parameter.service')

const getParameterBycategoryId = async (req, res) => {
  try {
    console.log(req.query)
    const parameter = await getAllByIdCategory({ categoryId: req.query.categoryId })
    console.log(parameter)
    return res.status(200).json(parameter)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getParameterBycategoryId
}
