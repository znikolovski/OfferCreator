const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('** CREATE OFFER **')
    logger.info("Title: " + params.title)
    logger.info("Description: " + params.description)

    offername = params.title
    offerdescription = params.description

    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params)
    const apiEndpoint =  params.AEM_AUTHOR + params.AEM_OFFER_PATH + offername
    
    cfbody = {    
          "properties": {
            "elements": {
              "headline": {
                  "value": offerdescription
              }
          },
          "contentFragment": true,
          "description": offerdescription,
          "title": offername,
          "name": offername,
          "cq:model": "/conf/frescopa/settings/dam/cfm/models/offer"
        }
    }

    const res = await fetch(apiEndpoint, {
      method: 'post',
      headers: {
          'Authorization': 'Bearer ' + token,
          'content-type': 'application/json'

      },
      body: JSON.stringify(cfbody)
    })

    if (!res.ok) {
      throw new Error('request to ' + apiEndpoint + ' failed with status code ' + res.status)
    }
    const content = await res.json();


    result = offername + ' Content Fragment created'
  
    const response = {
      statusCode: 200,
      body: result
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    
    return response

  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
