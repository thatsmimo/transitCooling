import { StyleSheet } from 'react-native'
import { Constants } from '@common'
const Width = Constants.ScreenSize.width - 15
const Height = Width / 2

export default StyleSheet.create({
  image: {
    width: Height,
    height: Height,
  },
  foreground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 3
  },
  name: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  wrap: {
    justifyContent: 'space-between',
    height: Height
  },
  separator: {
    width: 5
  },
  list: {
    paddingHorizontal: 5,
  }
})