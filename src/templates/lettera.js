/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import _ from 'lodash';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/layout';
import SEO from '../components/seo';

gsap.registerPlugin(ScrollTrigger);

const Fotografia = React.forwardRef(
  ({ children, description, zIndex }, ref) => (
    <div
      ref={ref}
      className="row  align-items-center fotografia position-absolute bg-white w-100 overflow-hidden"
      style={{ height: '75vh', zIndex }}
    >
      <div className="d-none d-md-block  col-md-4 ">
        {description
        !== 'NO DIDASCALIA' && (
          description
        )}
      </div>
      <div className="col-12 col-md-8 d-block" style={{ height: '50vh' }}>
        {children}
      </div>
    </div>
  ),
);

export default function Lettera({
  data: { images: { nodes: images } },
  pageContext,
}) {
  const triggerRef = useRef();
  const scrollerRef = useRef();
  const photographRefs = useRef([]);

  const [displayInfo, setDisplayInfo] = useState(false);

  const {
    descrizione, titolo, lettera, filenames,
  } = pageContext;

  const immagini = [];
  images.forEach((image) => {
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

  React.useLayoutEffect(() => {
    const anim = gsap.to(gsap.utils.toArray(photographRefs.current), {
      yPercent: -100,
      opacity: 0,
      ease: 'none',
      stagger: 1.5,
      scrollTrigger: {
        trigger: triggerRef.current,
        scroller: scrollerRef.current,
        start: 'top top',
        end: `+=${100 * immagini.length}%`,
        scrub: true,
        pin: true,
        snap: {
          snapTo: 1 / photographRefs.current.length,
          duration: 0.2,
          inertia: true,
          ease: 'ease.out',
        },
        onSnapComplete: console.log,
      },
    });
  }, [scrollerRef, triggerRef, photographRefs]);
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
    <Layout hideFooter>
      <SEO description={descrizione} title="Lettera" />
      <div className="row no-gutters">
        <div className="col-12 col-lg-9">
          <section
            className="position-relative"
            id="scroller"
            ref={scrollerRef}
            style={{
              height: '75vh',
              overflowY: 'scroll',
              direction: 'rtl',
            }}
          >
            <div style={{ height: `${images.length * 100}%` }}>
              <div
                id="container"
                className="container-fluid position-absolute w-100 h-100 "
                style={{ top: 0, left: 0, direction: 'ltr' }}
                ref={triggerRef}
              >
                {immagini.map((immagine, i) => {
                  const img = immagine.childImageSharp.gatsbyImageData.images;
                  const { sources } = img;
                  return (
                    <Fotografia
                      key={immagine.id}
                      ref={(el) => (i < immagini.length - 1)
                        && photographRefs.current.push(el)}
                      description={immagine.descrizione}
                      zIndex={images.length - i}
                    >
                      <img
                        src={img.fallback.src}
                        srcSet={img.fallback.srcSet}
                        sizes={img.fallback.sizes}
                        height={immagine.childImageSharp.gatsbyImageData.height}
                        width={immagine.childImageSharp.gatsbyImageData.width}
                        alt=""
                        className="w-100 h-100"
                        style={{
                          // backgroundColor: immagine.childImageSharp.gatsbyImageData.backgroundColor,
                          objectFit: 'contain',
                        }}
                      />

                    </Fotografia>
                  );
                })}
              </div>
            </div>
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
        <div className="col text-center">
          <button
            className="btn btn-test"
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
              className="btn btn-text"
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
        )
      }
    }
  } 
}`;
