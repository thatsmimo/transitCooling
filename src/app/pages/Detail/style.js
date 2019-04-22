import {StyleSheet} from 'react-native'
import {Colors} from '@common'
export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',

  },
  image:{
    marginTop:10,
    height:200,
    width:'100%',
    resizeMode:'contain'
  },
  separator:{
    height:0.5,
    backgroundColor:Colors.Gray
  },
  name:{
    margin:10,
    fontSize:18,
    fontWeight:'bold'
  },
  price:{
    marginHorizontal:10,
    fontSize:15,
    color:Colors.DrakGray
  },
  addCart:{
    height:40,
    backgroundColor:Colors.Green,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:3,
    margin:10
  },
  addCartText:{
    fontSize:16,
    fontWeight:'bold',
    color:'white'
  },
  description:{
    margin:10,
  }
})
