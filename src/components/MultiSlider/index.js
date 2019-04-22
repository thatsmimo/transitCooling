import React from 'react'
import {
  View,
  Image
} from 'react-native'
import styles from './style'
import { Text, Button } from '@components'
import { Icons, Config } from '@common'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

class Slider extends React.Component {
  state = {
    sliderLength: 0,
    min: 0,
    max: 100
  }

  render() {
    let { txt, minValue, maxValue, style, onValuesChange, min, max } = this.props
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{minValue} - {maxValue} {Config.Currency.symbol}</Text>
        <View onLayout={(e) => this.setState({ sliderLength: e.nativeEvent.layout.width })} style={styles.sliderWrap}>
          <MultiSlider
            sliderLength={this.state.sliderLength - 30}
            values={[minValue, maxValue]}
            onValuesChange={onValuesChange}
            min={min}
            max={max}
            step={1}
            trackStyle={styles.trackStyle}
            selectedStyle={styles.selectedStyle}
            customMarker={(e) => <Image source={Icons.SliderMarker} style={styles.icon} />}
          />
        </View>
      </View>
    )
  }
}

export default Slider
