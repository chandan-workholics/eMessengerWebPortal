import React from 'react'
import wlcmImg from '../welcome-bg--img.png'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom';

const WelcomeMsg = () => {

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    return (
        <>
            <div className="container-fluid p-0 welcomeMsg-page position-relative">
                <div className="container pt-3">
                    <div className="row pt-5">
                        <div className="col-lg-6 mx-auto">
                            <AutoplaySlider
                                play={true}
                                cancelOnInteraction={false} // should stop playing on user interaction
                                interval={5000}
                            >
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                            </AutoplaySlider>
                        </div>
                    </div>
                </div>
                <div className="position-absolute bottom-0 start-0 w-100">
                    <img src={wlcmImg} alt="" className='w-100 object-fit-contain' />
                </div>
                <div className="position-absolute bottom-0 end-0 w-100 d-flex justify-content-end">
                    <Link to='/home' className="btn bg-E79C1D rounded-pill me-5 mb-4 px-4">Next</Link>
                </div>
            </div>
        </>
    )
}

export default WelcomeMsg