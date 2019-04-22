import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MenuLeft
  },
  icon: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    tintColor: 'white'
  },
  topView: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.AppColor
  },
  separator: {
    height: 0.5,
    backgroundColor: '#999999'
  },
  itemHeader: {
    padding: 10,
    backgroundColor: '#8dc6f2'
  },
  textItemHeader: {
    color: '#999999',
    fontWeight: 'bold'
  }
})
