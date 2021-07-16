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
      lettere: allSheetsLettere {
        nodes {
          titolo
          title
          sottotitolo
          lettera
          descrizione
         }
      }
      immagini: allSheetsImmagini {
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

  lettere.nodes.forEach(({
    lettera, titolo, descrizione,
    title,
    sottotitolo,
  }) => {
    /**
     * Return if no title is set.
     */
    if (!titolo) return;

    if (process.env.LETTERS_COUNT && Number(lettera) > process.env.LETTERS_COUNT) {
      console.log(lettera, ' will not be renderes as of process env');
      return;
    }

    const imgs = immagini.nodes.filter(
      (img) => img.lettera === lettera,
    );
    const filenames = imgs.map(
      ({ lettera: letter, autore }) => `${_.padStart(letter, 2,
        '0')} ${_.startCase(
        _.toLower(autore),
      )}.jpg`,
    );

    filenames.length !== 26
    && console.log(`Found in source ${filenames.length} for letter ${lettera}`);

    const data = {
      path: _.kebabCase(titolo),
      component: template,
      context: {
        lettera,
        titolo,
        descrizione,
        title,
        sottotitolo,
        immagini: imgs,
        filenames,
      },
    };
    console.log('Creating page ', lettera);
    createPage(data);
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

exports.onCreateNode = function onCreateNode({
  node, getNodesByType, actions: { createParentChildLink },
}) {
  if (node.internal.type === 'SheetsImmagini') {
    const { lettera, autore } = node;

    const filename = `${_.padStart(lettera, 2,
      '0')} ${_.startCase(
      _.toLower(autore),
    )}.jpg`;
    const files = getNodesByType('File');

    const file = files.find(({ relativePath }) => relativePath === filename);

    if (!file) return;

    createParentChildLink({ parent: node, child: file });
  }
};
