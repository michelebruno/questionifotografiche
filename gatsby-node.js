/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

const template = path.resolve('./src/templates', 'lettera.js');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Fotografia implements Node {
      lettera: Int!
      autore: String!
      scaricato: String!
      descrizione: String! 
    } 
  `;
  createTypes(typeDefs);
  createTypes(`
  type Lettera implements Node {
    lettera: Int!
    descrizione: String!
  }
  `);
};
exports.createPages = async function createPages({
  graphql,
  actions: { createPage },
}) {
  const q = await graphql(`
   {
      lettere: allGoogleSheetLettereRow {
        nodes {
          descrizione
          lettera
          titolo
        }
      }
      immagini: allGoogleSheetImmaginiRow {
        nodes {
          id
          descrizione
          titolo
          autore
        }
      }
    }
  `);

  if (q.errors) {
    return console.log(q.errors);
  }
  const {
    data: { lettere, immagini },
  } = q;

  lettere.nodes.forEach(({ lettera, titolo, descrizione }) => {
    const imgFilenames = immagini.nodes.filter(
      (img) => img.lettera === lettera,
    ).map((img) => img.filename);

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
