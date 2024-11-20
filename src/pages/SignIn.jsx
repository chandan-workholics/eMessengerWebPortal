import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <>
            <div className="container-fluid p-0 login-page">
                <div className="row mx-auto h-100vh position-relative">
                    <div className="col-lg-6 p-0 h-100 d-none d-lg-block">
                        <div className="left d-flex align-items-center justify-content-center py-4">
                            <div className="">
                                <div className="text-center mb-5">
                                    <h3 className='text-white text-center'>eMessenger App <br />Download</h3>
                                </div>
                                <div className='login-image d-flex justify-content-center align-items-center'>
                                    <img src="Images\login image.png" alt="" />
                                </div>
                                <div className='login-bottom d-flex justify-content-center mt-5'>
                                    <img src="Images\lb.png" alt="" className='me-4' />
                                    <img src="Images\lb1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center pb-5">
                        <div className="container px-xl-5">
                            <div className='right py-4 row justify-content-center align-items-center'>
                                <img src="Images\e-logo.png" alt="" />
                                <h2 className="text-010A48 fw-semibold text-center">Hi, Welcome 👋</h2>
                                <p className='text-78828A text-center'>Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                            <form>
                                <div className="row d-flex justify-content-center px-xl-5">
                                    <div className="mb-4 col-10 px-4">
                                        <label for="exampleInputNumber" className="form-label">Enter registered mobile no</label>
                                        <input type="number" className="form-control text-8E8E8E py-2 fw-light rounded-3" id="exampleInputNumber"
                                            aria-describedby="emailHelp" placeholder='Enter mobile number'maxLength='10'/>
                                    </div>
                                    <div className="mb-4 col-10 px-4">
                                        <label for="exampleInputNumber1" className="form-label">Student ID</label>
                                        <input type="Number" className="form-control text-8E8E8E py-2 fw-light rounded-3" id="exampleInputNumber1" placeholder='Enter student ID' />
                                    </div>
                                    <div className='mb-4 col-10 px-4'>
                                        <Link to="/home" className="btn log-btn w-100 bg-E79C1D border-0 fw-semibold text-white py-2 rounded-3">Log In</Link>
                                    </div>
                                    <div className="sign-up text-center">
                                        <Link to="/" className='text-DA251C fw-semibold fs-6'>How to install App ?</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="d-lg-none bg-273341 login-bottom d-flex justify-content-center py-3 px-2 position-absolute start-0 bottom-0">
                        <img src="Images\lb.png" alt="" className='me-4' />
                        <img src="Images\lb1.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn