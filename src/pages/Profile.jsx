import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <>
            <Header />
            <div className="container-fluid p-0 profile-page">
                <div className='container'>
                    <div className='profile-head px-3 my-4 py-1'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex  align-items-center'>
                                <img src="Images/profile.png" alt="" className='me-2' />
                                <div className="id-name">
                                    <p className='text-white mb-0 fs-6'> Ram Yadav</p>
                                    <p className='name mb-0 text-white'>7415309294</p>
                                </div>
                            </div>
                            <div className='logout'>
                                <Link to='/'>
                                    <button className='border-0 text-white bg-transparent'> <i class="fa-solid fa-right-from-bracket me-2"></i>Logout</button></Link>
                            </div>
                        </div>
                    </div>

                    <div className='row my-4'>
                        <div className="col-xl-4">
                            <div className="card px-3 py-4 bg-FAFAFA mb-xl-0 mb-3">
                                <h6 className='text-010A48'>Profile</h6>
                                <div className='card mb-4'>
                                    <div className='d-flex justify-content-between align-items-center px-2 py-2'>
                                        <div className='d-flex  align-items-center'>
                                            <img src="Images/profile7.png" alt="" className='me-2' />
                                            <p className='mb-0'><span className='text-010A48 fw-semibold Id'> 21102933</span><br />
                                                <span className='text-666666 fw-normal name'> 9752745292</span></p>
                                        </div>
                                        <div className='name'>
                                            <p className='text-010A48 bg-E9E9E9 rounded-1 px-1 fw-semibold'>Piyush yadav</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='card mb-4'>
                                    <div className='d-flex justify-content-between align-items-center px-2 py-2'>
                                        <div className='d-flex  align-items-center'>
                                            <img src="Images/profile.png" alt="" className='me-2' />
                                            <p className='mb-0'><span className='text-010A48 fw-semibold Id'> 88555888</span><br />
                                                <span className='text-666666 fw-normal name'> 9752745292</span></p>
                                        </div>
                                        <div className='name'>
                                            <p className='text-010A48 bg-E9E9E9 rounded-1 px-1 fw-semibold'>Ram yadav</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='d-flex justify-content-between align-items-center px-2 py-2'>
                                        <div className='d-flex  align-items-center'>
                                            <img src="Images/profile8.png" alt="" className='me-2' />
                                            <p className='mb-0'><span className='text-010A48 fw-semibold Id'> 4646464</span><br />
                                                <span className='text-666666 fw-normal name'> 9752745292</span></p>
                                        </div>
                                        <div className='name'>
                                            <p className='text-010A48 bg-E9E9E9 rounded-1 px-1 fw-semibold'>Neha yadav</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card bg-FAFAFA py-3 px-3">
                                <h6 className='text-010A48'>Outstanding Fees</h6>
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="card mb-2">
                                            <div className="card-header d-flex justify-content-between pb-1 pb-sm-0 bg-white">
                                                <p className='mb-0'><span className='text-6B51E4 fw-semibold'>21102933 - Piyush yadav</span><br />
                                                    <span className='text-010A48 fw-normal'>Session 2024-2025</span>
                                                </p>
                                                <div className='pay-btn'>
                                                    <button className='border-0 bg-E79C1D text-white rounded-2 px-2'>Pay Now</button>
                                                </div>
                                            </div>
                                            <div className="card-body py-1 term">
                                                <p className='text-010A48 fw-semibold mb-0'>Term 1</p>
                                                <table className="table table-borderless mb-0">
                                                    <tr>
                                                        <th className='text-FF0000 fw-normal'>Outstanding Fees</th>
                                                        <th className='text-FF0000 fw-normal'>:  25,0000</th>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-010A48 fw-normal'>Due Date </td>
                                                        <td className='text-010A48 fw-normal'>:  14 Aug 2024</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card mb-lg-0 mb-2">
                                            <div className="card-header d-flex justify-content-between pb-1 bg-white">
                                                <p className='mb-0'><span className='text-6B51E4 fw-semibold'>21102933 - Piyush yadav</span><br />
                                                    <span className='text-010A48 fw-normal'>Session 2024-2025</span>
                                                </p>
                                                <div className='pay-btn'>
                                                    <button className='border-0 bg-E79C1D text-white rounded-2 px-2'>Pay Now</button>
                                                </div>
                                            </div>
                                            <div className="card-body py-1 term">
                                                <p className='text-010A48 fw-semibold mb-0'>Term 1</p>
                                                <table className="table table-borderless mb-0">
                                                    <tr>
                                                        <th className='text-FF0000 fw-normal'>Outstanding Fees</th>
                                                        <th className='text-FF0000 fw-normal'>:  25,0000</th>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-010A48 fw-normal'>Due Date </td>
                                                        <td className='text-010A48 fw-normal'>:  14 Aug 2024</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card mb-2">
                                            <div className="card-header d-flex justify-content-between pb-1 pb-sm-0 bg-white">
                                                <p className='mb-0'><span className='text-FF79AE fw-semibold'>2635546 - Neha yadav</span><br />
                                                    <span className='text-010A48 fw-normal'>Session 2024-2025</span>
                                                </p>
                                                <div className='pay-btn'>
                                                    <button className='border-0 bg-E79C1D text-white rounded-2 px-2'>Pay Now</button>
                                                </div>
                                            </div>
                                            <div className="card-body py-1 term">
                                                <p className='text-010A48 fw-semibold mb-0'>Term 2</p>
                                                <table className="table table-borderless mb-0">
                                                    <tr>
                                                        <th className='text-FF0000 fw-normal'>Outstanding Fees</th>
                                                        <th className='text-FF0000 fw-normal'>:  25,0000</th>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-010A48 fw-normal'>Due Date </td>
                                                        <td className='text-010A48 fw-normal'>:  14 Aug 2024</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card mb-lg-0 mb-2">
                                            <div className="card-header d-flex justify-content-between pb-1 bg-white">
                                                <p className='mb-0'><span className='text-FF79AE fw-semibold'>2635546 - Neha yadav</span><br />
                                                    <span className='text-010A48 fw-normal'>Session 2024-2025</span>
                                                </p>
                                                <div className='pay-btn'>
                                                    <button className='border-0 bg-E79C1D text-white rounded-2 px-2'>Pay Now</button>
                                                </div>
                                            </div>
                                            <div className="card-body py-1 term">
                                                <p className='text-010A48 fw-semibold mb-0'>Term 2</p>
                                                <table className="table table-borderless mb-0">
                                                    <tr>
                                                        <th className='text-FF0000 fw-normal'>Outstanding Fees</th>
                                                        <th className='text-FF0000 fw-normal'>:  25,0000</th>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-010A48 fw-normal'>Due Date </td>
                                                        <td className='text-010A48 fw-normal'>:  14 Aug 2024</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-4">
                            <div className="card bg-FAFAFA py-3 px-3">
                                <h6 className='text-010A48'>All ID</h6>
                                <div className="card py-1 px-2 mb-2">
                                    <p className='text-010A48 fw-semibold mb-0'>21102933 - Piyush yadav</p>
                                </div>
                                <div className="card py-1 px-2 mb-2">
                                    <p className='text-010A48 fw-semibold mb-0'>2635546  - Neha yadav</p>
                                </div>
                                <div className="card py-1 px-2">
                                    <p className='text-010A48 fw-semibold mb-0'>2635546 - Ram yadav</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile