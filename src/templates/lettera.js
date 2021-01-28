import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Markdown from 'react-markdown'

export default function LetteraTemplate({ data: { images } , pageContext : {titolo, descrizione}}) {
  return <Layout>
    <SEO title={titolo} description={descrizione} />


    <Markdown>{descrizione}</Markdown>
    {images.edges.map(function({ node }) {
      return <Image key={node.id} fluid={node.childImageSharp.fluid} />
    })}

  </Layout>
}

export const data = graphql`query Query($img: [String]) {
    images: allFile(filter: {relativePath: {in: $img}}) {
        edges {
            node {
                id
                childImageSharp {
                    fluid(maxWidth: 700) {
                        # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
}
`