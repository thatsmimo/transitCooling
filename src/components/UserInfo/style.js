import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.AppColor,
    height: 170,
  },
  background: {
    flex: 1,
    width: null,
    height: null
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: 'white'
  },
  name: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontSize: Constants.FontSize.large,
    color: 'white',
    marginTop: 40,
    fontWeight: '100'
  },
  btnSign: {
    backgroundColor: '#008CFF',
    borderColor: '#49B3FF',
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 20
  },
  txtButton: {
    color: 'white'
  }
})
