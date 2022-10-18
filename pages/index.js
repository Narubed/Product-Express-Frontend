import Image from "next/image";
import React from "react";
import { Helmet } from "react-helmet";
import IntroSection from "~/components/partials/home/intro-section";
import IntroSilde from "~/components/partials/home/intro-silde";
import ServiceBox from "~/components/partials/home/service-section";
import BannerSection from "@/components/partials/home/banner-section";
import ContactSection from "~/components/partials/home/contact-section";
import NewCollection from "@/components/partials/home/new-collection";
import BigBannerSection from "~/components/partials/home/big-banner-section";
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import Reveal from "react-awesome-reveal";
import { fadeInRightShorter } from "~/utils/data/keyframes";

export default function Home() {
  return (
    <div className="main home">
      <Helmet>
        <title>Riode React eCommerce Template - Home</title>
      </Helmet>

      <h1 className="d-none">Riode React eCommerce Template - Home</h1>
      <div className="page-content">
        {/* <IntroSilde /> */}
        <IntroSection />

        <ServiceBox />
        <NewCollection />
        {/* <NewCollection products={ latest } loading={ loading } /> */}
        <BannerSection />

        {/* <FeaturedCollection products={ products } loading={ loading } /> */}

        <BigBannerSection />

        {/* <SmallCollection featured={ featured } bestSelling={ bestSelling } topRated={ topRated } loading={ loading } /> */}
        {/* <InstagramSection /> */}
        <ContactSection />
      </div>

      <NewsletterModal />
    </div>
  );
}
