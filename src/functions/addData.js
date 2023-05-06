const { createItem, wrapFunction, translateKeys } = require('../utils/functions')

module.exports.handler = (event) => wrapFunction(async () => {
  const body = JSON.parse(event.body)
  const bodyES = await translateKeys(body)

  const response = await createItem(JSON.stringify(bodyES))

  return {
    status: 200,
    body: { response }
  }
})
