import React from 'react';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Alfabeto({ data: { lettere } }) {
  return (
    <Layout>
      <SEO title="Home" />
      <section className="container-fluid container-lg py-3 py-lg-5">
        <div className="row ">

          {lettere.nodes.map(({ id, titolo }, index) => (
            (index < process.env.LETTERS_COUNT) && (
            <div key={id} className="col-12 border-dark lettera-link">
              <h3 className="display-4 py-2 ">
                <Link to={`/${_.kebabCase(titolo)}`}>{titolo}</Link>
              </h3>
            </div>
            )
          ))}
        </div>
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
