import Api from './helper/Api'
import { Constants } from '@common'


export const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    Api.get("/V1/categories/" + id, global.token)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    Api.get("/V1/categories", global.token)
      .then((response) => {
        if (response.statusCode == 200) {
          var list = []
          var count = 0
          const categories = response.body.children_data
          categories.forEach((item) => {
            getCategoryById(item.id)
              .then((category) => {
                category.product_count = item.product_count
                category.subCategories = item.children_data.filter((categoryItem) => {
                  return categoryItem.product_count > 0
                })
                if (category.product_count > 0) {
                  list.push(category)
                }
                count += 1
                if (count == categories.length) {
                  resolve(list)
                }

              })
              .catch((err) => {
                count += 1
                if (count == categories.length) {
                  resolve(list)
                }
              })
          })

        } else {
          reject(response.body.message)
        }
      })
      .catch(reject => console.log(reject))
  })
}
