import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:12
  },
  title:{
    fontSize:16,
    color:Colors.Gray
  },
  seeAll:{
    fontSize:15,
    color:Colors.Blue
  }
})
