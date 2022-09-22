import React from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import ProductTwo from '~/components/features/product/product-two';

import { productSlider } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';

function BagCollection ( props ) {
    const { products, loading } = props;

    return (
        <section className="product-wrapper container-fluid mt-8 pt-7">
            <Reveal keyframes={ fadeIn } delay={ 300 } duration={ 1200 } triggerOnce>
                <h2 className="title title-simple text-center">Shop bags</h2>

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
                                        key={ `category-bag-product ${ index }` }
                                    />
                                )
                            }
                        </OwlCarousel>
                }
            </Reveal>
        </section>
    )
}

export default React.memo( BagCollection );
