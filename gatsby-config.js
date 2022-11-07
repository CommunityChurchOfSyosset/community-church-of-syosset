require('dotenv').config();

module.exports = {
  plugins: [
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        background_color: '#fff',
        display: 'minimal-ui',
        name: 'Community Church of Syosset',
        short_name: 'CCoS',
        start_url: '/',
        theme_color: '#007ea9',
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN,
        environment:
          process.env.NODE_ENV === 'development' ? 'development' : 'master',
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    'gatsby-transformer-sharp',
  ],
  siteMetadata: {
    author: 'Nathaniel J. Liberty',
  },
};
