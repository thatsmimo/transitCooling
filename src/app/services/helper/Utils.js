export const makeParams = ({ sort, page, pageSize, filter }) => {
  var index = 0
  var query = ""
  if (typeof sort != "undefined") {
    query += `searchCriteria[sortOrders][${index}][field]=${sort}&`
  }

  if (typeof page != "undefined") {
    query += `searchCriteria[currentPage]=${page}&`
  }

  if (typeof pageSize != "undefined") {
    query += `searchCriteria[pageSize]=${pageSize}&`
  }

  if (typeof filter != "undefined") {
    Object.keys(filter).forEach((key) => {
      var value = filter[key]
      var condition = null
      var subQuery = ''
      if (typeof value == "object") {
        condition = value.condition
        value = value.value
        if (condition.includes('from')) {
          var conditions = condition.split(',')
          var values = value.split(',')
          index++
          subQuery = `searchCriteria[filter_groups][${index}][filters][0][field]=${key}&`
          subQuery += `searchCriteria[filter_groups][${index}][filters][0][value]=${values[0]}&`
          subQuery += `searchCriteria[filter_groups][${index}][filters][0][condition_type]=${conditions[0]}&`
          index++
          subQuery += `searchCriteria[filter_groups][${index}][filters][0][field]=${key}&`
          subQuery += `searchCriteria[filter_groups][${index}][filters][0][value]=${values[1]}&`
          subQuery += `searchCriteria[filter_groups][${index}][filters][0][condition_type]=${conditions[1]}&`
        }
      } else {
        condition = "eq"
      }
      if (condition.includes('from')) {
        query += subQuery
      } else {
        index++
        query += `searchCriteria[filter_groups][${index}][filters][0][field]=${key}&`
        query += `searchCriteria[filter_groups][${index}][filters][0][value]=${value}&`
        query += `searchCriteria[filter_groups][${index}][filters][0][condition_type]=${condition}&`
      }
    })

  }

  return query
}
