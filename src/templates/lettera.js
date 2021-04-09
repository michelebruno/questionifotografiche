/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Markdown from 'react-markdown';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function LetteraTemplate({
  data: { images },
  pageContext,
}) {
  const immagini = { ...pageContext.immagini };
  const { descrizione } = pageContext;
  return (
    <Layout>
      <SEO description={descrizione} />

      <Markdown>{descrizione}</Markdown>
      {images.nodes.map((node) => (
        <Image key={node.id} fluid={node.childImageSharp.fluid} />
      ))}
    </Layout>
  );
}

export const query = graphql`
query Immagini($filenames: [String]) {
  images: allFile(filter: {sourceInstanceName: {eq: "fotografie"}, relativePath: {in: $filenames}}) {
    nodes { 
      id
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  } 
}`;
