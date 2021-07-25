const dotenv = require('dotenv');

// const devMode = process.env.NODE_ENV === 'development';
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
});

const siteUrl = 'https://questionifotografiche.it/';
const googleCredentials = require('./credentials.json');

module.exports = {
  siteMetadata: {
    title: 'Questioni fotografiche',
    siteUrl,
    description:
      '26 questioni fotografiche come le lettere dell\'alfabeto',
    author: 'Michele Bruno',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fotografie',
        path: `${__dirname}/src/fotografie`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'Questioni fotografiche',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-google-spreadsheet',
      options: {
        spreadsheetId: '1GbYyZeiaubx4C_Vfsm5xYIJ9QM0tP0OIBi6S7dY7ZpE',
        typePrefix: 'Sheets',
        credentials: googleCredentials,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
        name: 'data',
      },
    },
    'gatsby-transformer-csv',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/locales`,
        name: 'locales',
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locales', // name given to `gatsby-source-filesystem` plugin.
        languages: ['en', 'it'],
        defaultLanguage: 'it',
        // you can pass any i18next options
        // pass following options to allow message content as a key
        siteUrl,
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          saveMissing: true,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
