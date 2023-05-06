const AWS = require('aws-sdk')
const { TABLE } = require('../utils/consts')
const { wrapFunction } = require('../utils/functions')
module.exports.handler = (event) => wrapFunction(async () => {
  const { id } = event.pathParameters
  const dynadoDB = new AWS.DynamoDB.DocumentClient()

  const data = await dynadoDB
    .get({
      TableName: TABLE.NAME,
      Key: { id }
    })
    .promise()

  return {
    status: 200,
    body: { response: data.Item }
  }
})
