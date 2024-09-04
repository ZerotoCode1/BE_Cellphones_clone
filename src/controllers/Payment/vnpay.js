'use strict'
const moment = require('moment')
const querystring = require('qs')
const Crypto = require('crypto')
const config = {
  vnp_TmnCode: '4IUPV3MX',
  vnp_HashSecret: 'SHLWWRI671YLOVRX88UXB3AJKUKWHEMC',
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_Api: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
  vnp_ReturnUrl: 'http://localhost:8888/order/vnpay_return'
}
const vnpay = async (req, res) => {
  const inforPayment = req.body
  var ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  var tmnCode = config.vnp_TmnCode
  var secretKey = config.vnp_HashSecret
  var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
  var returnUrl = 'http://localhost:3000/'

  var date = new Date()

  var createDate = formatDateToCustomString(date)
  var orderId = formatTimeToCustomString(date)
  var amount = inforPayment.amount
  var bankCode = inforPayment?.bankCode

  var orderInfo = 'thanh toán tiền'
  var orderType = 100001
  var locale = ''
  if (locale === null || locale === '') {
    locale = 'vn'
  }
  var currCode = 'VND'
  var vnp_Params = {}
  vnp_Params['vnp_Version'] = '2.1.0'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_TmnCode'] = tmnCode
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale
  vnp_Params['vnp_CurrCode'] = currCode
  vnp_Params['vnp_TxnRef'] = orderId
  vnp_Params['vnp_OrderInfo'] = orderInfo
  vnp_Params['vnp_OrderType'] = orderType
  vnp_Params['vnp_Amount'] = amount * 100
  vnp_Params['vnp_ReturnUrl'] = returnUrl
  vnp_Params['vnp_IpAddr'] = ipAddr
  vnp_Params['vnp_CreateDate'] = createDate
  if (bankCode) {
    vnp_Params['vnp_BankCode'] = bankCode
  }

  try {
    vnp_Params = sortObject(vnp_Params)

    var signData = querystring.stringify(vnp_Params, { encode: false })

    var hmac = Crypto.createHmac('sha512', secretKey)
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })
    const data = {
      order_url: vnpUrl
    }

    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  vnpay
}
function formatDateToCustomString(date) {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return year + month + day + hours + minutes + seconds
}
function formatTimeToCustomString(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return hours + minutes + seconds
}

function sortObject(obj) {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}
