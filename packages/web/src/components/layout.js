import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
        <footer
          style={{
            marginTop: `4rem`,
            fontSize: `12px`,
          }}
        >
          Built with{' '}
          <a href="https://www.gatsbyjs.org" target="_blank">
            Gatsby
          </a>
          . Unless otherwise stated, all <abbr title="text, images, graphics, logos, audio,
          video and other content">content</abbr> is Copyright &copy; 2018 Dominic Fallows and
          licensed under the{' '}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
          >
            Creative Commons Attribution-ShareAlike 4.0 International License
          </a>
          . The software in this project is Copyright &copy; 2018 Dominic
          Fallows and made available under the{' '}
          <a
            rel="license"
            href="https://opensource.org/licenses/MIT"
            target="_blank"
          >
            MIT license
          </a>
          .
        </footer>
      </div>
    )
  }
}

export default Layout
