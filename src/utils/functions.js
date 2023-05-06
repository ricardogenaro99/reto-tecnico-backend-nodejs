const axios = require('axios')
const AWS = require('aws-sdk')
const { API, TABLE } = require('./consts')
const { v4: uuid } = require('uuid')

/**
 * Creates a new item in the DynamoDB table with the provided data.
 * @async
 * @function createItem
 * @param {string} body - The data for the new item.
 * @returns {Promise<Object>} The created item.
 * @throws {Error} An error occurred while interacting with AWS services.
 */
const createItem = async (body) => {
  const dynadoDB = new AWS.DynamoDB.DocumentClient()
  const data = JSON.parse(body)
  const now = new Date().toISOString()
  const item = {
    id: uuid(),
    data,
    createAt: now,
    updateAt: now
  }
  await dynadoDB
    .put({
      TableName: TABLE.NAME,
      Item: item
    })
    .promise()

  return item
}

/**
 * Retrieves a random API endpoint from the API object.
 * @function getRamdomApi
 * @returns {string} A random API endpoint.
 */
const getRamdomApi = () => {
  const arrApiKeys = Object.keys(API)
  const randomApi = arrApiKeys.at(
    Math.floor(Math.random() * arrApiKeys.length)
  )
  if (randomApi === 'BASE_URL') {
    return getRamdomApi()
  }
  return API[randomApi]
}

/**
 * Retrieves a random data object from the provided API endpoint.
 * @async
 * @function getDataApiRandom
 * @param {Object} api - The API object containing the endpoint's URL and max number of pages.
 * @returns {Promise<Object>} The retrieved data object.
 * @throws {Error} An error occurred while interacting with the API or AWS services.
 */
const getDataApiRandom = async (api) => {
  const urls = new Array(api.MAX_PAGES)
    .fill(`${api.URL}/?page=`)
    .map((url, index) => `${url}${index + 1}`)
  const response = await Promise.all(
    urls.map(async (url) => await axios.get(url))
  )

  let results = response.map((item) => item.data?.results || item.data)
  results = results.flat()

  const data = results.at(Math.floor(Math.random() * results.length))

  return data
}

/**
 * Translates the keys of an object using the AWS Translate service.
 * @async
 * @function translateKeys
 * @param {Object} obj - The object to translate the keys of.
 * @returns {Promise<Object>} The translated object.
 * @throws {Error} An error occurred while interacting with AWS services.
 */
const translateKeys = async (obj) => {
  const dataES = await Object.entries(obj).reduce(
    async (renamedObjPromise, [oldKey, value]) => {
      const renamedObj = await renamedObjPromise
      let newKey = await awsTranslate(oldKey)
      newKey = newKey
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replaceAll(' ', '_')
      renamedObj[newKey] = value
      return renamedObj
    },
    Promise.resolve({})
  )

  return dataES
}

/**
 * Retrieves data from the provided API endpoint or a random endpoint if none is provided,
 * and translates the keys of the resulting object to Spanish using the AWS Translate service.
 * @async
 * @function getDataApi
 * @param {string} [endpoint] - The API endpoint to retrieve data from.
 * @returns {Promise<Object>} The retrieved and translated data object.
 */
const getDataApi = async (endpoint) => {
  let api = API[endpoint]
  if (!endpoint) api = getRamdomApi()
  if (!api) throw new Error('Endpoint not found')

  let data = await getDataApiRandom(api)
  data = await translateKeys(data)

  return data
}

/**
 * Translates the input text using the AWS Translate service.
 * @param {string} text - The text to be translated.
 * @param {string} source - The language code of the source text. Defaults to 'auto'.
 * @param {string} target - The language code of the target language. Defaults to 'es'.
 * @returns {Promise<string>} - A promise that resolves to the translated text.
 */
const awsTranslate = async (text, source = 'auto', target = 'es') => {
  const translate = new AWS.Translate()
  const params = {
    SourceLanguageCode: source,
    TargetLanguageCode: target,
    Text: text
  }
  const res = await translate.translateText(params).promise()
  return res.TranslatedText
}

/**
 * Wraps an async callback function in a try-catch block to handle errors.
 * @param {Function} callback - An async callback function to be wrapped.
 * @returns {Promise} - A promise that resolves to the return value of the callback function if successful, or an object containing an error message if an error occurs.
 */
const wrapFunction = async (callback) => {
  try {
    return await callback()
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: error.message }
    }
  }
}

module.exports = { createItem, getDataApi, translateKeys, wrapFunction }
