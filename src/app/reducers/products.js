import * as ActionTypes from '@actions/ActionTypes'
import { Constants } from '@common'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_FOR_HOME_PENDING:
    case ActionTypes.SEARCH_PRODUCTS_PENDING:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: true,
          message: ""
        }
      }
    case ActionTypes.GET_PRODUCTS_FOR_HOME_FAIL:
    case ActionTypes.SEARCH_PRODUCTS_FAIL:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: action.message
        }
      }
    case ActionTypes.GET_PRODUCTS_FOR_HOME_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          homeProducts: action.products
        }
      }
    case ActionTypes.SEARCH_PRODUCTS_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          searchedProducts: action.products,
          isMore: action.products.length == Constants.Api.Limit,
          total_count: action.total_count
        }
      }
    case ActionTypes.SEARCH_PRODUCTS_MORE:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          searchedProducts: state.searchedProducts.concat(action.products),
          isMore: action.products.length == Constants.Api.Limit,
          total_count: action.total_count
        }
      }
    case ActionTypes.ADD_PRODUCT_TO_WISHLIST:
      {
        var wishlist = state.wishlist
        if (typeof wishlist == "undefined") {
          wishlist = []
        }
        if (wishlist.indexOf(action.product) == -1) {
          wishlist.push(action.product)
        }

        return {
          ...state,
          wishlist,
          reload: typeof state.reload == "undefined" ? false : !state.reload
        }
      }
    case ActionTypes.REMOVE_PRODUCT_TO_WISHLIST:
      {
        var wishlist = state.wishlist
        var index = wishlist.indexOf(action.product)
        wishlist.splice(index, 1)
        return {
          ...state,
          wishlist,
          reload: !state.reload
        }
      }
    default:
      return state
  }
}
