const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const inputPath = path.resolve(process.cwd(), 'profiles.yml')
const outputPath = path.resolve(process.cwd(), process.argv[2])

try {
  let profiles = fs.readFileSync(inputPath, 'utf8')
  let data = yaml.safeLoad(profiles)
  let normalisedData = Object.keys(data).map(slug => {
    return Object.assign({}, data[slug], {slug})
  })
  let outputData = `window.PROFILES=${JSON.stringify(normalisedData)}`

  fs.writeFileSync(outputPath, outputData)

  console.log(`Written profiles file to ${outputPath}`)
} catch (error) {
  console.log(error)
}