import React from 'react'
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { Icons, Constants } from '@common'
import styles from './style'
import { Text } from '@components'

class ActionSheet extends React.Component {
  static defaultProps = {
    items: []
  }

  state = {
    isVisible: false
  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  show = () => {
    this.setState({ isVisible: true })
  }

  render() {
    let { title, items, itemKey } = this.props
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isVisible && items.length > 0}
        onRequestClose={this.hide}>
        <TouchableWithoutFeedback onPress={this.hide}>
          <View style={styles.backgroundColor}>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={this.hide}>
                  <Image source={Icons.SmallClose} style={styles.icon} />
                </TouchableOpacity>
              </View>
              {items.map((item, index) => (
                <TouchableOpacity onPress={() => this.onPress(item)} key={index}>
                  <Text style={styles.item}>{itemKey == undefined ? item : item[itemKey]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  onPress = (index) => {
    this.hide()
    this.props.onSelect(index)
  }

}

export default ActionSheet
