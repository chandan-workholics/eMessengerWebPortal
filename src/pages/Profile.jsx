import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import callAPI, { interceptor } from "../Common_Method/api";
import { format } from "date-fns";

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [loading, setLoading] = useState(true);
    const [appScrollNewsList, setAppScrollNewsList] = useState([]);
    const [profile, setProfile] = useState('');
    const [fees, setFees] = useState('');

    const getprofile = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./combine/getRelatedProfile?mobilenumber=${user?.mobile_no}`);

            if (response.data) {
                setProfile(response.data || []);
            } else {
                console.warn("No data received from API.");
                setProfile([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setProfile([]);
        } finally {
            setLoading(false);
        }
    }


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./combine/getCombineHomePageDetail/${user?.sch_short_nm}/${user?.mobile_no}`);
            if (response.data) {
                setAppScrollNewsList(response.data || []);
            } else {
                console.warn("No data received from API.");
                setAppScrollNewsList([]);
            }
        } catch (error) {
            console.error("Error fetching scroller messages:", error.message);
            setAppScrollNewsList([]);
        } finally {
            setLoading(false);
        }
    };

    const getfees = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./fees/getFeesDetail?mobilenumber=${user?.mobile_no}`);

            if (response.data) {
                setFees(response.data || []);
            } else {
                console.warn("No data received from API.");
                setFees([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setFees([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getprofile(); // eslint-disable-next-line react-hooks/exhaustive-deps
        getfees(); // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        sessionStorage.clear();
    }

    const updateStudentStatus = async (student_main_id, mobile, status) => {
        const raw = {
            student_main_id: student_main_id,
            mobile: mobile,
            status: status
        };
        try {
            const response = await callAPI.post("/combine/updateStudentTabStatus", raw);
            if (response?.data) {
                console.log("Status updated successfully:", response.data);
                getprofile();
            } else {
                console.error("Failed to update status:", response);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handlePayNow = async (studentId, studentDOB, studentMail) => {
        const requestOptions = {
            method: "POST",
            redirect: "follow",
        };

        const url = `https://pay.actindore.com/payfees.php?payment_for=1&scholar_no=${studentId}&birth_date=${studentDOB}&email_id=${studentMail}`;

        try {
            const response = await fetch(url, requestOptions);
            const result = await response.text();
            console.log("Payment result:", result);
            alert("Payment initiated successfully!");
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Failed to initiate payment. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid p-0 profile-page">
                <div className='container'>
                    <div className='profile-head px-3 my-4 py-1'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex  align-items-center'>
                                <img src="Images/profile.png" alt="" className='me-2' />
                            </div>
                            <div className='logout'>
                                <Link onClick={logout} to='/'>
                                    <button className='border-0 text-white bg-transparent'>
                                        <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-010A48 fw-normal mb-0">Loading message...</p>
                    ) : (
                        <>
                            <div className='row my-4'>
                                <div className="col-xl-4 mb-3">
                                    <div className="card border-0 shadow-sm rounded-3 p-3 pb-2 bg-FAFAFA mb-xl-0">
                                        <h6 className='text-010A48'>Profile</h6>
                                        <div className="card border-0 rounded-3 shadow-sm mb-3">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img src={appScrollNewsList?.data?.schoolDetail?.logo_img} alt="" className="w-50 mb-3" />
                                                </div>
                                                <h6 className="fw-bolder">{appScrollNewsList?.data?.schoolDetail?.sch_nm}</h6>
                                                <h6 className="">{appScrollNewsList?.data?.schoolDetail?.address}</h6>
                                                <h6 className="">{appScrollNewsList?.data?.schoolDetail?.contact_no}</h6>
                                                <h6 className="">{appScrollNewsList?.data?.schoolDetail?.website}</h6>
                                                <h6 className="">{appScrollNewsList?.data?.schoolDetail?.email_id}</h6>
                                            </div>
                                        </div>
                                        {profile?.data?.map((val, index) => (
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
                                        ))}
                                    </div>
                                </div>
                                <div className="col-xl-4 mb-3">
                                    <div className="card rounded-3 border-0 shadow-sm bg-FAFAFA pb-2 p-3">
                                        <h6 className='text-010A48'>Outstanding Fees</h6>
                                        <div className="row">
                                            <div className="col-12">
                                                {fees?.data == null ? (
                                                    <p className="text-010A48 fw-normal mb-0">No Data Found</p>
                                                ) : (
                                                    fees?.data?.map((val, index) => (
                                                        <div key={index} className="card border-0 rounded-3 shadow-sm mb-3">
                                                            <div className="card-header border-0 d-flex justify-content-between p-2 pb-1 bg-white">
                                                                <div className="">
                                                                    <h6 className='mb-0 text-6B51E4 fw-medium'>{val?.student?.student_number} - {val?.student?.student_name}</h6>
                                                                    <h6 className='mb-0 text-010A48 fw-normal'>{val?.session_detail}</h6>
                                                                </div>
                                                                <div className='Pay-btn d-flex align-items-start'>
                                                                    <button
                                                                        className='border-0 bg-E79C1D text-white rounded-2 px-2'
                                                                        onClick={() => handlePayNow(val?.student?.student_number, val?.student?.student_dob, val?.student?.student_email)}
                                                                    >
                                                                        Pay Now
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="card-body p-2 term">
                                                                <h6 className='text-010A48 fw-medium mb-1'>Term {val?.term}</h6>
                                                                <table className="table table-borderless mb-0">
                                                                    <tr>
                                                                        <td className='fw-normal'><h6 className='fw-normal text-FF0000 mb-1 p-0'>Outstanding Fees</h6></td>
                                                                        <td className='fw-normal'><h6 className='fw-normal text-FF0000 mb-1 p-0'>: ₹ {val?.outstandingfees === 0 ? "Paid" : val?.outstandingfees}</h6></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className='fw-normal'><h6 className='fw-normal text-010A48 mb-0 p-0'>Due Date</h6></td>
                                                                        <td className='fw-normal'>
                                                                            <h6 className='fw-normal text-010A48 mb-0 p-0'>
                                                                                : {val?.duedate
                                                                                    ? (() => {
                                                                                        const [day, month, year] = val.duedate.split("/");
                                                                                        const parsedDate = new Date(`${year}-${month}-${day}`);
                                                                                        return isNaN(parsedDate) ? "Invalid Date" : format(parsedDate, "dd-MMM-yyyy");
                                                                                    })()
                                                                                    : "N/A"}
                                                                            </h6>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 mb-3">
                                    <div className="card border-0 shadow-sm rounded-3 bg-FAFAFA p-3 pb-2">
                                        <h6 className="text-010A48">All ID</h6>
                                        {profile?.data?.map((val, index) => (
                                            <div
                                                key={index}
                                                className={`card border-0 rounded-3 shadow-sm mb-3 py-1 px-2 ${val?.tab_active_status === 1 ? "active" : ""}`}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    updateStudentStatus(val.student_main_id, user.mobile_no, val.tab_active_status === 1 ? 0 : 1)
                                                }
                                            >
                                                <p className="text-010A48 fw-semibold mb-0">
                                                    {val?.student_number} - {val?.student_name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
