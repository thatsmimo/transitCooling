import {StyleSheet} from 'react-native'
import {Colors} from '@common'
export default StyleSheet.create({
  container:{
    height:50,
    backgroundColor:Colors.AppColor,
    flexDirection:'row',
    alignItems:'center',
    paddingRight:10
  },
  item:{
    flex:1,
    height:40,
    borderRadius:5,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10
  },
  text:{
    fontSize:16
  }
})
