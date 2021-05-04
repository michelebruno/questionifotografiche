import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';

import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Credits({ data: { immagini: { group } }, location }) {
  const [autori, setAutori] = useState(group.map(
    ({ fieldValue }) => _.startCase(_.lowerCase(fieldValue)),
  ));

  return (
    <Layout>
      <SEO title="Credits" />
      <div className="container">

        <div className="row">
          {' '}
          <div className="col-12"><h1>Credits</h1></div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div
            className="col"
          >
            <div>
              <p>© 2021</p>
              <p>
                Politecnico di Milano
                <br />
                Scuola del Design
              </p>
              <p>Corso di Laurea Magistrale Design della Comunicazione </p>
              <p>Cultura dell&apos;immagine digitale</p>
            </div>
          </div>
          <div
            className="col"
          >
            <div>
              <h2>Visual Identity</h2>
              <ul className="list-unstyled">
                <li>Carlotta Bacchini</li>
                <li>Francesco Battistoni</li>
                <li>Alice Bocchio</li>
                <li>Federica Inzani</li>
                <li>Virginia Leccisotti</li>
                <li>Federico Meani</li>
                <li>Mattia Mertens</li>
                <li>Sara Zanardi</li>
              </ul>

            </div>
          </div>

          <div className="col">
            <h2>Gestione contenuti e social</h2>
            <p>
              <ul className="list-unstyled">
                <li>Linda Sguario</li>
                <li>Guido Dallago</li>
              </ul>
            </p>
          </div>
          <div className="col">
            <h2>Docenti</h2>
            <p>
              Piero Francesco Pozzi
              <br />
              Chiara Rubessi
            </p>
          </div>
          <div className="col">
            <h3>Coding</h3>
            <p>Michele Bruno</p>
          </div>
          <div className="col">
            <h2>Testi e traduzioni</h2>
            <p>
              <ul className="list-unstyled">
                <li>Linda Sguario</li>
                <li>Roberta Tibaldo</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div>
              <h2>Fotografie di</h2>

              <table className="table">
                <th>
                  <td>Casuale</td>
                </th>
                {autori.map((autore) => (
                  <tr key={autore}>
                    <td>{autore}</td>
                  </tr>
                ))}
              </table>

            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export const query = graphql`{
  immagini: allSheetsImmagini {
    group(field: autore) {
      fieldValue
    }
  }
}
`;

export default Credits;
