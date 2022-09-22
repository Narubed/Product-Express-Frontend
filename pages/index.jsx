import React from 'react';
import Helmet from 'react-helmet';

import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
import withApollo from '../server/apollo';
import { GET_HOME_DATA } from '../server/queries';

// import Home Components
import NewsletterModal from '~/components/features/modals/newsletter-modal';
import IntroSection from '~/components/partials/home/intro-section';
import CategorySection from '~/components/partials/home/category-section';
import BagCollection from '~/components/partials/home/bag-collection';
import DealSection from '~/components/partials/home/deal-section';
import ShoesCollection from '~/components/partials/home/shoes-collection';
import VideoSection from '~/components/partials/home/video-section';
import FeaturedCollection from '~/components/partials/home/featured-collection';
import InstagramSection from '~/components/partials/home/instagram-section';

function HomePage() {
    const { data, loading, error } = useQuery( GET_HOME_DATA, { variables: { productsCount: 7 } } );
    const featured = data && data.specialProducts.featured;
    const bags = data && data.bags.data;
    const shoes = data && data.shoes.data;

    return (
        <div className="main home homepage">
            <Helmet>
                <title>Riode React eCommerce Template - Home</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Home</h1>

            <div className="page-content">
                <IntroSection />
        
                <BagCollection products={ bags } loading={ loading } />

                <CategorySection />

                <DealSection />

                <ShoesCollection products={ shoes } loading={ loading } />

                <VideoSection />

                <FeaturedCollection products={ featured } loading={ loading } />

                <InstagramSection />
            </div>

            <NewsletterModal />
        </div>
    )
}

export default withApollo( { ssr: typeof window === 'undefined' } )( HomePage );