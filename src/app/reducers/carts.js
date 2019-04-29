import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
  switch(action.type){
    case ActionTypes.ADD_ITEMS_TO_CART_PENDING:
    case ActionTypes.CREATE_CART_PENDING:
    case ActionTypes.GET_SHIPPING_METHODS_PENDING:
    case ActionTypes.SET_SHIPPING_INFO_PENDING:
    case ActionTypes.CREATE_ORDER_PENDING:
    case ActionTypes.GET_MY_ORDERS_PENDING:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:true,
        message:""
      }
    }
    case ActionTypes.ADD_ITEMS_TO_CART_FAIL:
    case ActionTypes.CREATE_CART_FAIL:
    case ActionTypes.GET_SHIPPING_METHODS_FAIL:
    case ActionTypes.SET_SHIPPING_INFO_FAIL:
    case ActionTypes.CREATE_ORDER_FAIL:
    case ActionTypes.GET_MY_ORDERS_FAIL:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:action.message
      }
    }
    case ActionTypes.ADD_PRODUCT_TO_CART:
    {
      var carts = (typeof state.carts == "undefined") ? [] : state.carts
      var cartIndex = -1
      carts.forEach((item,index)=>{
        if (item.id == action.product.id) {
          cartIndex = index
          return
        }
      })
      if (cartIndex == -1) {
        var product = action.product
        product.qty = 1
        carts.push(product)
      }else{
        var product = carts[cartIndex]
        product.qty += 1
      }

      return {
        ...state,
        carts,
        reload:(typeof state.reload == "undefined") ? false : !state.reload
      }
    }
    case ActionTypes.REMOVE_PRODUCT_TO_CART:
    {
      var carts = state.carts
      var index = carts.indexOf(action.product)
      carts.splice(index,1)
      return {
        ...state,
        carts,
        reload:!state.reload
      }
    }
    case ActionTypes.CHANGE_PRODUCT_QUANTITY:
    {
      var carts = state.carts
      var cartIndex = 0
      carts.forEach((item,index)=>{
        if (item.id == action.product.id) {
          cartIndex = index
          return
        }
      })
      var product = carts[cartIndex]
      product.qty = action.qty

      return {
        ...state,
        carts,
        reload:!state.reload
      }
    }

    case ActionTypes.ADD_ITEMS_TO_CART_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:"",
      }
    }
    case ActionTypes.GET_SHIPPING_METHODS_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:"",
        shippingMethods:action.shippingMethods
      }
    }
    case ActionTypes.CREATE_CART_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:"",
        quoteId:action.quoteId
      }
    }
    case ActionTypes.SET_SHIPPING_ADDRESS:
    {
      return {
        ...state,
        shippingAddress:action.address
      }
    }
    case ActionTypes.SET_SHIPPING_INFO_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:"",
        paymentMethods:action.cartInfo.payment_methods,
        totals:action.cartInfo.totals
      }
    }
    case ActionTypes.CREATE_ORDER_SUCCESS:
    {
      return {
        type:action.type,
        isRequesting:false,
        message:"",
      }
    }
    case ActionTypes.GET_MY_ORDERS_SUCCESS:
    {
      return {
        ...state,
        type:action.type,
        isRequesting:false,
        message:"",
        myOrders:action.orders,
      }
    }
    case ActionTypes.QUOTE_COUNTER:
    {
        var quoteCount = (typeof state.quoteCount == "undefined") ? 1 : state.quoteCount+1;
        
      return{
        ...state,
        type: action.type,
        quoteCount: quoteCount
      }
    }
    default:
      return state
  }
}
