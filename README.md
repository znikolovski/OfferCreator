# Offer Creator for Adobe Experience Cloud

This sample app built with Adobe App Builder calls on APIs from Adobe Experience Cloud to create offers. It will list Content Fragments from AEM, and allow the user to create them. 

## Setup

- Populate the `.env` file in the project root and fill it as shown [below](#env)

## Local Dev

- `aio app run` to start your local Dev server
- App will run on `localhost:9080` by default

By default the UI will be served locally but actions will be deployed and served from Adobe I/O Runtime. To start a
local serverless stack and also run your actions locally use the `aio app run --local` option.

## Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app

## Config

### `.env`

You can generate this file using the command `aio app use`. 

```bash
# This file must **not** be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
# AEM_AUTHOR="https://author-p55117-e571178.adobeaemcloud.com"
# AEM_OFFER_ENDPOINT="/api/assets/frescopa/en/offers.json"
# AEM_OFFER_PATH="/api/assets/frescopa/en/offers/"
# AEM_STOCK_ENDPOINT="/api/assets/frescopa/en/stock.json"

```
