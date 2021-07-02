/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

const template = path.resolve('./src/components', 'lettera.js');

exports.createPages = async function createPages({
  graphql,
  actions: { createPage },
}) {
  const q = await graphql(`
   {
      lettere: allLettereCsv {
        nodes {
          descrizione
          lettera
          titolo
        }
      }
      immagini: allImmaginiCsv {
        nodes {
          id
          descrizione
          autore 
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

    if (process.env.LETTERS_COUNT && lettera > process.env.LETTERS_COUNT) {
      return;
    }

    const imgs = immagini.nodes.filter(
      (img) => img.lettera === lettera,
    );
    const filenames = imgs.map(
      ({ lettera: letter, autore }) => `${_.padStart(letter, 2, '0')} ${_.startCase(
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
