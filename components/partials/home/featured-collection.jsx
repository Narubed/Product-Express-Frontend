import React from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import ProductTwo from '~/components/features/product/product-two';

import { productSlider } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';

function FeaturedCollection ( props ) {
    const { products, loading } = props;

    return (
        <section className="product-wrapper container-fluid pt-10">
            <Reveal keyframes={ fadeIn } delay={ 300 } duration={ 1200 } triggerOnce>
                <h2 className="title title-simple text-center pt-7">Featured Products</h2>

                {
                    loading ?
                        <OwlCarousel adClass="owl-theme owl-dot-grey" options={ productSlider }>
                            {
                                [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                    <div className="product-loading-overlay" key={ 'featured-skel-' + item }></div>
                                )
                            }
                        </OwlCarousel>
                        :
                        <OwlCarousel adClass="owl-theme owl-dot-grey" options={ productSlider }>
                            {
                                products && products.map( ( item, index ) =>
                                    <ProductTwo
                                        isCat={ false }
                                        product={ item }
                                        key={ `featured-product ${ index }` }
                                    />
                                )
                            }
                        </OwlCarousel>
                }
            </Reveal>
        </section>
    )
}

export default React.memo( FeaturedCollection );
