import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:Colors.AppColor
  },
  content:{
    marginHorizontal:10,
  },
  btnSubmit:{
    marginTop:20,
    backgroundColor:Colors.Green,
    borderRadius:3,
    marginHorizontal:10
  }

})
