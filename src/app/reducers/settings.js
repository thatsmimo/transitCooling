import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_LANGUAGE:
      {
        return {
          ...state,
          lang: action.lang
        }
      }
    case ActionTypes.APPLY_FILTER:
      {
        return {
          ...state,
          type: action.type,
          filter: action.filter
        }
      }
    default:
      return state
  }
}
