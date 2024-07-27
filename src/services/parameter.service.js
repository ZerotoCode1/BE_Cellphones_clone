const ParameterModel = require('../models/Parameter.model')

exports.createParameter = async (data) => {
  return await ParameterModel.create(data)
}

exports.findBynameParametr = async (query) => {
  return await ParameterModel.findOne({ nameParameter: query.nameParameter }).exec()
}

exports.findByIdCategory = async (query) => {
  return await ParameterModel.findOne({ categoryId: query.categoryId }).exec()
}

exports.getAllByIdCategory = async (query) => {
  return await ParameterModel.find({ categoryId: query.categoryId }).exec()
}
