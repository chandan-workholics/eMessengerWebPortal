import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Header />
            <div className='bg-F4F4F4 home-page'>
                <div className="container">
                    <div className='row'>
                        <div className="col-12 head-top py-2">
                            <p className='text-010A48 fw-normal mb-0'>Lorem ipsum dolor sit amet sit Lorem ipsum dol Lorem ipsum dolor sit amet sit Lorem ipsum dolLorem ipsum dolor sit amet sit Lorem ipsum dolLorem ipsum dolor sit amet sit Lorem ipsum dol</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-3'>
                <div className="row">
                    <div className="col-xl-8 col-lg-12 mb-lg-2">
                        <ul className="nav nav-tabs border-0 justify-content-around" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link me-3 rounded-1 text-010A48 active home-tab-btn mb-lg-0 mb-2"
                                    id="day-tab-1"
                                    data-bs-toggle="tab"
                                    data-bs-target="#day-tab-1-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="day-tab-1-pane"
                                    aria-selected="true"
                                >
                                    Inbox
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link me-3 rounded-1 text-010A48 home-tab-btn mb-lg-0 mb-2"
                                    id="day-tab-2"
                                    data-bs-toggle="tab"
                                    data-bs-target="#day-tab-2-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="day-tab-2-pane"
                                    aria-selected="false"
                                >
                                    Last Day
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link me-3 rounded-1 text-010A48 home-tab-btn mb-lg-0 mb-2"
                                    id="day-tab-3"
                                    data-bs-toggle="tab"
                                    data-bs-target="#day-tab-3-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="day-tab-3-pane"
                                    aria-selected="false"
                                >
                                    Seen
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link me-3 rounded-1 text-010A48 home-tab-btn mb-lg-0 mb-2"
                                    id="day-tab-4"
                                    data-bs-toggle="tab"
                                    data-bs-target="#day-tab-4-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="day-tab-4-pane"
                                    aria-selected="false"
                                >
                                    Starred
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className='col-xl-4 col-lg-6 col-md-6'>
                        <div className="input-group mb-3">
                            <input type="search" className="form-control bg-EFEFEF border-end-0" placeholder="Search" aria-label="Username" />
                            <button className="input-group-text bg-EFEFEF"><i class="fa-solid fa-magnifying-glass"></i></button>                            </div>
                    </div>
                </div>
                <div className="pb-20">
                    <div className="tab-content" id="myTabContent">
                        <div
                            className="tab-pane fade show active"
                            id="day-tab-1-pane"
                            role="tabpanel"
                            aria-labelledby="day-tab-1"
                            tabindex="0"
                        >
                            <h6 className='text-010A48 fw-semibold m-0'>Session 2024-2025</h6>
                            <p className='text-5F5F5F mb-2'>Intimation -</p>
                            <div className='row'>
                                <div className="col-12">
                                    <Link to="/reply" className='text-decoration-none'>
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className='d-flex justify-content-between'>
                                                    <p className='mb-1'> <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                        <span className='text-6B51E4 fw-semibold'>Ram Yadav</span></p>
                                                    <div className='date'>
                                                        <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                    </div>
                                                </div>
                                                <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                                <div className='show d-flex justify-content-between'>
                                                    <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                    <div className='star'>
                                                        <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF79AE rounded-1 px-1 fw-semibold me-2 mb-2'>58585558</span>
                                                    <span className='text-FF79AE fw-semibold'>Sourabh yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>List of Books, Notebooks, and Stationery for the 2024-2025 Academic Year</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/chat" className='text-decoration-none'>
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className='d-flex justify-content-between'>
                                                    <p className='mb-1'><span className='box text-white bg-E79C1D rounded-1 px-1 fw-semibold me-2 mb-2'>88555888</span>
                                                        <span className='text-FFC068 fw-semibold'>Piyush yadav</span></p>
                                                    <div className='date'>
                                                        <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                    </div>
                                                </div>
                                                <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding group chat duration for biology subject</p>
                                                <div className='show d-flex justify-content-between'>
                                                    <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                    <div className='star'>
                                                        <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF0000 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-FF0000 fw-semibold'>Neha yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding rakshabandhan celebration notice</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'>
                                                    <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-6B51E4 fw-semibold'>Ram Yadav</span>
                                                </p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="day-tab-2-pane"
                            role="tabpane2"
                            aria-labelledby="day-tab-2"
                            tabindex="0"
                        >
                            <h6 className='text-010A48 fw-semibold m-0'>Session 2025-2026</h6>
                            <p className='text-5F5F5F mb-2'>Intimation -</p> 
                            <div className='row'>
                                <div className="col-12">
                                    <Link to="/reply" className='text-decoration-none'>
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className='d-flex justify-content-between'>
                                                    <p className='mb-1'> <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                        <span className='text-6B51E4 fw-semibold'>Ram Yadav</span></p>
                                                    <div className='date'>
                                                        <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                    </div>
                                                </div>
                                                <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                                <div className='show d-flex justify-content-between'>
                                                    <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                    <div className='star'>
                                                        <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF79AE rounded-1 px-1 fw-semibold me-2 mb-2'>58585558</span>
                                                    <span className='text-FF79AE fw-semibold'>Sourabh yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>List of Books, Notebooks, and Stationery for the 2024-2025 Academic Year</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/chat" className='text-decoration-none'>
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className='d-flex justify-content-between'>
                                                    <p className='mb-1'><span className='box text-white bg-E79C1D rounded-1 px-1 fw-semibold me-2 mb-2'>88555888</span>
                                                        <span className='text-FFC068 fw-semibold'>Piyush yadav</span></p>
                                                    <div className='date'>
                                                        <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                    </div>
                                                </div>
                                                <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding group chat duration for biology subject</p>
                                                <div className='show d-flex justify-content-between'>
                                                    <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                    <div className='star'>
                                                        <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF0000 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-FF0000 fw-semibold'>Neha yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding rakshabandhan celebration notice</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'>
                                                    <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-6B51E4 fw-semibold'>Ram Yadav</span>
                                                </p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tab-pane fade"
                            id="day-tab-3-pane"
                            role="tabpane3"
                            aria-labelledby="day-tab-3"
                            tabindex="0"
                        >
                            <h6 className='text-010A48 fw-semibold m-0'>Session 2024-2025</h6>
                            <p className='text-5F5F5F mb-2'>Intimation -</p>
                            <div className='row'>
                                <div className="col-12">
                                <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'> <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-6B51E4 fw-semibold'>Ram Yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF79AE rounded-1 px-1 fw-semibold me-2 mb-2'>58585558</span>
                                                    <span className='text-FF79AE fw-semibold'>Sourabh yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>List of Books, Notebooks, and Stationery for the 2024-2025 Academic Year</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-E79C1D rounded-1 px-1 fw-semibold me-2 mb-2'>88555888</span>
                                                    <span className='text-FFC068 fw-semibold'>Piyush yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding group chat duration for biology subject</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF0000 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-FF0000 fw-semibold'>Neha yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding rakshabandhan celebration notice</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'>
                                                    <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-6B51E4 fw-semibold'>Ram Yadav</span>
                                                </p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tab-pane fade"
                            id="day-tab-4-pane"
                            role="tabpane4"
                            aria-labelledby="day-tab-4"
                            tabindex="0"
                        >
                            <h6 className='text-010A48 fw-semibold m-0'>Session 2024-2025</h6>
                            <p className='text-5F5F5F mb-2'>Intimation -</p>
                            <div className='row'>
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'> <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-6B51E4 fw-semibold'>Ram Yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF79AE rounded-1 px-1 fw-semibold me-2 mb-2'>58585558</span>
                                                    <span className='text-FF79AE fw-semibold'>Sourabh yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>List of Books, Notebooks, and Stationery for the 2024-2025 Academic Year</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-E79C1D rounded-1 px-1 fw-semibold me-2 mb-2'>88555888</span>
                                                    <span className='text-FFC068 fw-semibold'>Piyush yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding group chat duration for biology subject</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'><span className='box text-white bg-FF0000 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-FF0000 fw-semibold'>Neha yadav</span></p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>Information regarding rakshabandhan celebration notice</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <p className='mb-1'>
                                                    <span className='box text-white bg-6B51E4 rounded-1 px-1 fw-semibold me-2 mb-2'>21102933</span>
                                                    <span className='text-6B51E4 fw-semibold'>Ram Yadav</span>
                                                </p>
                                                <div className='date'>
                                                    <p className='text-5F5F5F mb-1'><i class="fa-regular fa-calendar text-FF79AE me-1"></i>01 Aug 2024</p>
                                                </div>
                                            </div>
                                            <p className='text-010A48 fs-6 mb-2 lh-1'>The text informs about the deadlines for making fee payments for the 2nd Quarter.</p>
                                            <div className='show d-flex justify-content-between'>
                                                <p className='text-5F5F5F mb-0'>Show Upto: 2024-09-30 11:45:00</p>
                                                <div className='star'>
                                                    <i class="fa-regular fa-star text-FFC068 fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home