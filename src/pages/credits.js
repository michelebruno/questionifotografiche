import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import _ from 'lodash';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/layout';
import SEO from '../components/seo';

function startCase(string) {
  const sentence = string.toLowerCase().split(' ');
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(' ');
}

function Credits({ data: { autori: { nodes: authors } }, location }) {
  const [random, setRandom] = useState(false);
  const [autori, setAutori] = useState(() => authors.map(
    ({ autore, ...rest }) => ({
      ...rest, autore: startCase(_.toLower(autore)),
    }),
  ).filter(
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

  const { t } = useTranslation('crediti');
  return (
    <Layout>
      <SEO title="Credits" />
      <div className="container py-3 py-lg-5">

        <div className="row gy-3">
          <div className="col-12 "><h1>{t('Crediti')}</h1></div>
        </div>
        <div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-3  gy-3 gy-lg-5 py-lg-5"
        >
          <div
            className="col"
          >
            <div>
              <p>© 2021</p>
              <p>
                Politecnico di Milano
                <br />
                {t('Scuola del Design')}
              </p>
              <p>
                {t('Corso di Laurea Magistrale')}
                <br />
                {t('Design della Comunicazione')}
              </p>
              <p>{t('Cultura dell&apos;immagine digitale')}</p>
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
            <h2 className="heading-style-regular h6">
              {t('Gestione contenuti e social')}
            </h2>
            <p>
              <ul className="list-unstyled">
                <li>Carolina Inés Andrade</li>
                <li>Chiara Davoli</li>
                <li>Chiara Picozzi</li>
                <li>Eleonora Stucchi</li>
                <li>Giulia Lucia Curati</li>
                <li>Guido Dallago</li>
                <li>Linda Sguario</li>
                <li>Silvia Carpanoni</li>
              </ul>
            </p>
          </div>
          <div className="col">
            <h2 className="heading-style-regular h6">{t('Docenti')}</h2>
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
            <h2 className="heading-style-regular h6">
              {t(
                'Testi e traduzioni',
              )}
            </h2>
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
            <h2 className="">{t('Fotografie di')}</h2>

            <table className="table" id="tabella-autori">
              <thead>
                <th>
                  <button
                    className="btn btn-text pl-0"
                    onClick={() => setRandom(false)}
                  >
                    A-Z
                  </button>
                  <button
                    className="btn btn-text"
                    onClick={() => setRandom(
                      (r) => (r ? handleShuffle() : true),
                    )}
                  >
                    {t('Casuale')}
                  </button>
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
    autori: allImmaginiCsv {
        nodes {
            facolta
            autore
        }
    }
}
`;

export default Credits;
