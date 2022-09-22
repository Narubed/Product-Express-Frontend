import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Reveal from 'react-awesome-reveal';

import ALink from '~/components/features/custom-link';

import { modalActions } from '~/store/modal';

import { parallaxHandler } from '~/utils';
import { blurIn, fadeInDownShorter, fadeIn } from '~/utils/data/keyframes';

function VideoSection ( props ) {
    const { openModal } = props;

    useEffect( () => {
        window.addEventListener( 'scroll', parallaxHandler, true );

        return () => {
            window.removeEventListener( 'scroll', parallaxHandler, true );
        }
    }, [] )

    const showVideoModalHandler = ( e ) => {
        e.preventDefault();
        let link = e.currentTarget.closest( '.btn-play' ).getAttribute( 'data' );
        openModal( link );
    }

    return (
        <section className="banner video-banner parallax" data-option="{'speed': 4}" style={ { backgroundImage: `url(./images/home/video.jpg)`, backgroundColor: "#292e32" } }>
            <Reveal keyframes={ blurIn } delay={ 200 } duration={ 1000 } triggerOnce>
                <div className="banner-content text-center pr-4 pl-4">
                    <Reveal keyframes={ fadeInDownShorter } delay={ 200 } duration={ 1200 } triggerOnce>
                        <h4 className="banner-subtitle ls-s font-secondary text-white text-uppercase" >Brand Experience</h4>
                    </Reveal>

                    <Reveal keyframes={ blurIn } delay={ 400 } duration={ 1400 } triggerOnce>
                        <h3 className="banner-title text-white text-uppercase font-weight-bold mb-5">Premium for the pros 2021</h3>
                    </Reveal>

                    <Reveal keyframes={ fadeIn } delay={ 800 } duration={ 1200 } triggerOnce>
                        <a className="btn-play btn-iframe text-white" href="#" data="/uploads/video/video-1.mp4" onClick={ showVideoModalHandler }>
                            <i className="d-icon-play-solid ml-0"></i>
                        </a>
                    </Reveal>
                </div>
            </Reveal>
        </section>
    )
}

export default connect( '', { openModal: modalActions.openModal } )( VideoSection )