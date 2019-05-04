import Api from './helper/Api'
import {Constants} from '@common'
import * as Utils from './helper/Utils'
import axios from 'axios'

const baseurl = 'https://transitcooling.com';

export const createCart = ()=>{
  return new Promise((resolve,reject)=>{
    Api.post(`/V1/carts/mine`,{},global.userToken)
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body)
      }else{
        reject(response.body.message)
      }
    })
    .catch(reject)
  })
}

export const addItemToCart = (item,quoteId)=>{
  return new Promise((resolve,reject)=>{
    const params = {
      cartItem:{
        sku:item.sku,
        qty:item.qty,
        quote_id:quoteId
      }
    }
    Api.post(`/V1/carts/mine/items`,params,global.userToken)
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body)
      }else{
        reject(response.body.message)
      }
    })
    .catch(reject)
  })
}

export const addItemToQuote = (productId, customerId) => { 
  return new Promise((resolve, reject) => {
    axios.get(`${baseurl}/quoteapi/index/add/product/${productId}/customer/${customerId}`)
      .then(function (response) {
        if (response.status == 200) {
          resolve(response.data)
        } else {
          reject(response);
        }
      })
      .catch(reject)
  })
}


export const changeQtyToQuote = (itemId, qty) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseurl}/quoteapi/index/update/item_id/${itemId}/item_qty/${qty}/`)
      .then(function (response) {
        if (response.status == 200) {
          resolve(response.data)
        } else {
          reject(response);
        }
      })
      .catch(reject)
  })
}


export const deleteQuote = (itemId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseurl}/quoteapi/index/remove/item_id/${itemId}/`)
      .then(function (response) {
        if (response.status == 200) {
          resolve(response.data)
        } else {
          reject(response);
        }
      })
      .catch(reject)
  })
}

export const quoteList = (quoteId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseurl}/quoteapi/index/index/quote_id/${quoteId}`)
      .then(function (response) {
        if (response.status == 200) {
          resolve(response.data)
        } else {
          reject(response);
        }
      })
      .catch(reject)
  })
}


export const submitQuote = (data, quoteId) => {
  return new Promise((resolve, reject) => {
    // var bodyFormData = new FormData();

    // bodyFormData.set('client_comment', data.comment);
    // bodyFormData.set('customer_email', data.email);
    // bodyFormData.set('customer_firstname', data.firstName);
    // bodyFormData.set('customer_lastname', data.lastName);
    // bodyFormData.set('customer_phone', data.telephone);
    // bodyFormData.set('customer_company', data.company);

    axios.post(`${baseurl}/quoteapi/index/request/quote_id/${quoteId}`, {
      client_comment: data.comment,
      customer_email: data.email,
      customer_firstname: data.firstName,
      customer_lastName: data.lastName,
      customer_phone: data.telephone,
      customer_company: data.company,
    })
      .then(function (response) {
        if (response.status == 200) {
          resolve(response.data)
        } else {
          reject(response);
        }
      })
      .catch(reject)
  })
}


export const addItemsToCart = (quoteId,products)=>{
  return new Promise((resolve,reject)=>{
    var count = 0
    products.forEach((item)=>{
      addItemToCart(item,quoteId)
      .then((res)=>{
        count += 1
        if (count == products.length) {
          resolve()
        }
      })
      .catch((error)=>{
        count += 1
        if (count == products.length) {
          resolve()
        }
      })
    })

  })
}

export const estimateShippingCost = (address)=>{
  return new Promise((resolve,reject)=>{

    Api.post(`/V1/carts/mine/estimate-shipping-methods`,{address},global.userToken)
    .then((response)=>{
      if (response.statusCode == 200) {
        if (response.body.length > 0) {
          resolve(response.body)
        }else{
          reject("Don't have any shipping methods at your address")
        }
      }else{
        reject(response.body.message)
      }
    })
    .catch(reject)
  })
}

export const setShippingInfo = (shippingInfo)=>{
  return new Promise((resolve,reject)=>{

    Api.post(`/V1/carts/mine/shipping-information`,shippingInfo,global.userToken)
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body)
      }else{
        reject(response.body.message)
      }
    })
    .catch(reject)
  })
}

export const createOrder = (paymentMethod,billing_address)=>{
  return new Promise((resolve,reject)=>{
    const params = {
      paymentMethod:{
        method:paymentMethod
      },
      billing_address
    }
    Api.post(`/V1/carts/mine/payment-information`,params,global.userToken)
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body)
      }else{
        reject(response.body.message)
      }
    })
    .catch(reject)
  })
}

export const getMyOrders = (customer_email,page)=>{
  return new Promise((resolve,reject)=>{
    Api.get(`/V1/orders?`+Utils.makeParams({
      page,
      pageSize:Constants.Api.Limit,
      sort:"created_at",
      filter:{
        customer_email
      }
    }),global.token)
    .then((response)=>{
      if (response.statusCode == 200) {
        resolve(response.body.items)
      }else{
        reject(response.body.message)
      }
    })
    .catch(reject)
  })
}
