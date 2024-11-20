import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Reply = () => {
    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h6 className='text-1F2C37 fw-normal mb-0'>21102933 - Ram yadav</h6>
                    </div>
                </div>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="card px-3 py-3 bg-FAFAFA rounded-3 me-2 border-0 mb-lg-0 mb-2">
                                <h6 className='text-010A48 mb-0 fw-semibold'>Loraum ipsum</h6>
                                <p className='text-5F5F5F time'>Show Upto: 2024-09-30 11:45:00</p>
                                <img src="Images/Reply.png" alt="" className='mb-2' />
                                <Link to='' className='mb-2 fs-14'>https://www.google.com/search?sca_esv=ba9a00bd53z</Link>
                                <div className="image-btn d-flex">
                                    <button className='rounded-2 text-white bg-E79C1D px-lg-2 px-1 py-1  me-3 fs-14 Add-btn'>Add Image</button>
                                    <button className='rounded-2 text-white bg-4CD964 px-2 py-1  me-2 fs-14 Remove-btn'>Remove image</button>
                                </div>
                                <div className="card border-e0e0e0 px-2 py-2 my-4">
                                    <img src="Images/reply1.png" alt="" className='mb-1' />
                                    <p className='text-010A48 mb-0 fw-semibold check-name'>Lorem ipsum dolor sit amet,consectetur aliquip</p>
                                    <Link to='' className='text-decoration-none time'><i class="fa-brands fa-youtube text-FF0000 me-2"></i>View Youtube</Link>
                                </div>
                                <img src="Images/reply2.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="card px-3 py-4 bg-FAFAFA rounded-3 border-0">
                                <form>
                                    <div className="mb-3">
                                        <label for="exampleInputText" className="form-label text-010A48 check-name">Input 1</label>
                                        <input type="text" className="form-control" id="exampleInputText" aria-describedby="emailHelp" />                                    </div>
                                </form>
                                <form>
                                    <div className="mb-3">
                                        <label for="exampleInputText" className="form-label text-010A48 check-name">Input 2</label>
                                        <input type="text" className="form-control" id="exampleInputText" aria-describedby="emailHelp" />                                    </div>
                                </form>
                                <p className='text-010A48 fw-normal mb-0 check-name'>Lorum ipsum</p>
                                <div className="form-check">
                                    <input className="form-check-input active" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios1">
                                        Jacob Jones
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios2">
                                        Courtney Henry
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option2" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios3">
                                        Darlene Robertson
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option2" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios4">
                                        Theresa Webb
                                    </label>
                                </div>
                                <p className='text-010A48 fw-normal mb-0 check-name'>Lorum ipsum</p>
                                <p className='text-5F5F5F fs-14'>Information regarding rakshabandhan celebration notice</p>
                                <button className='border-0 bg-FF0000 text-white rounded-5 py-1 check-name Send-btn'>Send Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reply