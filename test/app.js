'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
// const path = require('path')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: require('../api'),
  config: {
    main: {
      packs: [
        require('trailpack-proxy-generics')
      ]
    },
    proxyGenerics: {
      aws: {
        adapter: require('../'),
        options: {
          aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
          aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
          aws_bucket: process.env.AWS_BUCKET
        }
      }
    }
  }
}, smokesignals.FailsafeConfig)


