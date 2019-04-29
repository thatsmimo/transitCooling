import { Dimensions } from 'react-native'
import Icons from './Icons'
import PayPal from 'react-native-paypal-wrapper'

const Config = {
  MagentoConfig: {
    baseUrl: "https://www.transitcooling.com",
    AccessToken: "ylqjd1k9mkv2l2y51x3lh9i0i1ihahtq"
  },
  Promotions: [
    {
      image: require("../../../assets/images/banner1.jpg"),
      categoryId: 42
    },
    {
      image: require("../../../assets/images/banner1.jpg"),
      categoryId: 42
    }
    // {
    //   image: "http://hubay.net/banner3.jpg",
    //   categoryId: 41
    // },
    // {
    //   image: "http://hubay.net/banner2.jpg",
    //   categoryId: 37
    // }
  ],
  Brands: [
    {
      url: "https://www.apple.com",
      image: "https://www.hubay.net/img/apple.png"
    },
    {
      url: "https://www.hm.com",
      image: "https://www.hubay.net/img/hnm.png"
    },
    {
      url: "https://www.lego.com",
      image: "https://www.hubay.net/img/lego.png"
    },
    {
      url: "https://www.next.co.uk",
      image: "https://www.hubay.net/img/next.png"
    },
    {
      url: "https://www.samsung.com/",
      image: "https://www.hubay.net/img/saamsung.png"
    },
    {
      url: "https://www.adidas.com",
      image: "https://www.hubay.net/img/adidas.png"
    }
  ],
  PayPal: {
    Environment: PayPal.SANDBOX, //PayPal.PRODUCTION
    ClientId:
      "AQMnlPwVOrcnwowKy_Xh6DCb7sLqNxumYcsG0YiBs0IMMOLD_1I-Ve7bs729H4LQSmW723BOl-qg40ba"
  },
  OneSignalAppId: "341a03aa-c95a-45b4-b2df-5be1d09583cc",
  Currency: {
    code: "USD",
    symbol: "$"
  }
};

export default Config
