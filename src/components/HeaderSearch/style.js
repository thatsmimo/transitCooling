import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.AppColor,
    width: Constants.ScreenSize.width
  },
  search: {
    height: 35,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.Gray,
    marginHorizontal: 5
  },
  input: {
    flex: 1,
    color: '#000'
  }
})
