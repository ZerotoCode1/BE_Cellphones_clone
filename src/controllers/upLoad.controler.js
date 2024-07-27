const cloudinary = require('cloudinary').v2

const uploadImage = async (req, res) => {
  return res.status(200).json({ url: req.file.path, name: req.file.filename })
}
module.exports = {
  uploadImage
}
