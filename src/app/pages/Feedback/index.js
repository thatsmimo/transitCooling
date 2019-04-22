import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Input,Button} from '@components'
class Feedback extends React.Component {
  state = {
    email:'',
    content:''
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <Input
        placeholder="Email"
        value={this.state.email}
        onChangeText={(email)=>this.setState({email})}
        />
        <Input
        placeholder="Content"
        value={this.state.content}
        onChangeText={(content)=>this.setState({content})}
        style={styles.content}
        multiline={true}
        />
        <Button title="Submit" style={styles.btnSubmit}/>
      </SafeAreaView>
    )
  }


}

export default Feedback
