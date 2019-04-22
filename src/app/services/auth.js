import Api from './helper/Api'
import {Config} from '@common'

export const getAdminToken = ()=>{
  return new Promise((resolve,reject)=>{
    resolve(Config.MagentoConfig.AccessToken)
  })
}

export const signUp = (firstname,lastname,email,password)=>{
  return new Promise((resolve,reject)=>{
    const params = {
      customer:{
        firstname,lastname,email,storeId:1
      },
      password
    }
    Api.post("/V1/customers",params)
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body)
      }else{
        var params = response.body.parameters
        if (typeof params != "undefined" && params.length > 0) {
          var message = response.body.message
          params.forEach((item,index)=>{
            message = message.replace("%"+(index+1),item)
          })
          reject(message)
        }else{
          reject(response.body.message)
        }
      }
    })
    .catch(reject)
  })
}

export const signIn = (email,password)=>{
  return new Promise((resolve,reject)=>{
    Api.post("/V1/integration/customer/token",{username:email,password})
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body)
      }else{
        var params = response.body.parameters
        if (typeof params != "undefined" && params.length > 0) {
          var message = response.body.message
          params.forEach((item,index)=>{
            message = message.replace("%"+(index+1),item)
          })
          reject(message)
        }else{
          reject(response.body.message)
        }
      }
    })
    .catch(reject)
  })
}

export const getCustomerInfo = ()=>{
  return new Promise((resolve,reject)=>{
    if (typeof global.userToken == "undefined" || global.userToken == null || global.userToken.length == 0) {
      return reject("invalid token")
    }
    Api.get("/V1/customers/me",global.userToken)
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body)
      }else{
        var params = response.body.parameters
        if (typeof params != "undefined" && params.length > 0) {
          var message = response.body.message
          params.forEach((item,index)=>{
            message = message.replace("%"+(index+1),item)
          })
          reject(message)
        }else{
          reject(response.body.message)
        }
      }
    })
    .catch(reject)
  })
}
