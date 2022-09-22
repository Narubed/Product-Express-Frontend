import React from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import ProductTwo from '~/components/features/product/product-two';

import { productSlider } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';

function ShoesCollection ( props ) {
    const { products, loading } = props;

    return (
        <section className="product-wrapper grey-section pt-10 pb-6">
            <Reveal keyframes={ fadeIn } delay={ 300 } duration={ 1200 } triggerOnce>
                <div className="container-fluid mb-10">
                    <h2 className="title title-simple text-center pt-8">Shop shoes</h2>

                    {
                        loading ?
                            <OwlCarousel adClass="owl-theme owl-dot-grey" options={ productSlider }>
                                {
                                    [ 1, 2, 3, 4, 5, 6, 7 ].map( ( item ) =>
                                        <div className="product-loading-overlay" key={ 'best-selling-skel-' + item }></div>
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
                                            key={ `category-shoes-product ${ index }` }
                                        />
                                    )
                                }
                            </OwlCarousel>
                    }
                </div>
            </Reveal>
        </section>
    )
}

export default React.memo( ShoesCollection );
