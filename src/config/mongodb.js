'use strict'
const mongoose = require('mongoose')
const mogoUrl =
  'mongodb+srv://quang11102002f:YsGs2d4X8c2lxAG7@cluster0.wfgqacf.mongodb.net/v1Cellphones?retryWrites=true&w=majority&appName=Cluster0'
const connectDb = () => {
  return mongoose
    .connect(mogoUrl)
    .then(() => {
      console.log('connect db success !')
    })
    .catch((err) => console.log('error connect !', err))
}
module.exports = connectDb
