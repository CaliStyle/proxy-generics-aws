# proxy-generics-aws

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Proxy Generic for AWS.

Looking for [Proxy Engine?](https://github.com/calistyle/trailpack-proxy-engine)
Looking for [Proxy Generics?](https://github.com/calistyle/trailpack-proxy-generics)

## Install

```sh
$ npm install --save proxy-generics-aws
```

## Configure

```js
// config/proxyGenerics.js
module.exports = {
  // make the key aws, alternatively make the key data_store_provider to be the default data store provider  
  aws: {
      adapter: require('proxy-generic-aws'),
      options: {
          aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
          aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
          aws_bucket: process.env.AWS_BUCKET
      }
  }
}
```

[npm-image]: https://img.shields.io/npm/v/proxy-generics-aws.svg?style=flat-square
[npm-url]: https://npmjs.org/package/proxy-generics-aws
[ci-image]: https://img.shields.io/circleci/project/github/CaliStyle/proxy-generics-aws/master.svg
[ci-url]: https://circleci.com/gh/CaliStyle/proxy-generics-aws/tree/master
[daviddm-image]: http://img.shields.io/david//trailpack-proxy-generics-aws.svg?style=flat-square
[daviddm-url]: https://david-dm.org/CaliStyle/proxy-generics-aws
[codeclimate-image]: https://img.shields.io/codeclimate/github/CaliStyle/proxy-generics-aws.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/CaliStyle/proxy-generics-aws

