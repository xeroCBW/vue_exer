// import jwt from 'jsonwebtoken'
const jwt = require("jsonwebtoken");
// import config from '../config'
// const jwtSecret = process.env.NODE_ENV === 'production' ? config.tokenKey.prod : config.tokenKey.dev

const jwtSecret = "infonet123$"

export const generateToken = (userName, userId) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({userName,userId}, jwtSecret, {expiresIn: '24h'});
    resolve(token)
  })
}

export const getToken = (token) => {
  return new Promise((resolve, reject) => {
    if(!token) {
      reject({error: 'token是空的'})
    }else {
      console.log('token=',token)
      const info = jwt.verify(token.split(' ')[1], jwtSecret)
      console.log('info=',info)
      resolve(info) //解析返回的值
    }
  })
}