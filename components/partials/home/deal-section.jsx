import React from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '~/components/features/owl-carousel';

import { fadeIn, blurIn } from '~/utils/data/keyframes';
import { bannerSlider } from '~/utils/data/carousel';

function DealSection () {
    return (
        <section className="banner-group container-fluid mt-10 pt-6 pb-8 mb-10">
            <Reveal keyframes={ fadeIn } delay={ 200 } duration={ 1200 } triggerOnce>
                <OwlCarousel adClass="owl-theme" options={ bannerSlider }>
                    <div className="banner1 banner banner-fixed overlay-effect-one">
                        <figure style={ { backgroundColor: "#eaeaea" } }>
                            <LazyLoadImage
                                src="./images/home/banner/4.jpg"
                                alt="Intro Slider"
                                effect="opacity; transform"
                                width={ 100 }
                                height={ 150 }
                            />
                        </figure>

                        <div className="banner-content y-50">
                            <h4 className="banner-subtitle text-uppercase text-body mb-0">New Arrivals</h4>

                            <Reveal keyframes={ blurIn } delay={ 400 } duration={ 1200 } triggerOnce>
                                <h3 className="banner-title font-weight-bolder ls-m mb-0">Season Training Shoes</h3>
                            </Reveal>

                            <hr className="bg-grey border-no" />
                            <h4 className="font-weight-normal mb-0 ls-normal">Only from <span className="text-primary font-weight-semi-bold">$78.99</span></h4>
                        </div>
                    </div>
                    <div className="banner2 banner banner-fixed overlay-effect-one">
                        <figure style={ { backgroundColor: "#231f1c" } }>
                            <LazyLoadImage
                                src="./images/home/banner/5.jpg"
                                alt="Intro Slider"
                                effect="opacity; transform"
                                width={ 100 }
                                height={ 150 }
                            />
                        </figure>

                        <div className="banner-content y-50">
                            <h4 className="banner-subtitle text-uppercase mb-0">Top Products</h4>
                            <Reveal keyframes={ blurIn } delay={ 400 } duration={ 1200 } triggerOnce>
                                <h3 className="banner-title font-weight-bolder ls-m mb-0 text-white">Suitable Women Wear</h3>
                            </Reveal>
                            <hr className="bg-grey border-no" />
                            <h4 className="font-weight-normal mb-0 ls-normal">Only from <span className="text-primary font-weight-semi-bold">$121.99</span></h4>
                        </div>
                    </div>
                </OwlCarousel>
            </Reveal >
        </section>
    )
}

export default React.memo( DealSection );