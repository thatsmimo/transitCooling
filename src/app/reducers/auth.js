import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
  switch(action.type){
    case ActionTypes.GET_ADMIN_TOKEN_PENDING:
    case ActionTypes.SIGN_UP_PENDING:
    case ActionTypes.SIGN_IN_PENDING:
    case ActionTypes.GET_CUSTOMER_INFO_PENDING:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:true,
        message:""
      }
    }
    case ActionTypes.GET_ADMIN_TOKEN_FAIL:
    case ActionTypes.SIGN_UP_FAIL:
    case ActionTypes.SIGN_IN_FAIL:
    case ActionTypes.GET_CUSTOMER_INFO_FAIL:
    {
      return {
        ...state,...state,
        type:action.type,
        isRequesting:false,
        message:action.message
      }
    }
    case ActionTypes.GET_ADMIN_TOKEN_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:""
      }
    }
    case ActionTypes.SIGN_IN_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:"",
        email:action.email,
        userToken:action.userToken
      }
    }
    case ActionTypes.GET_CUSTOMER_INFO_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:"",
        customerInfo:action.customerInfo
      }
    }
    case ActionTypes.SIGN_OUT:
    {
      return {
        ...state,
        userToken:null,
        email:null,
        customerInfo:null,
        myAddress:null
      }
    }
    case ActionTypes.SET_MY_ADDRESS:
    {
      return {
        ...state,
        myAddress:action.myAddress
      }
    }
    default:
      return state
  }
}
