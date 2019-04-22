import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10
  },
  image:{
    width:80,
    height:80,
    borderRadius:40,
    marginLeft:10
  },
  content:{
    flex:1,
    marginHorizontal:10
  },
  text:{
    fontSize:16,
    marginTop:5
  },
})
