require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const googleCredentials = require('./credentials.json');

module.exports = {
  pathPrefix: 'immaginicomealfabeto',
  siteMetadata: {
    title: 'Immagini come lettere di un alfabeto',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: 'Michele Bruno',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: '1YlDbYmphksOZSR-mL8KZRuVsoYP0uNaKgIZFa57n26U',
        worksheetTitle: 'Immagini',
        credentials: googleCredentials,
      },
    },
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: '1YlDbYmphksOZSR-mL8KZRuVsoYP0uNaKgIZFa57n26U',
        worksheetTitle: 'Lettere',
        credentials: googleCredentials,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
