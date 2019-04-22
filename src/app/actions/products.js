import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

export const getProductsForHome = (categories) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PRODUCTS_FOR_HOME_PENDING })

    var list = []
    categories.forEach((item) => {
      if (item.product_count > 0) {
        list.push(item)
      }
    })
    Services.getProductsForHome(list)
      .then((products) => {
        dispatch({ type: ActionTypes.GET_PRODUCTS_FOR_HOME_SUCCESS, products })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_PRODUCTS_FOR_HOME_FAIL, message: errMsg })
      })
  }
}

export const getProductsByCategory = (categoryId, categoryName, page, isSubCategory, loadingSingle = false) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_PENDING })

    Services.getProductsByCategory(categoryId, categoryName, page)
      .then((products) => {
        if (page == 0) {
          dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS, products, isSubCategory, loadingSingle })
        } else {
          dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_MORE, products })
        }
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL, message: errMsg })
      })
  }
}


export const searchProducts = (text, filter, page) => {
  return (dispatch, getState) => {
    if (page == 0) {
      dispatch({ type: ActionTypes.SEARCH_PRODUCTS_PENDING })
    }
    Services.searchProducts(text, filter, page)
      .then(({ items, total_count }) => {
        if (page == 0) {
          dispatch({ type: ActionTypes.SEARCH_PRODUCTS_SUCCESS, products: items, total_count })
        } else {
          dispatch({ type: ActionTypes.SEARCH_PRODUCTS_MORE, products: items, total_count })
        }
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.SEARCH_PRODUCTS_FAIL, message: errMsg })
      })
  }
}

export const addToWishList = (product) => {
  return { type: ActionTypes.ADD_PRODUCT_TO_WISHLIST, product }
}

export const removeToWishList = (product) => {
  return { type: ActionTypes.REMOVE_PRODUCT_TO_WISHLIST, product }
}
