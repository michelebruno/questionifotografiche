/* eslint-disable react/prop-types */
import React, { useState, useRef, useMemo } from 'react';
import { graphql } from 'gatsby';
import SwiperCore, {
  Mousewheel, Navigation, Pagination, Scrollbar,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getImage } from 'gatsby-plugin-image';
import _ from 'lodash';
import Layout from './layout';
import SEO from './seo';

SwiperCore.use([Mousewheel, Pagination, Scrollbar, Navigation]);

export default function Lettera({
  data: { images: { nodes: images } },
  pageContext,
}) {
  const triggerRef = useRef();
  const scrollerRef = useRef();
  const photographRefs = useRef([]);

  const [displayInfo, setDisplayInfo] = useState(false);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const {
    descrizione, titolo, lettera, filenames,
  } = pageContext;

  const immagini = [];
  useMemo(() => _.shuffle(images), []).forEach((image) => {
    const immagine = pageContext.immagini.find(
      ({ lettera, autore }) => image.relativePath
        === `${lettera.toLocaleString('en-US',
          { minimumIntegerDigits: 2, useGrouping: false })} ${_.startCase(
          _.toLower(autore),
        )}.jpg`,
    );

    immagine.childImageSharp = image.childImageSharp;
    if (immagine) immagini.push(immagine);
  });

  if (filenames.length > images.length) {
    console.log(
      `${filenames.length - images.length} missing in letter ${lettera}:`,
      pageContext.filenames.filter(
        (i) => images.findIndex(
          ({ relativePath }) => i === relativePath,
        ) === -1,
      ),
    );
  } else if (filenames.length !== 26) {
    console.log('Images number is not 26.', `Found: ${filenames.length}`);
  }
  return (
    <Layout hideFooter containerFluid>
      <SEO description={descrizione} title="Lettera" />
      <div className="row no-gutters">
        <div className="col-12 col-lg-9">
          <section
            id="scroller"
            ref={scrollerRef}
            style={{
              height: '75vh',
              '--slides': immagini.length,
            }}
          >
            <Swiper
              ref={triggerRef}
              direction="vertical"
              mousewheel
              className="h-100"
              pagination={{ clickable: true }}
            >
              {immagini.map((immagine, i) => {
                const img = immagine.childImageSharp.gatsbyImageData.images;
                const description = immagine.descrizione;
                const { sources } = img;
                return (
                  <SwiperSlide
                    className="container-fluid"
                    key={immagine.id}
                  >
                    <div className="row align-items-center h-100">
                      <div className="col-12 col-lg-4">
                        {description
                        !== 'NO DIDASCALIA' && (
                          description
                        )}
                      </div>
                      <div className="col-12 col-lg-8 h-100">
                        <img
                          src={img.fallback.src}
                          srcSet={img.fallback.srcSet}
                          sizes={img.fallback.sizes}
                          height={immagine.childImageSharp.gatsbyImageData.height}
                          width={immagine.childImageSharp.gatsbyImageData.width}
                          alt=""
                          className="h-100 w-100"
                          style={{
                            // backgroundColor: immagine.childImageSharp.gatsbyImageData.backgroundColor,
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>
        </div>
        <div
          id="letter-title"
          className="col-12 col-lg-3 align-self-center text-center"
        >
          <h1>{titolo}</h1>
        </div>

      </div>

      <div className="row">
        <div
          className="col text-center position-absolute py-5"
          style={{ bottom: 0 }}
        >
          <button
            className="btn btn-text btn-lg text-uppercase"
            onClick={() => setDisplayInfo(!displayInfo)}
          >
            Info
          </button>
        </div>
      </div>
      <section
        id="info-container"
        className={`container-fluid ${displayInfo ? 'active' : ''}`}
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
              CLOSE
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`query Immagini($filenames: [String]) {
  images: allFile(filter: {sourceInstanceName: {eq: "fotografie"}, relativePath: {in: $filenames}}) {
      nodes {
        id
        relativePath
        childImageSharp {
        gatsbyImageData(
          width: 1200 
          quality: 100
        )
      }
    }
  } 
}`;
