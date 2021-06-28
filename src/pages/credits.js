import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';

import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Credits({ data: { autori: { nodes: authors } }, location }) {
  const [random, setRandom] = useState(false);
  const [autori, setAutori] = useState(() => authors.map(
    ({ autore, ...rest }) => ({
      ...rest, autore: _.startCase(_.lowerCase(autore)),
    }),
  )
    .filter(
      (item, index, self) => self.findIndex((i) => i.autore === item.autore)
        === index,
    ));

  function handleShuffle() {
    setAutori((list) => _.shuffle(list));

    return true;
  }

  function handleAlphabetical() {
    setAutori((list) => _.sortBy(list, [(i) => i.autore]));
  }

  useEffect(() => {
    if (random) {
      handleShuffle();
    } else {
      handleAlphabetical();
    }
  }, [random]);

  return (
    <Layout>
      <SEO title="Credits" />
      <div className="container py-3 py-lg-5">

        <div className="row gy-3">
          <div className="col-12 "><h1>Credits</h1></div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  gy-3 gy-lg-5 py-lg-5">
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
              <h2 className="heading-style-regular h6">Visual Identity</h2>
              <ul className="list-unstyled">
                <li>Alice Bocchio</li>
                <li>Carlotta Bacchini</li>
                <li>Federica Inzani</li>
                <li>Federico Meani</li>
                <li>Francesco Battistoni</li>
                <li>Mattia Mertens</li>
                <li>Sara Zanardi</li>
                <li>Virginia Leccisotti</li>
              </ul>

            </div>
          </div>

          <div className="col">
            <h2 className="heading-style-regular h6">Gestione contenuti e social</h2>
            <p>
              <ul className="list-unstyled">
                <li>Guido Dallago</li>
                <li>Linda Sguario</li>
              </ul>
            </p>
          </div>
          <div className="col">
            <h2 className="heading-style-regular h6">Docenti</h2>
            <p>
              Piero Francesco Pozzi
              <br />
              Chiara Rubessi
            </p>
          </div>
          <div className="col">
            <h3 className="heading-style-regular h6">Coding</h3>
            <p>Michele Bruno</p>
          </div>
          <div className="col">
            <h2 className="heading-style-regular h6">Testi e traduzioni</h2>
            <p>
              <ul className="list-unstyled">
                <li>Linda Sguario</li>
                <li>Roberta Tibaldo</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div className="container py-3 py-lg-5">
        <div className="row">
          <div className="col">
            <h2 className="">Fotografie di</h2>

            <table className="table" id="tabella-autori">
              <thead>
                <th>
                  <button className="btn btn-text pl-0" onClick={() => setRandom(false)}>A-Z</button>
                  <button className="btn btn-text" onClick={() => setRandom((r) => (r ? handleShuffle() : true))}>Casuale</button>
                </th>
                <th>
                  <button className="btn btn-text pl-0">
                    Facoltà
                  </button>
                </th>
              </thead>
              <tbody>
                {autori.map(({ autore, facolta }) => (
                  <tr key={autore}>
                    <td>{autore}</td>
                    <td>{facolta}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

    </Layout>
  );
}

export const query = graphql`{
  autori: allSheetsImmagini {
    nodes {
      facolta
      autore
    }
  }
}
`;

export default Credits;
