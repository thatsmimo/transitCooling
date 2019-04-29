import { Dimensions } from 'react-native'
import Icons from './Icons'

const Constants = {
  Screen: {
    Home: 'Home',
    Deals: 'Deals',
    Search: 'Search',
    Carts: 'Carts',
    MyProfile: 'MyProfile',
    MyWishList: 'MyWishList',
    Languages: 'Languages',
    MyAddress: 'MyAddress',
    Launch: 'Launch',
    Detail: 'Detail',
    ProductsByCategory: 'ProductsByCategory',
    SetLanguage: 'SetLanguage',
    SignIn: 'SignIn',
    SignUp: 'SignUp',
    Feedback: 'Feedback',
    ShippingInfo: 'ShippingInfo',
    ShippingAddress: 'ShippingAddress',
    PaymentInfo: 'PaymentInfo',
    Quote: 'Qoute',
    AddAddress: 'AddAddress',
    MyOrders: 'MyOrders',
    SubCategory: 'SubCategory',
    Filter: 'Filter'
  },
  ScreenSize: Dimensions.get('window'),
  EventEmitterName: {
    OpenDrawer: 'OpenDrawer',
    OpenPage: 'OpenPage',
    onSearch: 'onSearch',
    onAdd: 'onAdd',
    onFilter: 'onFilter',
    onLogout: 'onLogout', 
    onLogin: 'onLogin'
  },
  Languages: [
    {
      code: 'en',
      text: 'English',
      icon: Icons.EnFlag
    },
    {
      code: 'ar',
      text: 'Arabic',
      icon: Icons.ArFlag
    }
  ],
  FontFamily: 'Oswald', //Bookerly-Regular
  Api: {
    Limit: 20
  },
  MIN_PRICE: 0,
  MAX_PRICE: 10000,
  FontSize: {
    superTiny: 9,
    tiny: 11,
    small: 13,
    medium: 15,
    big: 18,
    large: 20,
  },
}

export default Constants
