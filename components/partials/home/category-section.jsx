import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { fadeIn } from '~/utils/data/keyframes';
import { categorySlider } from '~/utils/data/carousel';

function CategorySection () {
    return (
        <section className="categories container-fluid mt-10 pt-2">
            <Reveal keyframes={ fadeIn } delay={ 200 } duration={ 1200 } triggerOnce>
                <h2 className="title title-simple text-center">Shop by categories</h2>

                <OwlCarousel adClass="owl-theme owl-nav-full" options={ categorySlider }>
                    <div className="category category-absolute category-classic overlay-zoom">
                        <Reveal keyframes={ fadeIn } delay={ 300 } duration={ 1200 } triggerOnce>
                            <ALink href={ { pathname: '/shop', query: { category: 'for-women-s' } } }>
                                <figure className="category-media">
                                    <LazyLoadImage
                                        src="./images/home/categories/1.jpg"
                                        alt="Intro Slider"
                                        effect="opacity; transform"
                                        width="auto"
                                        height="auto"
                                    />
                                </figure>

                                <div className="category-content">
                                    <h4 className="category-name">For Women’s</h4>
                                    <span className="category-count">
                                        <span>6</span> Products
                                    </span>
                                </div>
                            </ALink>
                        </Reveal>
                    </div>

                    <div className="category category-absolute category-classic overlay-zoom">
                        <Reveal keyframes={ fadeIn } delay={ 400 } duration={ 1200 } triggerOnce>
                            <ALink href={ { pathname: '/shop', query: { category: 'sporting-goods' } } }>
                                <figure className="category-media">
                                    <LazyLoadImage
                                        src="./images/home/categories/2.jpg"
                                        alt="Intro Slider"
                                        effect="opacity; transform"
                                        width="auto"
                                        height="auto"
                                    />
                                </figure>

                                <div className="category-content">
                                    <h4 className="category-name">Sporting Goods</h4>
                                    <span className="category-count">
                                        <span>6</span> Products
                                    </span>
                                </div>
                            </ALink>
                        </Reveal>
                    </div>

                    <div className="category category-absolute category-classic overlay-zoom">
                        <Reveal keyframes={ fadeIn } delay={ 500 } duration={ 1200 } triggerOnce>
                            <ALink href={ { pathname: '/shop', query: { category: 'for-men-s' } } }>
                                <figure className="category-media">
                                    <LazyLoadImage
                                        src="./images/home/categories/3.jpg"
                                        alt="Intro Slider"
                                        effect="opacity; transform"
                                        width="auto"
                                        height="auto"
                                    />
                                </figure>

                                <div className="category-content">
                                    <h4 className="category-name">For Men’s</h4>
                                    <span className="category-count">
                                        <span>6</span> Products
                                    </span>
                                </div>
                            </ALink>
                        </Reveal>
                    </div>

                    <div className="category category-absolute category-classic overlay-zoom">
                        <Reveal keyframes={ fadeIn } delay={ 600 } duration={ 1200 } triggerOnce>
                            <ALink href={ { pathname: '/shop', query: { category: 'accessories-and-watches' } } }>
                                <figure className="category-media">
                                    <LazyLoadImage
                                        src="./images/home/categories/4.jpg"
                                        alt="Intro Slider"
                                        effect="opacity; transform"
                                        width="auto"
                                        height="auto"
                                    />
                                </figure>

                                <div className="category-content">
                                    <h4 className="category-name">Accessories &amp; Watches</h4>
                                    <span className="category-count">
                                        <span>6</span> Products
                                    </span>
                                </div>
                            </ALink>
                        </Reveal>
                    </div>

                    <div className="category category-absolute category-classic overlay-zoom">
                        <Reveal keyframes={ fadeIn } delay={ 700 } duration={ 1200 } triggerOnce>
                            <ALink href={ { pathname: '/shop', query: { category: 'riode-gift' } } }>
                                <figure className="category-media">
                                    <LazyLoadImage
                                        src="./images/home/categories/5.jpg"
                                        alt="Intro Slider"
                                        effect="opacity; transform"
                                        width="auto"
                                        height="auto"
                                    />
                                </figure>

                                <div className="category-content">
                                    <h4 className="category-name">Riode Gift</h4>
                                    <span className="category-count">
                                        <span>6</span> Products
                                    </span>
                                </div>
                            </ALink>
                        </Reveal>
                    </div>
                </OwlCarousel>
            </Reveal>
        </section>
    )
}

export default React.memo( CategorySection );