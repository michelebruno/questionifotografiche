import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Alfabeto({ data: { lettere } }) {
  return (
    <Layout containerClass="container">
      <SEO title="Home" />
      {lettere.nodes.map(({ lettera, id, titolo }) => (
        <h3 key={id}>
          <Link to={_.kebabCase(titolo)}>{titolo}</Link>
        </h3>
      ))}
    </Layout>
  );
}

export default Alfabeto;

export const query = graphql`
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
  `;
