/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

const template = path.resolve('./src/templates', 'lettera.js');

exports.createPages = async function createPages({
  graphql,
  actions: { createPage },
}) {
  const {
    data: { lettere, immagini },
  } = await graphql(`
    {
      lettere: allGoogleSheetLettereRow {
        nodes {
          lettera
          titolo
          descrizione
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
    }
  `);

  lettere.nodes.forEach(({ lettera, titolo, descrizione }) => {
    const imgFilenames = immagini.nodes
      .filter((img) => img.lettera === lettera)
      .map((img) => img.filename);

    createPage({
      path: lettera.toString(),
      component: template,
      context: {
        lettera,
        titolo,
        descrizione,
        img: imgFilenames,
      },
    });
  });
};
