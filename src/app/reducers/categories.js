import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_CATEGORIES_PENDING:
    case ActionTypes.GET_CHILD_CATEGORIES_INFO_PENDING:
    case ActionTypes.GET_PROMOTION_CATEGORY_PENDING:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: true,
          message: ""
        }
      }
    case ActionTypes.GET_CATEGORIES_FAIL:
    case ActionTypes.GET_PROMOTION_CATEGORY_FAIL:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: action.message
        }
      }
    case ActionTypes.GET_CATEGORIES_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          categories: action.categories
        }
      }
    case ActionTypes.GET_CHILD_CATEGORIES_INFO_SUCCESS:
      {
        if (action.isSubCategory) {
          return {
            ...state,
            type: action.type,
            isRequesting: false,
            message: "",
            selectedSubCategory: action.category
          }
        } else {
          return {
            ...state,
            type: action.type,
            isRequesting: false,
            message: "",
            selectedCategory: action.category
          }
        }
      }
    case ActionTypes.SET_ACTIVE_CATEGORY:
      {
        const selectedSub = Object.assign({}, state.selectedSubCategory);
        let children_data = selectedSub.children_data.map((item) => {
          if (item.id === action.id) {
            item.active = true
          } else {
            item.active = false
          }
          return item
        })
        selectedSub.children_data = children_data
        return {
          ...state,
          type: action.type,
          selectedSubCategory: selectedSub
        }
      }
    case ActionTypes.GET_PROMOTION_CATEGORY_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          promotionCategory: action.category
        }
      }
    default:
      return state
  }
}
