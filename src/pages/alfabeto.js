import React from 'react';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Alfabeto({ data: { lettere } }) {
  console.log(process.env.LETTERS_COUNT);
  return (
    <Layout>
      <SEO title="Home" />
      <section className="container">
        {lettere.nodes.map(({ id, titolo }, index) => (
          (process.env.NODE_ENV === 'development'
            || index < process.env.LETTERS_COUNT) && (
            <h3 key={id} className="display-4 py-2">
              <Link to={`/${_.kebabCase(titolo)}`}>{titolo}</Link>
            </h3>
          )
        ))}
      </section>
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
