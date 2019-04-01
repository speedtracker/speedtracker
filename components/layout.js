import React, {Component} from 'react'
import {connect} from 'react-redux'
import Head from 'next/head'
import Header from './header'
import * as Constants from '../lib/constants'

class Layout extends Component {
  render () {
    const {children, home, state, title} = this.props
    const {apiStatus, user} = state
    const body = apiStatus !== Constants.STATUS_LOADING
      ? children
      : <p>Loading...</p>

    return (
      <>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet"/>
        </Head>

        <Header
          extended={home}
          title={title}
          user={user && user.clientId}
        />

        <main>
          {body}
        </main>

        <style jsx global>{`
          main {
            margin: 0 auto;
            max-width: var(--main-container-width);
          }
        `}</style>

        <style jsx global>{`
          html {
            --color-accent: #EA8C55;
            --color-error: #EF4223;
            --color-primary: #000000;
            --color-secondary: #FFFFFF;
            --font-family-primary: 'Roboto Condensed', 'Helvetica Neue', Arial, Helvetica, Geneva, sans-serif;
            --font-family-secondary: Helvetica, Arial, sans-serif;
            --font-size-large: 27px;
            --main-container-width: 900px;

            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          svg {
            fill: currentColor;
          }
        `}</style>

        <style jsx global>{`
          /* http://meyerweb.com/eric/tools/css/reset/ 
            v2.0 | 20110126
            License: none (public domain)
          */

          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed, 
          figure, figcaption, footer, header, hgroup, 
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }
          /* HTML5 display-role reset for older browsers */
          article, aside, details, figcaption, figure, 
          footer, header, hgroup, menu, nav, section {
            display: block;
          }
          body {
            line-height: 1;
          }
          ol, ul {
            list-style: none;
          }
          blockquote, q {
            quotes: none;
          }
          blockquote:before, blockquote:after,
          q:before, q:after {
            content: '';
            content: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }        
        `}</style>
      </>
    )    
  }
}

export default connect(state => ({state}))(Layout)
