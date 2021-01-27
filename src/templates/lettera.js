import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

export default function LetteraTemplate({ data : {images} }) {

    console.log(images)
  
  return <div>
      {images.edges.map(function({ node }) {
          return <Image key={node.id} fluid={node.childImageSharp.fluid} />
      })}
  </div>
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