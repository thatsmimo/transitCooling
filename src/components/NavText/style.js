import { StyleSheet } from 'react-native'
import { Constants, Colors, Styles } from '@common'

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: 5
  }
})
