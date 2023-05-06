const AWS = require('aws-sdk')
const { TABLE } = require('../utils/consts')
const { wrapFunction } = require('../utils/functions')

module.exports.handler = async (event) => wrapFunction(async () => {
  const dynadoDB = new AWS.DynamoDB.DocumentClient()
  const result = await dynadoDB.scan({ TableName: TABLE.NAME }).promise()
  const response = result.Items
  return {
    status: 200,
    body: { response }
  }
})
