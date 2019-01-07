import { graphql, StaticQuery } from "gatsby";
import Image from "gatsby-image";
import * as React from "react";

import { rhythm } from "@df/multichannel-app-shared-web/styles/typography";

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                borderRadius: `100%`,
                marginBottom: 0,
                marginRight: rhythm(1 / 2),
                minWidth: 50,
              }}
            />
            <p>
              Blog by <strong>{author}</strong>, Technical Lead and Senior
              Developer for web, mobile and cloud apps.
              <br />
              <br /> Follow me on <br />
              <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
            </p>
          </div>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
