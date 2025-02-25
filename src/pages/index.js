import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import times from 'lodash/times';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/layout';
import SEO from '../components/seo';

SwiperCore.use([EffectFade, Autoplay]);
const IndexPage = ({ data }) => {
  const images = data.images.nodes;
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO title="Home" />
      <section className="container-fluid">
        <div className="row">
          <div className="col-12 px-0 text-center overflow-hidden">
            <h1 className="hero">
              <div
                className="py-3 text-center d-flex m-auto justify-content-center"
                style={{
                  fontSize: '40vw',
                  lineHeight: 1,
                  letterSpacing: '11px',
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  <span id="hero-digit-2">2</span>
                  <span id="hero-digit-6">6</span>
                </span>
              </div>
              <span
                id="hero-qf"
                className="position-absolute"
              >
                <div
                  className="w-100 text-start"
                  style={{
                    fontFamily: 'var(--font-family-sans-serif)',
                    fontStyle: 'initial',
                  }}
                >
                  questioni
                </div>
                <div className="text-end">
                  fotografiche
                </div>
              </span>
            </h1>
          </div>
        </div>
      </section>
      <div className="row border-dark border-top border-bottom gx-0">
        <div className="col-12">
          <div className="d-block">
            <div className="marquee">
              <div className="marquee__inner py-0 mb-0" aria-hidden="true">
                {times(10,
                  () => <span className="my-1">fotografie come lettere dell’alfabeto / </span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-12 col-md-9 py-lg-5 my-lg-5">
            <p className="home-lead my-md-5 py-5">
              {t('progetto.nasce')}
            </p>
          </div>
          <div className="col-12">
            <div className="row flex-md-row-reverse justify-content-between">
              <div className="col-10 col-lg-6 col-xl-4 ms-auto align-self-center">
                <p className="py-5 mb-0">
                  {t(
                    'progetto.articolato', 'Reportage articolato in differenti temi e ricerche sul micro e macro paesaggio, con letture etno-antropologiche condotte mediante l’uso della fotografia. Spunti per un’altra dimensione e idea di memoria, luogo, narrazione, paesaggio, design e architettura domestica, al tempo del Corona Virus.',
                  )}
                </p>
              </div>
              <div className="col-12 col-md-6 py-5 py-lg-0 my-lg-n3 align-self-center">
                <Swiper
                  effect="fade"
                  loop
                  autoplay={{
                    // delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  {images.map((img) => (
                    <SwiperSlide effect="fade" autoPlay>
                      <GatsbyImage image={getImage(img.childFile)} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

        </div>

        <div className="row align-items-center" style={{ minHeight: '90vh' }}>
          <div className="col-12 text-center py-5">
            <h3 className="display-2">
              <Link to="/alfabeto"><Trans>Scopri le foto</Trans></Link>
            </h3>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

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
        images: allSheetsImmagini(filter: {homepage: {eq: "1"}}) {
            nodes {
                descrizione
                homepage
                lettera
                childFile {
                    childImageSharp {
                        gatsbyImageData(
                            width: 500
                            layout: CONSTRAINED
                        )
                    }
                }
            }
        }
    }`;
