import Api from './helper/Api'
import { Constants } from '@common'
import * as Utils from './helper/Utils'

export const getProductsByCategory = (categoryId, categoryName, page, category = null) => {
  return new Promise((resolve, reject) => {
    Api.get(`/V1/products?` + Utils.makeParams({
      page,
      pageSize: Constants.Api.Limit,
      sort: "create_at",
      filter: {
        category_id: categoryId
      }
    }), global.token)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({
            categoryId, categoryName, products: response.body.items, category
          })
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getProductsForHome = (categories) => {
  return new Promise((resolve, reject) => {
    var list = []
    var count = 0
    categories.forEach((category) => {
      getProductsByCategory(category.id, category.name, 0, category)
        .then((item) => {
          list.push(item)
          count += 1
          if (count == categories.length) {
            resolve(list)
          }
        })
        .catch((error) => {
          count += 1
          if (count == categories.length) {
            resolve(list)
          }
        })
    })
  })
}

export const searchProducts = (text, filter, page) => {
  return new Promise((resolve, reject) => {
    Api.get(`/V1/products?` + Utils.makeParams({
      page,
      pageSize: Constants.Api.Limit,
      sort: "create_at",
      filter: {
        ...filter,
        name: {
          value: `%${text}%`,
          condition: 'like'
        }
      }
    }), global.token)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({ items: response.body.items, total_count: response.body.total_count })
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}
