import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
  },
  list:{
    paddingBottom:10
  },
  total:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical:10
  },
  btnCheckout:{
    borderRadius:3,
    backgroundColor:Colors.Green,
    marginBottom:10,
    marginHorizontal:10
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
})
