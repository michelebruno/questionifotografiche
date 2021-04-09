import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => {
  const { lettere } = useStaticQuery(graphql`
    query {
      lettere: allGoogleSheetLettereRow(sort: { fields: lettera, order: ASC }) {
        nodes {
          id
          lettera
          titolo
          descrizione
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Home" />
      {lettere.nodes.map(({ lettera, id, titolo }) => (
        <h3 key={id}>
          <Link to={lettera.toString()}>{titolo}</Link>
        </h3>
      ))}
    </Layout>
  );
};

export default IndexPage;
