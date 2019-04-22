import {StyleSheet} from 'react-native'
import {Constants,Colors} from '@common'

export default StyleSheet.create({
  backgroundColor:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.4)',
    justifyContent:'flex-end'
  },
  content:{
    backgroundColor:'white'
  },
  header:{
    paddingLeft: 10,
    paddingVertical: 5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
    marginBottom:10
  },
  icon:{
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: Colors.Gray,
    marginHorizontal:10
  },
  title:{
    fontSize: Constants.FontSize.tiny,
    color: Colors.Gray
  },
  item:{
    fontSize: Constants.FontSize.small,
    marginHorizontal:10,
    marginVertical: 10
  }
})
