import Constants from './Constants'

const getColor = (color, opacity) => {
  opacity = opacity || 1

  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
}

const getDateRangeForPeriod = (period) => {
  let currentDate = new Date()
  let pastDate = new Date(currentDate.getTime())

  switch (period) {
    case 'day':
      pastDate.setDate(pastDate.getDate() - 1)

      break

    case 'week':
      pastDate.setDate(pastDate.getDate() - 7)

      break

    case 'month':
      pastDate.setMonth(pastDate.getMonth() - 1)

      break

    case 'year':
      pastDate.setFullYear(pastDate.getFullYear() - 1)

      break
  }

  return {
    from: pastDate,
    to: currentDate
  }
}

const getVideoFrameURL = (baseURL, id, frame) => {
  baseURL = baseURL || 'https://www.webpagetest.org'
  
  const filename = frame._i || `frame_${leftPad(frame._t / 100, 4)}.jpg`

  return `${baseURL}/getfile.php?test=${id}&video=video_1&file=${filename}`
}

const leftPad = (input, length, pad) => {
  pad = pad || '0'
  
  let inputStr = input.toString()
  let lengthDiff = length - inputStr.length

  if (lengthDiff > 0) {
    return pad.repeat(lengthDiff) + inputStr
  }

  return inputStr
}

const traverseObject = (obj, callback, path) => {
  path = path || []

  if ((typeof obj === 'object') && !(obj instanceof Array)) {
    Object.keys(obj).forEach(key => {
      traverseObject(obj[key], callback, path.concat(key))
    })
  } else {
    callback(obj, path)
  }
}

export {
  getColor,
  getDateRangeForPeriod,
  getVideoFrameURL,
  leftPad,
  traverseObject
}
