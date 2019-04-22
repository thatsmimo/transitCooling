import {StyleSheet} from 'react-native'
import {Constants} from '@common'

export default StyleSheet.create({
  container:{
    width:Constants.ScreenSize.width,
    height:Constants.ScreenSize.width / 2
  },
  imageStyle:{
    flex: 1, 
    width: '100%',
    height: 50,
    resizeMode: 'contain'
  }
})
