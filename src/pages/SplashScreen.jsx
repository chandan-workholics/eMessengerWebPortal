import React from 'react'
import eLogo from '../e-logo.png'

const SplashScreen = () => {
    return (
        <>
            <div className="container-fluid p-0 splash-screen-container">
            <img src={eLogo} alt="logo-splash" className="" />
            </div>
        </>
    )
}

export default SplashScreen