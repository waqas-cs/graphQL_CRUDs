module.exports = {
  siteMetadata: {
    title: `graphql-client`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "http://localhost:4000",
      },
    },
  ],
};
