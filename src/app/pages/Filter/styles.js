import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    justifyContent: 'space-between',
    flex: 1
  },
  item: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray
  },
  viewPadding: {
    paddingVertical: 10
  },
  title: {
    paddingHorizontal: 15,
  },
  textTitle: {
    fontWeight: '500',
    paddingVertical: 5,
    fontSize: Constants.FontSize.tiny
  },
  action: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
    borderTopColor: Colors.Gray,
    borderTopWidth: 0.5
  }
})