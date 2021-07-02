import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import _ from 'lodash';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import Layout from '../components/layout';
import SEO from '../components/seo';
import * as classes from './index.module.scss';

SwiperCore.use([EffectFade, Autoplay]);
const IndexPage = ({ data }) => {
  const images = data.images.nodes.filter(
    (img) => {
      const image = getImage(img);
      return image.height / image.width === (2 / 3);
    },
  );

  return (
    <Layout>
      <SEO title="Home" />
      <section className="container-fluid">
        <div className="row">
          <div className="col-12 px-0 text-center overflow-hidden">
            <h1 className={classes.hero}>
              <div
                className="text-center d-flex m-auto justify-content-center"
                style={{
                  fontSize: '40vw',
                  lineHeight: 1,
                  letterSpacing: '11px',
                }}
              >
                <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
                  <span className="bg-white">2</span>
                  <span id="hero-spacer" className="d-inline-block" />
                  <span className="bg-white">6</span>
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
              <div className="marquee__inner h5 py-0 mb-0" aria-hidden="true">
                {_.times(10, () => <span className="my-1">come lettere dell'alfabeto / </span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-12 col-md-9 py-5 my-5">
            <p className="display-3 my-5 py-5">
              Il progetto nasce dall'idea di creare un percorso, un'occasione,
              per riscoprire, come Xavier De Maistre nel suo "Voyage autour de
              ma chambre", gli infiniti ricordi che si nascondono nel paesaggio
              domestico. Paesaggio ricco di affetti e di storie, come scrive
              Vittorio Lingiardi nel suo "Mindscapes" o come illustra Luigi
              Ghirri nel suo “Identikit”.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <Swiper
              effect="fade"
              autoplay={{
                // delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {images.map((img) => (
                <SwiperSlide effect="fade" autoPlay>
                  <GatsbyImage image={getImage(img)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-12 col-md-4 align-self-center">
            <p className="py-5 mb-0">
              Reportage articolato in differenti temi e ricerche sul micro e
              macro paesaggio, con letture etno-antropologiche condotte mediante
              l’uso della fotografia. Spunti per un’altra dimensione e idea di
              memoria, luogo, narrazione, paesaggio, design e architettura
              domestica, al tempo del Corona Virus.
            </p>
          </div>
        </div>
        <div className="row align-items-center" style={{ minHeight: '90vh' }}>
          <div className="col-12 text-center py-5">
            <h3 className="display-2">
              <Link to="/alfabeto">Scopri le foto</Link>
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
    
        images: allFile(
            filter: {sourceInstanceName: {eq: "fotografie"}}
            sort: {fields: id}
            limit: 20
        ) {
            nodes {
                publicURL
                relativePath
                childImageSharp {
                    gatsbyImageData(
                        layout: CONSTRAINED
                        width: 900
                        quality: 90
                    )
                }
                sourceInstanceName
                size
            }
        }
    }`;
