import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingHorizontal:10,
    paddingTop:30
  },
  content:{
    height:300,
    borderWidth:0.5,
    borderColor:Colors.Gray,
    textAlignVertical:"top",
    marginTop:10,
    padding:10
  },
  btnSubmit:{
    marginTop:20
  }

})
