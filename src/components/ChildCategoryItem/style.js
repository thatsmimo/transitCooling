import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  image:{
    width:180,
    height:180,
  },
  bottomView:{
    alignItems:'center',
    justifyContent:'center',
    height:30,
    width:180,
    backgroundColor:Colors.DarkBlue
  },
  name:{
    fontSize:13,
    textAlign:'center',
    color:'white',
    marginHorizontal:5
  },
})
