import {StyleSheet} from 'react-native'
import {Constants} from '@common'
const padding = 10

export default StyleSheet.create({
  container:{
    paddingLeft:10,
    paddingTop:10
  },
  image:{
    flex:1
  },
  name:{
    fontSize:28,
    textAlign:'center',
    color:'white',
    fontWeight:'bold'
  },
  foreground:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.4)',
    borderRadius:3,
    alignItems:'center',
    justifyContent:'center',
    padding:10

  }
})
