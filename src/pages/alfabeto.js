import React from 'react';
import { graphql } from 'gatsby';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import sortBy from 'lodash/sortBy';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Alfabeto({ data: { lettere: letters } }) {
  const lettere = sortBy(letters.nodes.map(
    ({ lettera, ...rest }) => ({ lettera: Number(lettera), ...rest }),
  ),
  'lettera');

  const { language } = useI18next();

  const isEnglish = language === 'en';

  return (
    <Layout>
      <SEO title="Home" />
      <section className="container-fluid container-lg pt-3 py-lg-5" style={{ marginBottom: '-1rem' }}>
        <div className="row ">

          {lettere.map(({ id, titolo, title }) => (
            (
              <div key={id} className="col-12 border-dark lettera-link">
                <h3 className="display-4 py-2 ">
                  <Link to={`/${kebabCase(titolo)}`}>{isEnglish ? title : titolo}</Link>
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

    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    data
                    ns
                    language
                }
            }
        }
        lettere: allSheetsLettere(sort: { fields: lettera, order: ASC }) {
            nodes {
                id
                titolo
                title 
                lettera
                descrizione
            }
        }
    }
`;
