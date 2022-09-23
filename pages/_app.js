// import '../styles/globals.css'
import "~/public/sass/style.scss";
import { useStore, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../store/index.js";
import Helmet from "react-helmet";

import Layout from "~/components/layout";

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
              <div className="bounce4"></div>
            </div>
          </div>
        }
      >
        <Helmet>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <title>Riode - React eCommerce Template</title>

          <meta name="keywords" content="React Template" />
          <meta name="description" content="Riode - React eCommerce Template" />
          <meta name="author" content="D-THEMES" />
        </Helmet>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(MyApp);
