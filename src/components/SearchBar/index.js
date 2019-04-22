import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'
import styles from './style'
import {Icons} from '@common'

class SearchBar extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Image source={Icons.Search} style={styles.icon} />
          <TextInput
          style={styles.input}
          placeholder={__.t('What are you looking for?')}
          />
        </View>
      </View>
    )
  }
}

export default SearchBar
