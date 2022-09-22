import React from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { instagramSlider } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';

function InstagramSection () {
    return (
        <section className="pt-10">
            <Reveal keyframes={ fadeIn } duration={ 1200 } delay={ 300 } triggerOnce>
                <h2 className="title title-simple text-center pt-3">Instagram</h2>

                <OwlCarousel adClass="owl-theme" options={ instagramSlider }>
                    <figure className="instagram">
                        <ALink href="#">
                            <LazyLoadImage
                                src="./images/home/instagram/1.jpg"
                                alt="instagram"
                                effect="opacity; transform"
                                width="auto"
                                height="auto"
                            />
                        </ALink>
                    </figure>
                    <figure className="instagram">
                        <ALink href="#">
                            <LazyLoadImage
                                src="./images/home/instagram/2.jpg"
                                alt="instagram"
                                effect="opacity; transform"
                                width="auto"
                                height="auto"
                            />
                        </ALink>
                    </figure>
                    <figure className="instagram">
                        <ALink href="#">
                            <LazyLoadImage
                                src="./images/home/instagram/3.jpg"
                                alt="instagram"
                                effect="opacity; transform"
                                width="auto"
                                height="auto"
                            />
                        </ALink>
                    </figure>
                    <figure className="instagram">
                        <ALink href="#">
                            <LazyLoadImage
                                src="./images/home/instagram/4.jpg"
                                alt="instagram"
                                effect="opacity; transform"
                                width="auto"
                                height="auto"
                            />
                        </ALink>
                    </figure>
                    <figure className="instagram">
                        <ALink href="#">
                            <LazyLoadImage
                                src="./images/home/instagram/5.jpg"
                                alt="instagram"
                                effect="opacity; transform"
                                width="auto"
                                height="auto"
                            />
                        </ALink>
                    </figure>
                    <figure className="instagram">
                        <ALink href="#">
                            <LazyLoadImage
                                src="./images/home/instagram/6.jpg"
                                alt="instagram"
                                effect="opacity; transform"
                                width="auto"
                                height="auto"
                            />
                        </ALink>
                    </figure>
                </OwlCarousel>
            </Reveal>
        </section>
    )
}

export default React.memo( InstagramSection );