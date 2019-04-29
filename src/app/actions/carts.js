import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import {AsyncStorage} from 'react-native'

export const addToCart = (product)=>{
  return {type:ActionTypes.ADD_PRODUCT_TO_CART,product}
}

export const quoteCount = () => {
  return { type: ActionTypes.QUOTE_COUNTER }
}

export const removeToCart = (product)=>{
  return {type:ActionTypes.REMOVE_PRODUCT_TO_CART,product}
}

export const changeProductQuantity = (product,qty)=>{
  return {type:ActionTypes.CHANGE_PRODUCT_QUANTITY,product,qty}
}

export const createCart = ()=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.CREATE_CART_PENDING})

    Services.createCart()
    .then((quoteId)=>{
      dispatch({type:ActionTypes.CREATE_CART_SUCCESS,quoteId})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.CREATE_CART_FAIL,message:errMsg})
    })
  }
}

export const addItemsToCart = (quoteId,products)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.ADD_ITEMS_TO_CART_PENDING})

    Services.addItemsToCart(quoteId,products)
    .then((response)=>{
      dispatch({type:ActionTypes.ADD_ITEMS_TO_CART_SUCCESS})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.ADD_ITEMS_TO_CART_FAIL,message:errMsg})
    })
  }
}

export const setShippingAddress = (address)=>{
  return {type:ActionTypes.SET_SHIPPING_ADDRESS,address}
}

export const estimateShippingCost = (address)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.GET_SHIPPING_METHODS_PENDING})

    Services.estimateShippingCost(address)
    .then((shippingMethods)=>{
      dispatch({type:ActionTypes.GET_SHIPPING_METHODS_SUCCESS,shippingMethods})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.GET_SHIPPING_METHODS_FAIL,message:errMsg})
    })
  }
}

export const setShippingInfo = (params)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.SET_SHIPPING_INFO_PENDING})

    Services.setShippingInfo(params)
    .then((cartInfo)=>{
      dispatch({type:ActionTypes.SET_SHIPPING_INFO_SUCCESS,cartInfo})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.SET_SHIPPING_INFO_FAIL,message:errMsg})
    })
  }
}

export const createOrder = (paymentMethod,billing_address)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.CREATE_ORDER_PENDING})

    Services.createOrder(paymentMethod,billing_address)
    .then((response)=>{
      dispatch({type:ActionTypes.CREATE_ORDER_SUCCESS})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.CREATE_ORDER_FAIL,message:errMsg})
    })
  }
}

export const getMyOrders = (customer_email,page)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.GET_MY_ORDERS_PENDING})

    Services.getMyOrders(customer_email,page)
    .then((orders)=>{
      dispatch({type:ActionTypes.GET_MY_ORDERS_SUCCESS,orders})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.GET_MY_ORDERS_FAIL,message:errMsg})
    })
  }
}
