/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Markdown from 'react-markdown';
import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Fotografia({ children, description }) {
  return (
    <div className="row vh-100 align-items-center">
      <div className="col-12 col-md-4">

        {description
        !== 'NO DIDASCALIA' && (
        <Markdown className="px-3">
          {description}
        </Markdown>
        )}
      </div>
      <div className="col-12 col-md-8 h-100 ">
        {children}
      </div>
    </div>
  );
}

export default function LetteraTemplate({
  data: { images: { nodes: images } },
  pageContext,
}) {
  const { descrizione, titolo, lettera } = pageContext;

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

  return (
    <Layout>
      <SEO description={descrizione} />

      <Markdown>{descrizione}</Markdown>
      <section className=" ">
        <div className="row vh-100 ">
          <div
            className="col-9 vh-100"
            style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
          >

            {immagini.map((immagine) => (
              <Fotografia description={immagine.descrizione}>
                <Image
                  style={{ height: '100%', width: '100%' }}
                  imgStyle={{ objectFit: 'contain' }}
                  key={immagine.id}
                  fluid={immagine.childImageSharp.fluid}
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

export const query = graphql`
query Immagini($filenames: [String]) {
  images: allFile(filter: {sourceInstanceName: {eq: "fotografie"}, relativePath: {in: $filenames}}) {
    nodes { 
      id
      relativePath
      childImageSharp {
        fluid(maxWidth: 2400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  } 
}`;
