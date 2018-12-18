const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const outputPath = process.argv[2]

let input = ''

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', chunk => {
  input += chunk
})

process.stdin.on('end', () => {
  try {
    let data = yaml.safeLoad(input)
    let normalisedData = Object.keys(data).map(slug => {
      return Object.assign({}, data[slug], {slug})
    })
    let outputData = `window.PROFILES=${JSON.stringify(normalisedData)}`

    console.log(outputData)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(error)

      process.exit(1)
    }
  }
})
