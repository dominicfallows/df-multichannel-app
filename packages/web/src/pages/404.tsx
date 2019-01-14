import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import SEO from "../components/SEO";
import Layout from "../containers/Layout";

export interface NotFoundPageProps {
  location: {
    pathname: string;
  };
}

class NotFoundPage extends React.Component<NotFoundPageProps> {
  render() {
    const { location } = this.props;

    return (
      <Layout location={location}>
        <SEO
          title="404 Not Found"
          meta={[{ name: "robots", content: "noindex" }]}
        />
        <h1>Not Found</h1>
        <p>
          Sorry, that page doesn't exist. Go to{" "}
          <Link to="/" title="Home" type="primary">
            homepage
          </Link>
          .
        </p>
      </Layout>
    );
  }
}

export default NotFoundPage;