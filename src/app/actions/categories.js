import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

export const getCategories = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_CATEGORIES_PENDING })
    Services.getCategories()
      .then((categories) => {
        dispatch({ type: ActionTypes.GET_CATEGORIES_SUCCESS, categories })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_CATEGORIES_FAIL, message: errMsg })
      })
  }
}

export const getChildCategoriesInfo = (category, isSubCategory) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_CHILD_CATEGORIES_INFO_PENDING })

    var result = []
    var count = 0
    var childs = []
    if (isSubCategory) {
      let subCategories = category.subCategories.filter((item) => item.product_count > 0)
      childs = subCategories.map((item) => item.id)
    } else {
      childs = category.children.split(',')
    }
    childs.forEach((item) => {
      Services.getCategoryById(item)
        .then((response) => {
          result.push(response)
          count += 1
          if (count == childs.length) {
            category.children_data = result
            if (category.children_data && category.children_data.length > 0) {
              category.children_data.unshift({ id: 0, name: 'All', active: true })
            }
            dispatch({ type: ActionTypes.GET_CHILD_CATEGORIES_INFO_SUCCESS, category, isSubCategory })
          }
        })
        .catch((errMsg) => {
          count += 1
          if (count == category.children_data.length) {
            category.children_data = result
            dispatch({ type: ActionTypes.GET_CHILD_CATEGORIES_INFO_SUCCESS, category })
          }
        })
    })
  }
}

export const setActiveCategory = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_CATEGORY, id })
  }
}

export const getCategoryById = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PROMOTION_CATEGORY_PENDING })
    Services.getCategoryById(id)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_PROMOTION_CATEGORY_SUCCESS, category: response })
      })
      .catch(errorMsg => {
        dispatch({ type: ActionTypes.GET_PROMOTION_CATEGORY_FAIL, message: errorMsg })
      })
  }
}
