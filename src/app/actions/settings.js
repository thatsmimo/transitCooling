import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import { AsyncStorage } from 'react-native'

export const saveLanguage = (lang) => {
  return { type: ActionTypes.SET_LANGUAGE, lang }
}

export const applyFilter = (filter) => {
  return { type: ActionTypes.APPLY_FILTER, filter }
}
