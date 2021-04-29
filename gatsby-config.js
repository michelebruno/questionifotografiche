const dotenv = require('dotenv');

dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
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
        short_name: 'starter',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
