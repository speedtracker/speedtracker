import Constants from './Constants'

const getColor = (color, opacity = 1) => {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
}

const getDateRangeForPeriod = (period) => {
  const currentDate = new Date()
  const pastDate = new Date(currentDate.getTime())

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

const getVideoFrameURL = (id, time) => {
  const frame = leftPad(time / 100, 4)

  return `https://www.webpagetest.org/getfile.php?test=${id}&video=video_1&file=frame_${frame}.jpg`
}

const leftPad = (input, length, pad = '0') => {
  const inputStr = input.toString()
  const lengthDiff = length - inputStr.length

  return lengthDiff > 0 ? pad.repeat(lengthDiff) + inputStr : inputStr
}

const traverseObject = (obj, callback, path = []) => {
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
