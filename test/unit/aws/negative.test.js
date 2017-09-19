'use strict'
/* global describe, it */
const assert = require('assert')
describe('Negative Generic AWS', () => {
  let DataStoreGenericService
  let Aws
  before((done) => {
    DataStoreGenericService = global.app.services.DataStoreGenericService
    Aws = global.app.config.proxyGenerics.aws
    done()
  })

  it('should exist', () => {
    assert(DataStoreGenericService)
    assert(Aws)
  })

})
