/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { graphql } from 'gatsby';
import SwiperCore, {
  Keyboard, Mousewheel, Navigation, Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import shuffle from 'lodash/shuffle';
import Layout from './layout';
import SEO from './seo';
import Image from './image';

SwiperCore.use([Mousewheel, Keyboard, Pagination, Navigation]);

export default function Lettera({
  data: { pagina, ...data },
  pageContext: { lettera },
}) {
  const { t } = useTranslation();
  const { language } = useI18next();

  const immagini = useMemo(() => shuffle(data.immagini.nodes));
  const isEnglish = language === 'en';

  const [displayInfo, setDisplayInfo] = useState(false);

  const titolo = isEnglish && pagina.title ? pagina.title : pagina.titolo;
  const sottotitolo = isEnglish && pagina.subtitle
    ? pagina.subtitle
    : pagina.sottotitolo;
  const descrizione = isEnglish && pagina.description
    ? pagina.description
    : pagina.descrizione;

  return (
    <Layout hideFooter containerFluid lettera={lettera}>
      <SEO description={descrizione} title={titolo} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-9">
            <section
              id="scroller"
              style={{
                '--slides': immagini.length,
              }}
            >
              <Swiper
                lazy={{
                  loadPrevNext: true,
                  loadPrevNextAmount: 3,
                }}
                keyboard
                mousewheel
                className="h-100"
                pagination
              >
                {immagini.map((immagine, i) => {
                  const description = immagine.descrizione;

                  if (!immagine.childFile) {
                    return null;
                  }

                  return (
                    <SwiperSlide
                      className="swiper-slide-fotografia "
                      key={immagine.id}
                    >
                      {({ isNext, isPrev, isActive }) => (
                        <div
                          className="row align-content-start align-items-lg-center h-100 bg-white flex-row-reverse pb-5"
                        >

                          <div
                            className="col-12 col-lg-8 author-cursor-container photograph-image-container pe-lg-0"
                          >
                            <Image
                              image={immagine.childFile}
                              className="immagine"
                              loading={(isNext || isPrev || isActive)
                                ? 'eager'
                                : 'lazy'}
                              alt={descrizione}
                              preload={isNext || isPrev || isActive}
                            />
                          </div>
                          <div
                            className="col-12 col-lg-4 py-3 position-relative ps-lg-0 photograph-targhetta-container  "
                          >
                            <div
                              className="row  gx-1 justify-content-between h6 heading-style-regular"
                            >
                              <div className="col-auto">{immagine.autore}</div>
                              <div className="col-auto">
                                {`${i + 1} / ${immagini.length}`}
                              </div>
                            </div>
                            <p className="didascalia text-dark-50">
                              {description !== 'NO DIDASCALIA' && (
                                description
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
          </div>
          <div
            id="letter-title"
            className="d-none d-lg-block col-12 col-lg-3 align-self-center text-center"
          >
            <h1>{titolo}</h1>
            <h2 className="h4">{sottotitolo}</h2>
          </div>

        </div>

        <div className="row">
          <div
            className="col text-center position-absolute py-3 py-lg-5"
            style={{ bottom: 0, zIndex: 999 }}
          >
            <button
              className="btn btn-text btn-lg text-uppercase"
              onClick={() => setDisplayInfo(!displayInfo)}
            >
              Info
            </button>
          </div>
        </div>
      </div>
      <section
        id="info-container"
        className={`container-fluid ${displayInfo
          ? 'active'
          : ''}  d-flex flex-column justify-content-between`}
        style={{ overflowY: 'scroll' }}
      >
        <div className="row">
          <div className="col-10 py-5">
            <p className="display-4">
              {descrizione}
            </p>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 text-center py-5">
            <button
              className="btn btn-text btn-lg"
              onClick={() => setDisplayInfo(false)}
            >
              {t('Chiudi')}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`query Immagini( $language: String!, $lettera : Int) {
    locales: allLocale(filter: {language: {eq: $language}}) {
        edges {
            node {
                data
                ns
                language
            }
        }
    }
    pagina: sheetsLettere(lettera:{eq:  $lettera}) {
        descrizione
        description
        title
        titolo
        #        subtitle
    }
    immagini: allSheetsImmagini(filter: {lettera: {eq: $lettera} }){
        nodes {
            id
            autore
            descrizione
            childFile {
                relativePath
                childImageSharp {
                    gatsbyImageData(
                        formats: [AUTO, WEBP]
                        width: 1200
                        quality: 100
                        layout: CONSTRAINED
                        placeholder: NONE
                    )
                }
            }
        }
    }
}`;
