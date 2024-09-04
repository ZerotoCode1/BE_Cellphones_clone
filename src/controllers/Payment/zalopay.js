'use strict'
const axios = require('axios').default // npm install axios
const CryptoJS = require('crypto-js') // npm install crypto-js
const moment = require('moment')
const paymentService = require('../../services/payment.service')

const config = {
  app_id: '2553',
  key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
  key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
}
const zalopayment = async (req, res) => {
  const inforPayment = req.body
  const embed_data = {
    redirecturl: 'http://localhost:3000/cart/payment-info?tab=Payment'
  }

  const transID = Math.floor(Math.random() * 1000000)

  const convertData = [
    JSON.stringify(inforPayment?.informationShip),
    JSON.stringify(inforPayment.item)
  ]

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: inforPayment?.name,
    app_time: Date.now(),
    item: JSON.stringify(convertData),
    embed_data: JSON.stringify(embed_data),
    amount: Number(inforPayment?.amount),
    //  https://7fd0-14-191-165-226.ngrok-free.app
    callback_url: 'https://7fd0-14-191-165-226.ngrok-free.app/v1/api/callbackzalo',
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: ''
  }
  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

  try {
    const result = await axios.post(config.endpoint, null, { params: order })

    return res.status(200).json(result.data)
  } catch (error) {
    console.log(error)
  }
}
const callbackZalopayment = async (req, res) => {
  let result = {}
  console.log(req.body)
  try {
    let dataStr = req.body.data
    let reqMac = req.body.mac
    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString()
    console.log('mac =', mac)
    if (reqMac !== mac) {
      result.return_code = -1
      result.return_message = 'mac not equal'
    } else {
      let dataJson = JSON.parse(dataStr, config.key2)
      const inforPayment = JSON.parse(dataJson.item)
      const inforShiping = JSON.parse(inforPayment[0])
      const infor = JSON.parse(inforShiping)

      const body = {
        method: 'ZaloPay',
        amount: dataJson.amount,
        item: JSON.parse(JSON.parse(inforPayment[1])),
        nameCusstormer: dataJson.app_user,
        status: 1,
        userId: dataJson.app_id,
        informationShip: {
          phone: infor.phone,
          province: infor.province,
          recipientName: infor.recipientName,
          note: infor.note,
          district: infor.district,
          ward: infor.ward,
          addressStore: infor.addressStore,
          address: infor.address
        }
      }
      try {
        const res = await paymentService.createPayment(body)
        return res.status(200).json(res.data)
      } catch (error) {
        console.log(error)
      }
      result.return_code = 1
      result.return_message = 'success'
    }
  } catch (ex) {
    console.log('lỗi:::' + ex.message)
    result.return_code = 0 // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message
  }
  res.json(result)
}
module.exports = {
  zalopayment,
  callbackZalopayment
}
