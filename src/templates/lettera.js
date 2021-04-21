/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
      className="row align-items-center fotografia position-absolute bg-white"
      style={{ height: '75vh', willChange: 'transform !important', zIndex }}
    >
      <div className="col-12 col-md-4 ">

        {description
        !== 'NO DIDASCALIA' && (
          description
        )}
      </div>
      <div className="col-12 col-md-8 text-center h-100">
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
      ease: 'none',
      stagger: 0.5,
      scrollTrigger: {
        trigger: triggerRef.current,
        scroller: scrollerRef.current,
        start: 'top top',
        end: `+=${40 * immagini.length}%`,
        scrub: true,
        pin: true,
        onToggle: console.log,
      },
    });

    return anim.kill;
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
    <Layout stickyFooter>
      <SEO description={descrizione} title="Lettera" />
      <section
        className="position-relative"
        id="scroller"
        ref={scrollerRef}
        style={{ height: '75vh', overflowY: 'scroll', scrollbarWidth: 'none' }}
      >
        <div className="row">
          <div
            id="container"
            className="col-12 col-lg-9 position-absolute h-100 "
            style={{ top: 0, left: 0 }}
            ref={triggerRef}
          >
            {immagini.map((immagine, i) => (
              <Fotografia
                key={immagine.id}
                ref={(el) => photographRefs.current.push(el)}
                description={immagine.descrizione}
                zIndex={images.length - i}
              >
                <GatsbyImage
                  alt="image"
                  image={getImage(immagine)}
                  objectFit="contain"
                  style={{ height: '100%' }}
                  onLoad={ScrollTrigger.refresh}
                />
              </Fotografia>
            ))}
          </div>
          <div className="col-12 col-lg-3 align-self-center text-center">
            <h1>{titolo}</h1>
            <h3>
              {lettera}
              /26
            </h3>
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
          layout: CONSTRAINED
        )
      }
    }
  } 
}`;
