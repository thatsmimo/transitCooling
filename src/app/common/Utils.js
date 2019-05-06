import {Linking} from 'react-native'
import Config from './Config'
import moment from 'moment'

export const getCustomAttribute = (customAttributes,attribute)=>{
  var value = null
  if (typeof customAttributes != 'undefined' && customAttributes.length > 0) {
    customAttributes.forEach((item)=>{
      if (item.attribute_code == attribute) {
        value = item.value
        return
      } else {
        return 'NO';
      }
    })
  }
  return value
}

export const getProductImageUrl = (item,attribute = "thumbnail")=>{
  const imageName = getCustomAttribute(item.custom_attributes,attribute)
  if (imageName) {
    return Config.MagentoConfig.baseUrl + "/pub/media/catalog/product/"+imageName
  }
  return "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
}

export const getCategoryImageUrl = (item)=>{
  const imageName = getCustomAttribute(item.custom_attributes,"image")
  if (imageName) {
    return Config.MagentoConfig.baseUrl + "/pub/media/catalog/category/"+imageName
  }
  return "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
}

export const openUrl = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      alert('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.log('An error occurred', err));
}

export const getCurrentPrice = (product)=>{
  let custom_attributes = product.custom_attributes
  const special_price = getCustomAttribute(product.custom_attributes,'special_price')
  const special_from_date = getCustomAttribute(product.custom_attributes,'special_from_date')
  const special_to_date = getCustomAttribute(product.custom_attributes,'special_to_date')

  if (special_price != null && special_from_date != null && special_to_date != null) {
    var date = moment();
    var startDate = moment(special_from_date)
    var endDate = moment(special_to_date)
    if (date.isBefore(endDate) && date.isAfter(startDate) || (date.isSame(startDate) || date.isSame(endDate))) {
      return special_price
    } else {
      return product.price
    }
  }
  return product.price
}
