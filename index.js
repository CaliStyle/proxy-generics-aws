/* eslint no-console: [0] */
/* eslint new-cap: [0] */
'use strict'

const AWS = require('aws-sdk')
// const file = require('fs')
module.exports = class ProxyGenericsAws {
  constructor(options) {
    this.options = options
  }

  /**
   * Create Gcloud Instance
   * @returns {*} Gcloud Instance
   */
  storage() {
    AWS.Config({
      accessKeyId: this.options.aws_access_key_id,
      secretAccessKey: this.options.aws_secret_access_key
    })
    return new AWS.S3()
  }

  /**
   *
   * @param filename
   * @returns {string}
   */
  getPublicUrl (filename) {
    return `https://storage.googleapis.com/${this.options.aws_bucket}/${filename}`
  }

  /**
   *
   * @param buffer
   * @returns {Promise.<{status: string, url: string}>}
   */
  upload(reqFile) {
    const bucket = this.storage().bucket(this.options.aws_bucket)
    const name = `${Date.now()}_${reqFile.originalname}`
    return new Promise((resolve, reject) => {
      bucket
        .file(name)
        .createWriteStream({
          metadata: {
            contentType: reqFile.mimetype
          }
        })
        .on('error', (err) => {
          return resolve({
            status: 'failure',
            failure_message: err.toString()
          })
        })
        .on('finish', () => {
          return resolve({
            status: 'success',
            url: this.getPublicUrl(name)
          })
        })
        .end(reqFile.buffer)
    })
  }

  /**
   *
   * @param file
   * @returns {Promise.<{status: string, url: string}>}
   */
  uploadFile(file) {
    const bucket = this.storage().bucket(this.options.aws_bucket)
    return new Promise((resolve, reject) => {
      bucket.upload(file.src, (err, resFile) => {
        if (err) {
          console.log(err)
          return resolve({
            url: file.url,
            status: 'failure',
            failure_message: err.toString()
          })
        }
        const proxySchema = {
          status: 'success',
          url: this.getPublicUrl(resFile.id),
          file_details: resFile
        }
        return resolve(proxySchema)
      })
    })
  }

  /**
   *
   * @param files
   * @returns {Promise.<Array>}
   */
  uploadFiles(files) {
    return Promise.all(files.map(file => {
      return this.uploadFile(file)
    }))
  }
}

