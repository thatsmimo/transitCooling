import { StyleSheet } from 'react-native'
import { Colors } from '@common'


export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: Colors.Gray
  },
})