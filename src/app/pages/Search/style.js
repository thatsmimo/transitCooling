import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 50
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: 'white'
  },
  btnFilter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.AppColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: 'bold',
    color: Colors.Gray
  },
})
