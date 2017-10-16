export default {
  metrics: {
    breakdown: {
      html: {
        bytes: {
          color: [115, 210, 222],
          name: 'HTML',
          transform: (value) => (value / 1000).toFixed(1),
          unit: 'KB'
        },
        requests: {
          color: [115, 210, 222],
          name: 'HTML'
        }
      },
      js: {
        bytes: {
          color: [251, 177, 60],
          name: 'JS',
          transform: (value) => (value / 1000).toFixed(1),
          unit: 'KB'
        },
        requests: {
          color: [251, 177, 60],
          name: 'JS'
        }
      },
      css: {
        bytes: {
          color: [33, 131, 128],
          name: 'CSS',
          transform: (value) => (value / 1000).toFixed(1),
          unit: 'KB'
        },
        requests: {
          color: [33, 131, 128],
          name: 'CSS'
        }
      },
      image: {
        bytes: {
          color: [143, 45, 86],
          name: 'Images',
          transform: (value) => (value / 1000).toFixed(1),
          unit: 'KB'
        },
        requests: {
          color: [143, 45, 86],
          name: 'Images'
        }
      },
      flash: {
        bytes: {
          color: [33, 41, 92],
          name: 'Flash',
          transform: (value) => (value / 1000).toFixed(1),
          unit: 'KB'
        },
        requests: {
          color: [33, 41, 92],
          name: 'Flash'
        }
      },
      font: {
        bytes: {
          color: [216, 17, 89],
          name: 'Fonts',
          transform: (value) => (value / 1000).toFixed(1),
          unit: 'KB'
        },
        requests: {
          color: [216, 17, 89],
          name: 'Fonts'
        }
      },
      other: {
        bytes: {
          color: [231, 143, 142],
          name: 'Other',
          transform: (value) => (value / 1000).toFixed(1),
          unit: 'KB'
        },
        requests: {
          color: [231, 143, 142],
          name: 'Other'
        }
      }
    },
    loadTime: {
      color: [195, 125, 146],
      name: 'Load time',
      transform: (value) => (value / 1000).toFixed(2),
      unit: 's',
      description: 'The time between the initial request and the browser load event'
    },
    firstPaint: {
      color: [173, 138, 100],
      name: 'Start render',
      transform: (value) => (value / 1000).toFixed(2),
      unit: 's',
      description: 'The time until the browser starts painting content to the screen'
    },
    fullyLoaded: {
      color: [3, 181, 170],
      name: 'Fully loaded',
      transform: (value) => (value / 1000).toFixed(2),
      unit: 's',
      description: 'The time at which the page has fully finished loading content'
    },
    SpeedIndex: {
      color: [87, 117, 144],
      name: 'SpeedIndex',
      transform: (value) => (value / 1000).toFixed(2),
      unit: 's',
      description: 'A custom metric introduced by WebPageTest to rate pages based on how quickly they are visually populated'
    },
    TTFB: {
      color: [80, 48, 71],
      name: 'Back-end',
      transform: (value) => (value / 1000).toFixed(2),
      unit: 's',
      description: 'The time it takes for the server to respond with the first byte of the response'
    },
    visualComplete: {
      color: [243, 202, 64],
      name: 'Visually complete',
      transform: (value) => (value / 1000).toFixed(2),
      unit: 's',
      description: 'The time it takes for the page to be fully visually populated'
    },
    pagespeed: {
      color: [51, 103, 214],
      name: 'PageSpeed score',
      unit: '',
      description: 'A custom metric defined by Google PageSpeed Insights'
    },
    lighthouse: {
      color: [121, 180, 115],
      name: 'Lighthouse PWA score',
      unit: '',
      description: 'A Progressive Web App (PWA) score defined by Google Lighthouse'
    }
  },

  periods: [
    'day',
    'week',
    'month',
    'year'
  ]
}
