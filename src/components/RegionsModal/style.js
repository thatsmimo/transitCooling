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
  },
  input:{
    height:35,
    backgroundColor:"#f2f3f4",
    marginTop:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  inputText:{
    fontSize:16,
    marginLeft:5,
    color:Colors.Gray
  },
  selected:{
    color:'black'
  },
  icon:{
    width:18,
    height:18,
    marginRight:5,
    resizeMode:'contain',
    tintColor:Colors.Gray
  }
})
