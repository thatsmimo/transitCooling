import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.4)',
    paddingVertical:100,
    paddingHorizontal:30
  },
  list:{
    flex:1,
    backgroundColor:'white'
  },
  separator:{
    height:1,
    backgroundColor:Colors.Gray
  },
  item:{
    paddingHorizontal:10,
    paddingVertical:15
  },
  name:{
    fontSize:16,
    fontWeight:'bold',
  },
})
