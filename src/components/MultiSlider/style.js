import { StyleSheet } from 'react-native'
import { Constants, Colors } from '@common'

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  label: {
    marginHorizontal: 15
  },
  trackStyle: {
    height: 4,
    backgroundColor: 'rgba(207,206,204,0.5)'
  },
  selectedStyle: {
    height: 4,
    backgroundColor: Colors.AppColor
  },
  sliderWrap: {
    alignItems: 'center'
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  }
})
