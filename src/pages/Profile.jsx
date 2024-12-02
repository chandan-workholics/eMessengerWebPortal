import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import callAPI, { interceptor } from "../Common_Method/api";
import { format } from "date-fns";

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState('')
    const [fees, setFees] = useState('')

    const getprofile = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(`./combine/getRelatedProfile?mobilenumber=${user?.mobile_no}`);

            if (response.data) {
                setProfile(response.data || []);
            } else {
                console.warn("No data received from API.")
                setProfile([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setProfile([]);
        } finally {
            setLoading(false)
        }
    }

    const getfees = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(`./fees/getFeesDetail?mobilenumber=${user?.mobile_no}`);

            if (response.data) {
                setFees(response.data || []);
            } else {
                console.warn("No data received from API.")
                setFees([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setFees([]);
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        getprofile();    // eslint-disable-next-line react-hooks/exhaustive-deps
        getfees();    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        sessionStorage.clear();
    }

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
                                    <p className='text-white mb-0 fs-6'> {user?.student_name ? user?.student_name : ''}</p>
                                    <p className='name mb-0 text-white'>{user?.mobile_no ? user?.mobile_no : ''}</p>
                                </div>
                            </div>
                            <div className='logout'>
                                <Link onClick={logout} to='/'>
                                    <button className='border-0 text-white bg-transparent'> <i class="fa-solid fa-right-from-bracket me-2"></i>Logout</button></Link>
                            </div>
                        </div>
                    </div>


                    {loading ? (
                        <p className="text-010A48 fw-normal mb-0">
                            Loading message...
                        </p>
                    ) : (
                        <>
                            <div className='row my-4'>
                                <div className="col-xl-4 mb-3">
                                    <div className="card px-3 py-4 bg-FAFAFA mb-xl-0">
                                        <h6 className='text-010A48'>Profile</h6>
                                        {profile?.data?.map((val, index) => {
                                            return (
                                                <>
                                                    <div key={index} className='card mb-2'>
                                                        <div className='d-flex justify-content-between align-items-center px-2 py-2'>
                                                            <div className='d-flex  align-items-center'>
                                                                <img src="Images/profile7.png" alt="" className='me-2' />
                                                                <p className='mb-0'><span className={`${val?.color} text-010A48`}>{val?.student_number} </span><br />
                                                                    <span className='text-666666 fw-normal name'> {val?.student_family_mobile_number}</span></p>
                                                            </div>
                                                            <div className='name'>
                                                                <p className='text-010A48 bg-E9E9E9 rounded-1 px-1 fw-semibold'>{val?.student_name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-xl-4 mb-3">
                                    <div className="card bg-FAFAFA py-3 px-3">
                                        <h6 className='text-010A48'>Outstanding Fees</h6>
                                        <div className="row">

                                            <div className="col-12">

                                                {fees?.data == null ? (
                                                    <p className="text-010A48 fw-normal mb-0">
                                                        No Data Found
                                                    </p>
                                                ) : (
                                                    <>
                                                        {fees?.data?.map((val, index) => {
                                                            return (
                                                                <>
                                                                    <div key={index} className="card mb-2">
                                                                        <div className="card-header d-flex justify-content-between pb-1 bg-white">
                                                                            <p className='mb-0'><span className='text-6B51E4 fw-semibold'>{val?.student?.student_number} - {val?.student?.student_name}</span><br />
                                                                                <span className='text-010A48 fw-normal'>{val?.student?.student_family_mobile_number}</span>
                                                                            </p>
                                                                            <div className='Pay-btn d-flex align-items-center'>
                                                                                <button className='border-0 bg-E79C1D text-white rounded-2 px-2'>Pay Now</button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body py-1 term">
                                                                            <p className='text-010A48 fw-semibold mb-0'>Term {val?.term}</p>
                                                                            <table className="table table-borderless mb-0">
                                                                                <tr>
                                                                                    <th className='text-FF0000 fw-normal'>Outstanding Fees</th>
                                                                                    <th className='text-FF0000 fw-normal'>: ₹ {val?.outstandingfees}</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className='text-010A48 fw-normal'>Due Date </td>
                                                                                    <td className='text-010A48 fw-normal'>:  {format(new Date(val?.duedate), "dd-MMM-yyyy")}</td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 mb-3">
                                    <div className="card bg-FAFAFA py-3 px-2">
                                        <h6 className='text-010A48'>All ID</h6>

                                        {profile?.data?.map((val, index) => {
                                            return (
                                                <>
                                                    <div key={index} className="card py-1 px-2 mb-2">
                                                        <p className='text-010A48 fw-semibold mb-0'>{val?.student_number} - {val?.student_name}</p>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </>
                    )}



                </div>
            </div >
        </>
    )
}

export default Profile