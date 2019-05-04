import React from 'react'
import { Quote } from '@pages'
import { NavButton, NavTitle } from '@components'
import { Icons, Constants, Global } from '@common';
import { View, AsyncStorage, StyleSheet, ActivityIndicator} from 'react-native';
import * as API from '@services';
import * as Action from '@actions'


const styles = StyleSheet.create({
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

class QuoteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavTitle />,
    headerLeft: <NavButton icon={Icons.Drawer} style={{ marginLeft: 10 }} onPress={() => Global.EventEmitter.emit(Constants.EventEmitterName.OpenDrawer)} />,
  })

  constructor(props) {
    super(props);
    this.state = {
      items : [],
      loader : false
    }
  }


  willFocus = this.props.navigation.addListener(
    'willFocus',
    payload => {
      this.reload();
    }
  );
  

  componentDidMount = async () => {
    await this.reload();
    // this.setState({ loader: false });
    this.onLogin = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogin, this.onLogin)
  }


  reload = async () => {
    // this.setState({loader : true})
    var quoteId = await AsyncStorage.getItem('quoteId');
    console.log(quoteId);
    if (quoteId != null) {
      var response = await API.quoteList(quoteId);
      console.log('quoteList', response);
      this.setState({ items: response.items, loader: false  });
    } else {
      this.setState({ items: [], loader: false });
    }
    
  }

  componentWillReceiveProps() {
    this.reload();
  }

  clear = async () => {
    // this.setState({loader :true})
    await AsyncStorage.removeItem('quoteId');
    Action.ActionCreators.quoteCount(0)
    this.reload();
    // this.setState({ loader: false });
    console.log('clear')
  }


  loaderChnage = () => {
    this.setState({ loader: !this.state.loader })
  }


  onLogin = () => {
    this.props.navigation.navigate(Constants.Screen.SignIn)
  }

  render() {
    const { navigation } = this.props
    console.log('props', this.props)
    return (
      (!this.state.loader) ?
      <Quote
        items = {this.state.items}
        navigation={navigation}
        signIn={() => navigation.navisgate(Constants.Screen.SignIn)}
        showShippingAddress={() => navigation.navigate(Constants.Screen.ShippingAddress)}
        clear = {this.clear} 
        // loader = {this.state.loader}
        // loaderChange = {this.loaderChnage}
      />
      :
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
    )
  }
}

export default QuoteScreen;
