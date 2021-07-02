import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next';
import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

window._ = _;
function Alfabeto({ data: { lettere: letters } }) {
  const lettere = _.sortBy(letters.nodes.map(({ lettera, ...rest }) => ({ lettera: Number(lettera), ...rest })), 'lettera');

  console.log(lettere);
  return (
    <Layout>
      <SEO title="Home" />
      <section className="container-fluid container-lg py-3 py-lg-5">
        <div className="row ">

          {lettere.map(({ id, titolo }, index) => (
            (
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
        lettere: allLettereCsv(sort: { fields: lettera, order: ASC }) {
            nodes {
                id
                titolo
                lettera
                descrizione
            }
        }
    }
`;
