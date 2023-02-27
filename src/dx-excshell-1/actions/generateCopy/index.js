const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
const { Configuration, OpenAIApi } = require("openai");

// main function that will be executed by Adobe I/O Runtime
async function main (params) {

  const configuration = new Configuration({
    apiKey: params.CHAT_GPT_KEY,
  });
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('** GENERATE COPYWRITE **')
    logger.info("Prompt: " + params.prompt)

    aiPrompt = "As a JSON object, " + params.prompt
 
    const openai = new OpenAIApi(configuration);
    const openAIresponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: aiPrompt,
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    console.log("AI Response generated: " + openAIresponse.data.choices[0].text);

    const response = {
      statusCode: 200,
      body: JSON.parse(openAIresponse.data.choices[0].text)
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
