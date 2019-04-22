import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{

  },
  item:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    padding:10,
    borderRadius:3,
    marginTop:3
  },
  name:{
    fontSize:16
  },
  carrier:{
    fontSize:14,
    color:Colors.Gray,
    marginTop:5
  },
  icon:{
    width:20,
    height:20,
    resizeMode:'contain',
    tintColor:Colors.Gray
  },
  selectedIcon:{
    tintColor:Colors.AppColor
  }

})
