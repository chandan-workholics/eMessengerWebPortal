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
                                    {/* <div className="">
                                        <h6 className='text-white mb-0'> {user?.student_name ? user?.student_name : ''}</h6>
                                        <h6 className='name mb-0 text-white mb-0'>{user?.mobile_no ? user?.mobile_no : ''}</h6>
                                    </div> */}
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
                                    <div className="card border-0 shadow-sm rounded-3 p-3 pb-2 bg-FAFAFA mb-xl-0">
                                        <h6 className='text-010A48'>Profile</h6>
                                        {profile?.data?.map((val, index) => {
                                            return (
                                                <>
                                                    <div key={index} className='card border-0 rounded-3 shadow-sm mb-3'>
                                                        <div className='d-flex justify-content-between align-items-center px-2 py-2'>
                                                            <div className='d-flex  align-items-center'>
                                                                <img src="Images/profile7.png" alt="" className='me-2' />
                                                                <div className="">
                                                                    <h6 className={`${val?.color} text-010A48 mb-0`}>{val?.student_number} </h6>
                                                                    <h6 className='text-666666 fw-normal name mb-0'> {val?.student_family_mobile_number}</h6>
                                                                </div>
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
                                    <div className="card rounded-3 border-0 shadow-sm bg-FAFAFA pb-2 p-3">
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
                                                                    <div key={index} className="card border-0 rounded-3 shadow-sm mb-3">
                                                                        <div className="card-header border-0 d-flex justify-content-between p-2 pb-1 bg-white">
                                                                            <div className="">
                                                                                <h6 className='mb-0 text-6B51E4 fw-medium'>{val?.student?.student_number} - {val?.student?.student_name}</h6>
                                                                                <h6 className='mb-0 text-010A48 fw-normal'>{val?.session_detail}</h6>
                                                                            </div>
                                                                            <div className='Pay-btn d-flex align-items-start'>
                                                                                <button className='border-0 bg-E79C1D text-white rounded-2 px-2'>Pay Now</button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body p-2 term">
                                                                            <h6 className='text-010A48 fw-medium mb-1'>Term {val?.term}</h6>
                                                                            <table className="table table-borderless mb-0">
                                                                                <tr>
                                                                                    <td className='fw-normal'><h6 className='fw-normal text-FF0000 mb-1 p-0'>Outstanding Fees</h6></td>
                                                                                    <td className='fw-normal'><h6 className='fw-normal text-FF0000 mb-1 p-0'>: ₹ {val?.outstandingfees}</h6></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className='fw-normal'><h6 className='fw-normal text-010A48 mb-0 p-0'>Due Date</h6></td>
                                                                                    <td className='fw-normal'><h6 className='fw-normal text-010A48 mb-0 p-0'>:  {format(new Date(val?.duedate), "dd-MMM-yyyy")}</h6></td>
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
                                    <div className="card border-0 shadow-sm rounded-3 bg-FAFAFA p-3 pb-2">
                                        <h6 className='text-010A48'>All ID</h6>

                                        {profile?.data?.map((val, index) => {
                                            return (
                                                <>
                                                    <div key={index} className="card border-0 rounded-3 shadow-sm mb-3 py-1 px-2">
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