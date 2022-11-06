const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('** COPY & RENAME EXPERIENCE FRAGMENT **')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params)
    const apiEndpoint = params.AEM_AUTHOR + params.AEM_OFFER_ENDPOINT;

    xfName = "foo";
   
    //START Copy JCR Node
    const copyNodeEndpoint =  params.AEM_AUTHOR + params.AEM_XF_SOURCE_PATH;
    const postParams = new URLSearchParams();
    postParams.append(':operation', 'copy');
    postParams.append(':dest', params.AEM_XF_DESTINATION_PATH + xfName);

    const res = await fetch(copyNodeEndpoint, {
      method: 'post',
      headers: {
          'Authorization': 'Bearer ' + token,
          'content-type': 'application/json'

      },
      body: postParams
    })

    if (!res.ok) {
      throw new Error('request to ' + copyNodeEndpoint + ' failed with status code ' + res.status)
    }
    const content = await res.json();
    //END Copy JCR Node

  
    const response = {
      statusCode: 200,
      body: content
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
