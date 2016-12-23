import { h, render, Component } from 'preact';

import Constants from './Constants'
import Section from './Section'
import * as Utils from './Utils'

class Dashboard extends Component {
  render() {
    const results = this.props.results
    const timestamps = Object.keys(results)
    const lastTs = timestamps[timestamps.length - 1]
    const lastResult = results[lastTs]
    const videoFrames = (lastResult && lastResult.videoFrames) || []

    return (
      <div className="u-wrapper">
        <Section {...this.props}
                 id="loadTimes"
                 lastResult={lastResult}
                 metrics={['TTFB', 'loadTime', 'fullyLoaded']}
                 title="Load times"
                 yLabel="Time (seconds)" />

        <Section {...this.props}
                 id="rendering"
                 lastResult={lastResult}
                 metrics={['firstPaint', 'SpeedIndex', 'visualComplete']}
                 title="Rendering"
                 yLabel="Time (seconds)" />

        <Section {...this.props}
                 id="contentBreakdownBytes"
                 lastResult={lastResult}
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
                 yLabel="Traffic (kilobytes)" />

        <Section {...this.props}
                 id="contentBreakdownRequests"
                 lastResult={lastResult}
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
                 yLabel="Requests" />

        {videoFrames.length ?
          <div className="c-Section">
            <h3 className="c-Section__title">Latest filmstrip view</h3>
            <div className="c-Filmstrip">
              {videoFrames.map((frame, index) => {
                const progress = `${frame._t / 1000}s`

                return (
                  <div key={index} className="c-Filmstrip__item">
                    <p className="c-Filmstrip__progress">{progress} ({frame._vc}%)</p>
                    <img className="c-Filmstrip__image" src={Utils.getVideoFrameURL(lastResult.id, frame._t)} />
                  </div>
                )
              })}
            </div>
          </div> : null}
      </div>
    )
  }
}

export default Dashboard
