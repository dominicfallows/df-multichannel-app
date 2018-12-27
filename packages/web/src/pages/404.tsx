import * as React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

export interface NotFoundPageProps {
  location: {
    pathname: string;
  };
}

class NotFoundPage extends React.Component<NotFoundPageProps> {
  render() {
    const { location } = this.props;

    return (
      <Layout location={location} title="404 Not Found">
        <SEO title="404 Not Found" />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
      </Layout>
    );
  }
}

export default NotFoundPage;
