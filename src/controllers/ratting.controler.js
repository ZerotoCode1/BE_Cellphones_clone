'use strict'
const {
  createRatting,
  deleteRatting,
  getRatting,
  updateRatting,
  getFilterRatting
} = require('../services/ratting.service')
const service = require('../services/service')

const getRattingControler = async (req, res) => {
  try {
    const ratings = await getRatting(req.query)

    const ratingsWithUserInfo = await Promise.all(
      ratings.map(async (rating) => {
        // Trích xuất dữ liệu từ _doc và thêm thông tin người dùng
        const ratingData = rating._doc // Lấy dữ liệu chính từ _doc
        const userResponse = await service.findUserById({ _id: ratingData.userId })
        const userInfo = {
          name: userResponse.name,
          image: userResponse.image
        }
        return {
          ...ratingData,
          user: userInfo
        }
      })
    )

    return res.status(200).json(ratingsWithUserInfo)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getRattingFilter = async (req, res) => {
  try {
    const ratings = await getFilterRatting(req.query)

    const ratingsWithUserInfo = await Promise.all(
      ratings.map(async (rating) => {
        // Trích xuất dữ liệu từ _doc và thêm thông tin người dùng
        const ratingData = rating._doc // Lấy dữ liệu chính từ _doc
        const userResponse = await service.findUserById({ _id: ratingData.userId })
        const userInfo = {
          name: userResponse.name,
          image: userResponse.image
        }
        return {
          ...ratingData,
          user: userInfo
        }
      })
    )

    return res.status(200).json(ratingsWithUserInfo)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getRatingStatistics = async (req, res) => {
  try {
    const ratings = await getRatting(req.query)
    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
    let totalPoints = 0
    ratings.forEach((rating) => {
      const rate = rating.rating
      if (Object.prototype.hasOwnProperty.call(ratingCounts, rate)) {
        ratingCounts[rate] += 1
        totalPoints += rate
      }
    })

    // Tính tổng số rating
    const totalRatings = Object.values(ratingCounts).reduce((acc, count) => acc + count, 0)

    // Tính điểm trung bình
    const averageRating = totalRatings > 0 ? (totalPoints / totalRatings).toFixed(2) : 0

    // Trả về kết quả
    return res.status(200).json({
      ratingCounts,
      totalRatings,
      averageRating
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thống kê đánh giá' })
  }
}
const CreateRattingProductId = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body
    if (!userId || !productId || !rating || !comment) {
      return res.status(500).json({ error: 'data ratting is required!' })
    }
    const body = {
      // image: req.file.path,
      userId: userId,
      productId: productId,
      rating: rating,
      comment: comment
    }
    if (req?.file?.path) {
      body.image = req.file.path
    }
    const response = await createRatting(body)
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
  DeleteRattingProductId,
  getRatingStatistics,
  getRattingFilter
}
