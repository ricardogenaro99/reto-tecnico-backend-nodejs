const { API, LAMBDA } = require('../utils/consts')
const { wrapFunction } = require('../utils/functions')

module.exports.handler = (event) => wrapFunction(async () => {
  const awsApisGetDataByEndpoint = Object.keys(API).reduce((accumulator, current) => {
    const endpoint = (current === 'BASE_URL' ? '' : current).toLowerCase()
    const newKey = (endpoint.toUpperCase() || 'BASIC') + '_RANDOM_DATA'
    accumulator[newKey] = `${LAMBDA.BASE_URL}/dataByEndpoint/${endpoint}`
    return accumulator
  }, {})

  return {
    status: 200,
    body: { response: awsApisGetDataByEndpoint }
  }
})
