import React from 'react';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Alfabeto({ data: { lettere } }) {
  console.log(process.env.LETTERS_COUNT);
  return (
    <Layout containerClass="container">
      <SEO title="Home" />
      {lettere.nodes.map(({ id, titolo }, index) => (
        (process.env.NODE_ENV === 'development'
          || index < process.env.LETTERS_COUNT) && (
          <h3 key={id}>
            <Link to={`/${_.kebabCase(titolo)}`}>{titolo}</Link>
          </h3>
        )
      ))}
    </Layout>
  );
}

export default Alfabeto;

export const query = graphql`
    query {
      lettere: allSheetsLettere(sort: { fields: lettera, order: ASC }) {
        nodes {
          id
          titolo
          descrizione
        }
      }
    }
  `;
