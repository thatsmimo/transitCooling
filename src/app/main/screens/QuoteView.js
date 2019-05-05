import React, { Component } from 'react'
import { Text, View, ScrollView, ImageBackground, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as API from '@services'

export default class QuoteView extends Component {

  constructor(props){
    super(props);
    this.state = {
      quoteviewId: this.props.navigation.getParam('quoteviewId'),
      response : {},
      loader: true
    }
  }

  async componentDidMount() {
    
    var response = await API.quoteDetails(this.state.quoteviewId);
    console.log(response)
    await this.setState({response : response})
    this.setState({loader:false})
  }

  render() {
    return (
      (this.state.loader) ?
        <View style={[style.container, style.horizontal]}>
          <ActivityIndicator size="large" color='#f8b020' />
        </View>
        :
        <ImageBackground style={{ flex: 1 }} source={require('../../../../assets/images/main_bg.png')} >
          <ScrollView>
            <View>
              <Text style={{ marginHorizontal: 20, marginTop: 20, color: '#f8b020', fontSize: 24 }}>{this.state.response.info.title}</Text>
              <Text style={{marginLeft: 20, marginTop: 10, color: '#fff', fontSize: 17}}>Status</Text>
              <Text style={{marginLeft: 20, marginTop: 5, color: '#fff', fontSize: 14}}>14-15-19</Text>
              
              <View style={{marginTop:20, marginLeft:15}}>
                <Text style={{ marginTop: 5, color: '#fff', fontSize: 22, fontWeight:'700'}}>Customer Imformation</Text>
                <View style={{flexDirection:'row',marginTop:10}}>
                  <Text style={{color:'#fff',fontSize:16,fontWeight:'600'}}>Customer Name: </Text>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}> {this.state.response.info.customer_name}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Email: </Text>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>  {this.state.response.info.customer_email}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Telephone: </Text>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>  {this.state.response.info.customer_phone}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Company: </Text>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>  {this.state.response.info.customer_company}</Text>
                </View>
              </View>
              {
                this.state.response.items.map( (data,key) => {
                  return (
                    <View key={key} style={{ marginTop: 20, margin: 5, borderColor: '#fff', borderWidth: 1, paddingVertical: 20 }}>
                      <View style={{ alignContent:'flex-end',left:20}}>
                        <Image style={{ width: 100, height: 100 }}s source={{ uri: data.image }}></Image>
                        <View style={{ flexDirection: 'row', marginTop: 10, width: '50%' }}>
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Item: </Text>
                          <Text style={{ color: '#f8b020', fontSize: 15, fontWeight: '500' }}>  {data.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>SKU: </Text>
                          <Text style={{ color: '#f8b020', fontSize: 15, fontWeight: '500' }}>  {data.name}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around' }}>
                        <View style={{ marginTop: 10, width: '50%' }}>
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>QTY: </Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Proposal: </Text>
                        </View>
                      </View>
                      {
                        data.proposal.proposalpricelist.map( (optionsData, key) => {
                          return (
                            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around' }}>
                              <View style={{ marginTop: 10, width: '50%' }}>
                                <Text style={{ color: '#f8b020', fontSize: 15, fontWeight: '500' }}>{optionsData.qty}</Text>
                              </View>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ color: '#f8b020', fontSize: 15, fontWeight: '500' }}>{optionsData.price}</Text>
                              </View>
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                })
                }
              </View>
            </ScrollView>
          </ImageBackground>
    )
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
