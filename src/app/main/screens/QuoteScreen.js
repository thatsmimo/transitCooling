import React from 'react'
import { Quote } from '@pages'
import { NavButton, NavTitle, TabBarItem } from '@components'
import { Icons, Constants, Global } from '@common';
import { View, AsyncStorage} from 'react-native';
import * as API from '@services';

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


  

  componentDidMount = async () => {
    this.reload();
    this.onLogin = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogin, this.onLogin)
  }


  reload = async () => {
    var quoteId = await AsyncStorage.getItem('quoteId');
    console.log(quoteId);
    if (quoteId != '') {
      var response = await API.quoteList(quoteId);
      console.log('quoteList', response);
      this.setState({ items: response.items })
    }
  }

  componentWillReceiveProps() {
    this.reload();
  }

  clear = () => {
    console.log('clear')
  }


  componentWillUnmount = () => {
    this.onLogin.remove()
  }

  onLogin = () => {
    this.props.navigation.navigate(Constants.Screen.SignIn)
  }

  render() {
    const { navigation } = this.props
    return <Quote
      items = {this.state.items}
      navigation={navigation}
      signIn={() => navigation.navigate(Constants.Screen.SignIn)}
      showShippingAddress={() => navigation.navigate(Constants.Screen.ShippingAddress)}
      
      clear = {this.clear} 
      loader = {this.state.loader}
      />
  }
}

export default QuoteScreen;
