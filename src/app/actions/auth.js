import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import {AsyncStorage} from 'react-native'

export const getAdminToken = ()=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.GET_ADMIN_TOKEN_PENDING})
    Services.getAdminToken()
    .then((token)=>{
      global.token = token
      dispatch({type:ActionTypes.GET_ADMIN_TOKEN_SUCCESS})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.GET_ADMIN_TOKEN_FAIL,message:errMsg})
    })
  }
}

export const signUpCustomer = (firstname,lastname,email,password)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.SIGN_UP_PENDING})
    Services.signUp(firstname,lastname,email,password)
    .then((response)=>{
      dispatch({type:ActionTypes.SIGN_UP_SUCCESS})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.SIGN_UP_FAIL,message:errMsg})
    })
  }
}

export const signInCustomer = (email,password)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.SIGN_IN_PENDING})
    Services.signIn(email,password)
    .then((token)=>{
      global.userToken = token
      dispatch({type:ActionTypes.SIGN_IN_SUCCESS,email,userToken:token})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.SIGN_IN_FAIL,message:errMsg})
    })
  }
}

export const getCustomerInfo = (userToken)=>{
  return (dispatch,getState) => {
    dispatch({type:ActionTypes.GET_CUSTOMER_INFO_PENDING})
    if (typeof userToken != 'undefined' && userToken != null && userToken.length > 0) {
      global.userToken = userToken
    }
    Services.getCustomerInfo()
    .then((customerInfo)=>{
      dispatch({type:ActionTypes.GET_CUSTOMER_INFO_SUCCESS,customerInfo})
    })
    .catch((errMsg)=>{
      dispatch({type:ActionTypes.GET_CUSTOMER_INFO_FAIL,message:errMsg})
    })
  }
}

export const signOut = ()=>{
  return {type:ActionTypes.SIGN_OUT}
}

export const setMyAddress = (myAddress)=>{
  return {type:ActionTypes.SET_MY_ADDRESS,myAddress}
}
