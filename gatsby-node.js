/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path")
const template = path.resolve("./src/templates", "lettera.js")
// You can delete this file if you're not using it
exports.createPages = async function createPages({graphql,actions: { createPage }}) {
  const { data: { lettere, immagini } } = await graphql(`{
          lettere: allGoogleSheetLettereRow {
              nodes {
                  lettera
              }
          } 
          immagini: allGoogleSheetImmaginiRow {
            nodes {
              lettera
              filename
              descrizione
              nome
            }
          }
      }`)

  lettere.nodes.forEach(({ lettera }) => {
    const imgFilenames = immagini.nodes.
      filter(img => img.lettera === lettera).
      map(img => img.filename)

    createPage({
      path: lettera.toString(),
      component: template,
      context: {
        img: imgFilenames
      }
    })
  })

}