import React from 'react'
import { render } from 'react-dom'

import Constants from './Constants'
import Section from './Section'
import * as Utils from './Utils'

class Dashboard extends React.Component {
  render() {
    const results = this.props.results
    const timestamps = Object.keys(results)
    const lastTs = timestamps[timestamps.length - 1]
    const lastResult = results[lastTs]
    const videoFrames = (lastResult && lastResult.videoFrames) || []
    const wptUrl = this.props.profile.wptUrl
      ? (this.props.profile.wptUrl.indexOf('http') === 0 ? this.props.profile.wptUrl : null)
      : 'https://www.webpagetest.org'
    const profileUrl = this.props.profile.parameters.url

    const onClickPagespeed = function (event, data) {
      const index = data[0]._index
      const timestamp = timestamps[index]
      const result = results[timestamp]
      const encodedUrl = encodeURIComponent(profileUrl)
      const insightsUrl = `https://developers.google.com/speed/pagespeed/insights/?url=${encodedUrl}`
      const lighthouseUrl = `https://www.webpagetest.org/lighthouse.php?test=${result.id}`

      if (event.shiftKey) {
        window.open(lighthouseUrl, '_blank')
      } else {
        window.open(insightsUrl, '_blank')
      }
    }

    const onClickWpt = function (event, data) {
      if (!data.length || !wptUrl) return

      const index = data[0]._index
      const timestamp = timestamps[index]
      const result = results[timestamp]
      const testUrl = `${wptUrl}/result/${result.id}/`

      window.open(testUrl, '_blank')
    }

    return (
      <div className="u-wrapper">
        <Section {...this.props}
          id="loadTimes"
          footNote={(
            <span>Click on a data point to see the corresponding WebPageTest result</span>
          )}
          lastResult={lastResult}
          metrics={['TTFB', 'loadTime', 'fullyLoaded']}
          onClick={onClickWpt}
          title="Load times"
          yLabel="Time (seconds)"
        />

        <Section {...this.props}
          id="rendering"
          footNote={(
            <span>Click on a data point to see the corresponding WebPageTest result</span>
          )}
          lastResult={lastResult}
          onClick={onClickWpt}
          metrics={['firstPaint', 'SpeedIndex', 'visualComplete']}
          title="Rendering"
          yLabel="Time (seconds)"
        />

        <Section {...this.props}
          id="pagespeed"
          footNote={(
            <span>Click on a data point to see the Google PageSpeed report. Shift+Click to see the Lighthouse report.<br/>Not all WebPageTest locations support Lighthouse - <a href="https://speedtracker.org/blog/using-lighthouse">click here</a> to learn more.</span>
          )}
          lastResult={lastResult}
          maxValue={100}
          metrics={['pagespeed', 'lighthouse']}
          onClick={onClickPagespeed}
          title="Google PageSpeed and Lighthouse"
          yLabel="Score (0-100)"
        />

        <Section {...this.props}
          id="contentBreakdownBytes"
          footNote={(
            <span>Click on a data point to see the corresponding WebPageTest result</span>
          )}
          lastResult={lastResult}
          onClick={onClickWpt}
          metrics={[
            'breakdown.html.bytes',
            'breakdown.js.bytes',
            'breakdown.css.bytes',
            'breakdown.image.bytes',
            'breakdown.flash.bytes',
            'breakdown.font.bytes',
            'breakdown.other.bytes'
          ]}
          title="Content breakdown (size)"
          yLabel="Traffic (kilobytes)"
        />

        <Section {...this.props}
          id="contentBreakdownRequests"
          footNote={(
            <span>Click on a data point to see the corresponding WebPageTest result</span>
          )}
          lastResult={lastResult}
          onClick={onClickWpt}
          metrics={[
            'breakdown.html.requests',
            'breakdown.js.requests',
            'breakdown.css.requests',
            'breakdown.image.requests',
            'breakdown.flash.requests',
            'breakdown.font.requests',
            'breakdown.other.requests'
          ]}
          title="Content breakdown (requests)"
          yLabel="Requests"
        />
        
        {videoFrames.length && wptUrl &&
          <div className="c-Section">
            <h3 className="c-Section__title">Latest filmstrip view</h3>
            <div className="c-Filmstrip">
              {videoFrames.map((frame, index) => {
                const progress = `${frame._t / 1000}s`

                return (
                  <div key={index} className="c-Filmstrip__item">
                    <p className="c-Filmstrip__progress">{progress} ({frame._vc}%)</p>
                    <img className="c-Filmstrip__image" src={Utils.getVideoFrameURL(wptUrl, lastResult.id, frame)}/>
                  </div>
                )
              })}
            </div>
          </div>}
      </div>
    )
  }
}

export default Dashboard
