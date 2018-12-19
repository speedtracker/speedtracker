import {render} from 'react-dom' // eslint-disable-line no-unused-vars
import * as Utils from './../lib/Utils'
import DataSection from './DataSection.jsx'
import Filmstrip from './Filmstrip.jsx'
import React from 'react'
import Section from './Section.jsx'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 900px;
  margin-left: auto !important;
  margin-right: auto !important;
`

class Dashboard extends React.Component {
  render () {
    const {state} = this.props
    const {
      activeProfile,
      period,
      results
    } = state
    const lastResult = results.slice(-1)[0]
    const videoFrames = (lastResult && lastResult.videoFrames) || []
    const wptUrl = activeProfile.wptUrl
      ? (activeProfile.wptUrl.indexOf('http') === 0 ? activeProfile.wptUrl : null)
      : 'https://www.webpagetest.org'
    const profileUrl = activeProfile.parameters.url

    const onClickLighthouse = function (event, data) {
      const index = data[0]._index
      const timestamp = results[index].timestamp
      const encodedUrl = encodeURIComponent(profileUrl)
      const lighthouseUrl = `https://www.webpagetest.org/lighthouse.php?test=${results[index].id}`

      window.open(lighthouseUrl, '_blank')
    }

    const onClickWpt = function (event, data) {
      if (!data.length || !wptUrl) return

      const index = data[0]._index
      const result = results[index].timestamp
      const testUrl = `${wptUrl}/result/${result.id}/`

      window.open(testUrl, '_blank')
    }

    return (
      <Wrapper>
        <Section title='Load times'>
          <DataSection
            id='loadTimes'
            footNote={(
              <span>Click on a data point to see the corresponding WebPageTest result</span>
            )}
            metrics={['TTFB', 'loadTime', 'fullyLoaded']}
            onClick={onClickWpt}
            state={state}
            yLabel='Time (seconds)'
          />
        </Section>

        <Section title='Rendering'>
          <DataSection
            id='rendering'
            footNote={(
              <span>Click on a data point to see the corresponding WebPageTest result</span>
            )}
            metrics={['firstPaint', 'SpeedIndex', 'visualComplete']}
            onClick={onClickWpt}
            state={state}
            yLabel='Time (seconds)'
          />
        </Section>

        <Section title='Google Lighthouse'>
          <DataSection
            id='pagespeed'
            footNote={(
              <span>Click on a data point to see the the Lighthouse report.<br />Not all WebPageTest locations support Lighthouse - <a href='https://speedtracker.org/blog/using-lighthouse'>click here</a> to learn more.</span>
            )}
            maxValue={100}
            metrics={['lighthouse']}
            onClick={onClickLighthouse}
            state={state}
            yLabel='Score (0-100)'
          />
        </Section>

        <Section title='Content breakdown (size)'>
          <DataSection
            id='contentBreakdownBytes'
            footNote={(
              <span>Click on a data point to see the corresponding WebPageTest result</span>
            )}
            metrics={[
              'breakdownHtmlBytes',
              'breakdownJsBytes',
              'breakdownCssBytes',
              'breakdownImageBytes',
              'breakdownFlashBytes',
              'breakdownFontBytes',
              'breakdownOtherBytes'
            ]}
            onClick={onClickWpt}
            state={state}
            yLabel='Traffic (kilobytes)'
          />
        </Section>

        <Section title='Content breakdown (requests)'>
          <DataSection
            id='contentBreakdownRequests'
            footNote={(
              <span>Click on a data point to see the corresponding WebPageTest result</span>
            )}
            metrics={[
              'breakdownHtmlRequests',
              'breakdownJsRequests',
              'breakdownCssRequests',
              'breakdownImageRequests',
              'breakdownFlashRequests',
              'breakdownFontRequests',
              'breakdownOtherRequests'
            ]}
            onClick={onClickWpt}
            state={state}
            yLabel='Requests'
          />
        </Section>

        {(videoFrames.length > 0) && wptUrl &&
          <Section title='Latest filmstrip view'>
            <Filmstrip
              frames={videoFrames}
              testId={lastResult.id}
              wptUrl={wptUrl}
            />
          </Section>}
      </Wrapper>
    )
  }
}

export default Dashboard
