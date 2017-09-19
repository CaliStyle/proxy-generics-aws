'use strict'
/* global describe, it */
const assert = require('assert')
const path = require('path')
const fs = require('fs')

describe('Generic AWS', () => {
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
    console.log('USING AUTH FILE:', Aws.options.key_filename)
  })

  it('should upload a buffer', (done) => {

    fs.readFile(path.resolve(__dirname, '../../static/test.jpg'), function (err, data) {
      if (err) {
        console.error(err)
      }
      else {
        DataStoreGenericService.upload({
          mimetype: 'image/jpg',
          originalname: 'test.jpg',
          buffer: data
        }, Aws)
          .then(image => {
            assert.equal(image.status, 'success')
            assert.ok(image.url)
            done()
          })
          .catch(err => {
            done(err)
          })
      }
    })
  })
  it('should upload a file', (done) => {
    DataStoreGenericService.uploadFile({
      src: path.resolve(__dirname, '../../static/test.jpg'),
      url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
    }, Aws)
      .then(file => {
        assert.equal(file.status, 'success')
        assert.equal(file.url, `https://storage.googleapis.com/${Aws.options.bucket}/test.jpg`)
        assert.ok(file.file_details)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should upload files', (done) => {
    DataStoreGenericService.uploadFiles([{
      src: path.resolve(__dirname, '../../static/test.jpg'),
      url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
    }], Aws)
      .then(files => {
        assert.equal(files.length, 1)
        assert.equal(files[0].url, `https://storage.googleapis.com/${Aws.options.bucket}/test.jpg`)
        assert.ok(files[0].file_details)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
