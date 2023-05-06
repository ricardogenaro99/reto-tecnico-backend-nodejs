const { getDataApi, wrapFunction, createItem } = require('../utils/functions')

module.exports.handler = (event) => wrapFunction(async () => {
  const endpoint = event?.pathParameters?.endpoint?.toUpperCase()
  const data = await getDataApi(endpoint)

  const item = await createItem(JSON.stringify(data))

  return {
    status: 200,
    body: { item }
  }
})
