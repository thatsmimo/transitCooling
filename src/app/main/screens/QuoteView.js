import React, { Component } from 'react'
import { Text, View, ScrollView, ImageBackground } from 'react-native'

export default class QuoteView extends Component {
  render() {
    return (
      <ImageBackground style={{ flex: 1 }} source={require('../../../../assets/images/main_bg.png')} >
        <ScrollView>
          <View>
            <Text style={{ marginHorizontal: 20, marginTop: 20, color: '#f8b020', fontSize: 24 }}>My Quote sfsdf</Text>
            <Text style={{marginLeft: 20, marginTop: 10, color: '#fff', fontSize: 17}}>Status</Text>
            <Text style={{marginLeft: 20, marginTop: 5, color: '#fff', fontSize: 14}}>14-15-19</Text>
            <View style={{marginTop:20, marginLeft:25}}>
              <Text style={{marginLeft: 20, marginTop: 5, color: '#fff', fontSize: 28}}>Customer Imformation</Text>
            </View>
            
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}
