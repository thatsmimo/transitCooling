import {StyleSheet} from 'react-native'
import {Colors} from '@common'
export default StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.AppColor
  },
  message:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:Colors.Red,
    marginHorizontal:20
  }
})
