import * as ActionTypes from '@actions/ActionTypes'
import { Constants } from '@common'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_BY_CATEGORY_PENDING:
      {
        return {
          ...state,
          type: action.type,
          isFetching: true,
          message: ""
        }
      }
    case ActionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL:
      {
        return {
          ...state,
          type: action.type,
          isFetching: false,
          message: action.message
        }
      }
    case ActionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      {
        if (action.isSubCategory) {
          return {
            ...state,
            type: action.type,
            isFetching: false,
            message: "",
            productsByCategorySubCategory: action.products,
            loadingSingle: action.loadingSingle,
            isMore: action.products.products.length == Constants.Api.Limit
          }
        } else {
          return {
            ...state,
            type: action.type,
            isFetching: false,
            message: "",
            productsByCategory: action.products,
            isMore: action.products.products.length == Constants.Api.Limit
          }
        }
      }
    case ActionTypes.GET_PRODUCTS_BY_CATEGORY_MORE:
      {
        return {
          ...state,
          type: action.type,
          isFetching: false,
          message: "",
          productsByCategory: {
            ...state.productsByCategory,
            products: state.productsByCategory.products.concat(action.products.products)
          },
          isMore: action.products.products.length == Constants.Api.Limit
        }
      }
    default:
      return state
  }
}
