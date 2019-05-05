import React, { Component } from 'react'
import { ImageBackground, ScrollView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '@actions';
import { bindActionCreators } from 'redux';
import * as API from '@services';


class QuoteListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items : [],
      loader : true,
    }
  }

  async componentDidMount() {
    
    var response = await API.myProfileQuoteList(this.props.customerInfo.id);
    this.setState({ loader: false, items: response.items});
  }

  render() {
    return (
      (this.state.loader) ?
        <View style={[style.container, style.horizontal]}>
          <ActivityIndicator size="large" color='#f8b020' />
        </View>
        :
        <ImageBackground style={{ flex: 1 }} source={require('../../../../assets/images/main_bg.png')}>
          <Text style={{margin:15,fontSize:28,color:'#f8b020'}}>My Qoutes</Text>
          <ScrollView style={{flex:1}} >
            { this.state.items.map( (item,key) => {
              return (
                <View key={key} style={{ flexDirection: 'row', color: '#fff', marginHorizontal: 10, borderColor: '#fff', marginTop: 10, borderWidth: 1 }}>
                  <View style={{}}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                      <Text style={{ color: '#f8b020', fontSize: 18 }}>Id #:  </Text><Text style={{ color: '#fff', fontSize: 18 }}>{item.quote_id}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                      <Text style={{ color: '#f8b020', fontSize: 18 }}>Created Date:  </Text><Text style={{ color: '#fff', fontSize: 18 }}>{item.quote_date.substring(0,10)}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                      <Text style={{ color: '#f8b020', fontSize: 18 }}>Status:  </Text><Text style={{ color: '#fff', fontSize: 18, borderWidth: 1, padding:3, borderColor:'#f8b020' }}>{item.status}</Text>
                    </View>
                  </View>
                  <View style={{ position: "absolute", right: 15, top: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('QuoteView', { quoteviewId: item.quoteview_id})}>
                      <Text style={{ borderWidth: 1, padding: 7, borderColor: '#f8b020', color: '#fff', fontSize: 20 }}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
            }
            <View style={{marginBottom:40}}></View>
          </ScrollView>
        </ImageBackground>
    )
  }
}



function mapStateToProps({ authReducers }) {
  return {
    customerInfo: authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteListScreen)

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