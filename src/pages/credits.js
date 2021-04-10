import React from 'react';
import { graphql, Link } from 'gatsby';

import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Credits({ data: { immagini: { group } }, location }) {
  const autori = group.map(
    ({ fieldValue }) => _.startCase(_.lowerCase(fieldValue)),
  );

  return (
    <Layout>
      <SEO title="Credits" />
      <div className="row">
        <div
          className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-between"
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
          <div>
            <h2>Docenti</h2>
            <p>
              Piero Francesco Pozzi
              <br />
              Chiara Rubessi
            </p>
          </div>
        </div>
        <div
          className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-between"
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
          <div>
            <h2>Social Media Managers</h2>
            <p>
              <ul className="list-unstyled">
                <li>Linda Sguario</li>
                <li>Guido Dallago</li>
              </ul>
            </p>
          </div>
          <div>
            <h2>Testi e traduzioni</h2>
            <p>
              <ul className="list-unstyled">
                <li>Linda Sguario</li>
                <li>Guido Dallago</li>
              </ul>
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div>
            <h2>Fotografie di</h2>
            <ul className="list-unstyled" id="authors-list">
              {autori.map((autore) => <li key={autore}>{autore}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`{
  immagini: allGoogleSheetImmaginiRow {
    group(field: autore) {
      fieldValue
    }
  }
}
`;

export default Credits;
