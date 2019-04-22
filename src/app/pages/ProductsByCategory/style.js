import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
  },
  wrapper:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  message:{
    fontSize:18,
    textAlign:'center',
    marginHorizontal:20,
    fontWeight:'bold',
    color:Colors.Gray
  },
  content:{
    paddingBottom:10
  }
})
