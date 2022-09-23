import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Helmet from "react-helmet";
import NewsletterModal from "~/components/features/modals/newsletter-modal";
// import IntroSection from "~/components/partials/home/intro-section";
import IntroSection from "~/components/partials/home/carosel";
import IntroBanners from "~/components/partials/home/intro-banners";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Helmet>
        <title>Riode React eCommerce Template - Home</title>
      </Helmet>
      <div className="page-content">
        <IntroSection />
        <IntroBanners />
      </div>
      <NewsletterModal />
    </div>
  );
}