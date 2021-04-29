/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

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
      lettere: allSheetsLettere {
        nodes {
          descrizione
          lettera
          titolo
        }
      }
      immagini: allSheetsImmagini {
        nodes {
          id
          descrizione
          autore
          scaricato
          lettera
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
    /**
     * Return if no title is set.
     */
    if (!titolo) return;

    if (process?.env?.NODE_ENV !== 'development' && lettera > process.env.LETTERS_COUNT) {
      return;
    } console.log('Lettera ', lettera, ' è minore di ', process.env.LETTERS_COUNT);
    const imgs = immagini.nodes.filter(
      (img) => img.lettera === lettera,
    );
    const filenames = imgs.map(
      ({ lettera, autore }) => `${lettera.toLocaleString('en-US',
        { minimumIntegerDigits: 2, useGrouping: false })} ${_.startCase(
        _.toLower(autore),
      )}.jpg`,
    );

    filenames.length !== 26 && console.log(`Found in source ${filenames.length} for letter ${lettera}`);

    createPage({
      path: _.kebabCase(titolo),
      component: template,
      context: {
        lettera,
        titolo,
        descrizione,
        immagini: imgs,
        filenames,
      },
    });
  });
};

/**
 * To fix react-markdown issue: process is undefined.
 * @param stage
 * @param rules
 * @param loaders
 * @param plugins
 * @param actions
 */
exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    node: {
      global: true,
    },

  });
};
