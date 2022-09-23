/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/google-font-display */

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />
        <link rel="shortcut icon" href="../images/icons/favicon.ico" />
        <link rel="icon" href="../images/icons/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="vendor/riode-fonts/riode-fonts.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="vendor/fontawesome-free/css/all.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="vendor/owl-carousel/owl.carousel.min.css"
        />
        <body>
          <Main />
          <script src="../js/jquery.min.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
