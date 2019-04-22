import {StyleSheet} from 'react-native'
import {Colors} from '@common'
export default StyleSheet.create({
  container:{
    backgroundColor:Colors.AppColor
  },
  search:{
    height:40,
    backgroundColor:'white',
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    margin:5
  },
  icon:{
    width:20,
    height:20,
    resizeMode:'contain',
    tintColor:Colors.Gray,
    marginHorizontal:5
  },
  input:{
    flex:1
  }
})
