import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import _ from 'lodash';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
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
        <div className="row ">
          <div className="col-12 "><h1>{t('About')}</h1></div>
        </div>
        <div className="row">
          <div className="col-12 py-5 ">
            <p className="">
              <Trans t={t} i18nKey="progetto.scopodellequestioni">
                Scopo delle singole
                {' '}
                <i>questioni fotografiche</i>
                {' '}
                è prendere
                confidenza con uno strumento come quello della fotocamera o
                smartphone ma, soprattutto, innescare una riflessione sui
                diversi luoghi, più o meno grandi, sulla loro funzione,
                imparando ad
                {' '}
                <i>ascoltare</i>
                {' '}
                le storie (storie fatte di progetti,
                emozioni, ricordi ed affezioni) che attendono di essere colte e
                narrate visivamente come ebbe a dire Luigi Ghirri
                nell’intervento Una luce sul muro del 1993:
              </Trans>
            </p>
            <p className="ms-5">
              <Trans t={t} i18nKey="progetto.citazione">
                “(…) solo gli abitanti riconoscono ai luoghi una loro
                particolarità e un carattere preciso, al quale non rinunciano (…)
                li guardano come se leggessero il palmo della loro mano, sapendo
                che per scoprire qualcosa bisogna farlo con estrema attenzione,
                perché, oltre alle linee principali che sono nette e chiare, ce ne
                sono tante altre, piccolissime che le intersecano e che,
                nell’insieme, ne determinano l’unicità.”
              </Trans>
            </p>
            <p className="">
              <Trans t={t} i18nKey="progetto.interessanteriprendere">
                Inoltre, è molto interessante riprendere la storia del testo di
                {' '}
                <i>Voyage autour de ma chambre</i>
                , intrigante racconto della scoperta
                delle infinite fantasie e dei possibili viaggi che si possono
                immaginare senza uscire dai confini della propria stanza.
              </Trans>
            </p>
          </div>
        </div>
        <div className="row gy-3">
          <div className="col-12 "><h2>{t('Crediti')}</h2></div>
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
                <li>Guido Dallago</li>
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

        autori: allImmaginiCsv {
            nodes {
                facolta
                autore
            }
        }
    }
`;

export default Credits;
