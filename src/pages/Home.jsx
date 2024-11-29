import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import callAPI, { interceptor } from "../Common_Method/api";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [noticeBoardDetail, setNoticeBoardDetail] = useState([]);
    const [message, setMessage] = useState([]);
    const [lastdaymessage, setLastdaymessage] = useState([]);
    const [seenmessage, setSeenmessage] = useState([]);
    const [starredmessage, setStarredmessage] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    // Filter messages for the first tab
    const filteredMessages = message?.data?.filter((val) => {
        const studentName = val?.student?.student_name?.toLowerCase() || "";
        const subjectText = val?.msg_mst?.subject_text?.toLowerCase() || "";
        return (
            studentName.includes(searchQuery.toLowerCase()) ||
            subjectText.includes(searchQuery.toLowerCase())
        );
    });

    // Filter messages for the second tab
    const filteredLastDayMessages = lastdaymessage?.data?.filter((val) => {
        const studentName = val?.student?.student_name?.toLowerCase() || "";
        const subjectText = val?.msg_mst?.subject_text?.toLowerCase() || "";
        return (
            studentName.includes(searchQuery.toLowerCase()) ||
            subjectText.includes(searchQuery.toLowerCase())
        );
    });

    // Filter messages for the third tab
    const filteredSeenmessage = seenmessage?.data?.filter((val) => {
        const studentName = val?.student?.student_name?.toLowerCase() || "";
        const subjectText = val?.msg_mst?.subject_text?.toLowerCase() || "";
        return (
            studentName.includes(searchQuery.toLowerCase()) ||
            subjectText.includes(searchQuery.toLowerCase())
        );
    });

    // Filter messages for the forth tab
    const filteredStarredmessage = starredmessage?.data?.filter((val) => {
        const studentName = val?.student?.student_name?.toLowerCase() || "";
        const subjectText = val?.msg_mst?.subject_text?.toLowerCase() || "";
        return (
            studentName.includes(searchQuery.toLowerCase()) ||
            subjectText.includes(searchQuery.toLowerCase())
        );
    });

    const user = JSON.parse(sessionStorage.getItem("user"));

    const toggleStarStatus = async (id, currentStatus) => {
        try {
            interceptor();
            const newStatus = currentStatus === 1 ? 0 : 1; // Toggle between 1 and 0
            await callAPI.put(`./msg/staredStatusUpdateMsgDetail/${id}`, {
                star_status: newStatus,
            });
            // Optimistically update UI by mutating the local state
            message.data = message.data.map((item) =>
                item.id === id ? { ...item, is_starred: newStatus } : item
            );
            fetchMessage();
            fetchStarredMessage();
        } catch (error) {
            console.error("Error updating star status:", error);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./combine/getCombineHomePageDetail/${user?.sch_short_nm}/${user?.mobile_no}`
            );

            if (response.data) {
                setNoticeBoardDetail(response.data || []);
            } else {
                console.warn("No data received from API.");
                setNoticeBoardDetail([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setNoticeBoardDetail([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessage = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./msg/getInboxMsgDetail/${user?.mobile_no}`
            );

            if (response.data) {
                setMessage(response.data || []);
            } else {
                console.warn("No data received from API.");
                setMessage([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setMessage([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchlastDayMessage = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./msg/getLastdayMsgDetail/${user?.mobile_no}`
            );

            if (response.data) {
                setLastdaymessage(response.data || []);
            } else {
                console.warn("No data received from API.");
                setLastdaymessage([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setLastdaymessage([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchSeenMessage = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./msg/getSeenMsgDetail/${user?.mobile_no}`
            );

            if (response.data) {
                setSeenmessage(response.data || []);
            } else {
                console.warn("No data received from API.");
                setSeenmessage([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setSeenmessage([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchStarredMessage = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./msg/getStaredMsgDetail/${user?.mobile_no}`
            );

            if (response.data) {
                setStarredmessage(response.data || []);
            } else {
                console.warn("No data received from API.");
                setStarredmessage([]);
            }
        } catch (error) {
            console.error("Error fetching Notice Board messages:", error.message);
            setStarredmessage([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchMessage(); // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchlastDayMessage();
        fetchSeenMessage();
        fetchStarredMessage();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-F4F4F4 home-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 head-top py-1">
                            {loading ? (
                                <p className="text-010A48 fw-normal mb-0">Loading message...</p>
                            ) : (
                                <p className="text-010A48 fw-normal mb-0">
                                    {noticeBoardDetail?.data?.noticeMsg?.map((item, index) => (
                                        <span key={index} className="me-4">
                                            {item?.student_name}-{item?.noticeMsg}
                                        </span>
                                    ))}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0 shadow-sm">
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12 mb-lg-2 pe-lg-4 pe-xl-5">
                            <ul
                                className="nav nav-tabs border-0 justify-content-between"
                                id="myTab"
                                role="tablist"
                            >
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link me-3 rounded-2 text-010A48 active home-tab-btn mb-lg-0 mb-2 me-lg-0 me-auto"
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
                                        className="nav-link me-3 rounded-2 text-010A48 home-tab-btn mb-lg-0 mb-2 me-lg-0 me-auto"
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
                                        className="nav-link me-3 rounded-2 text-010A48 home-tab-btn mb-lg-0 mb-2 me-lg-0 me-auto"
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
                                        className="nav-link me-3 rounded-2 text-010A48 home-tab-btn mb-lg-0 mb-2 me-lg-0 me-auto"
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
                        <div className="col-xl-4 col-lg-6 col-md-6 mt-2 mt-xl-0">
                            <div className=" mb-3 position-relative">
                                <input
                                    type="search"
                                    className="form-control bg-F4F4F4 border rounded"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <i className="fa-solid fa-magnifying-glass text-797979 position-absolute end-0 top-0" style={{ marginTop: "11px", marginRight: '11px' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div className="container pt-3">
                    <div className="pb-20">
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="day-tab-1-pane"
                                role="tabpanel"
                                aria-labelledby="day-tab-1"
                                tabIndex="0"
                            >
                                <h6 className="text-010A48 fw-semibold m-0">Session 2024-2025</h6>
                                <p className="text-5F5F5F mb-2">Intimation -</p>
                                <div className="row">
                                    {filteredMessages?.map((val) => {
                                        const showUpto = val?.msg_mst?.show_upto;
                                        const formattedDate = showUpto
                                            ? format(new Date(showUpto), "dd-MMM-yyyy")
                                            : "N/A";
                                        return (
                                            <div className="col-12 mb-4" key={val?.msg_id}>
                                                <Link
                                                    to={`/reply/${val?.msg_id}/${val?.sended_msg_id}`}
                                                    className="text-decoration-none"
                                                >
                                                    <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <h6 className="mb-1">
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: val?.student?.color,
                                                                        }}
                                                                        className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                    >
                                                                        {val?.student?.student_number}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            color: val?.student?.color || "#000000",
                                                                        }}
                                                                        className="fs-18 fw-semibold"
                                                                    >
                                                                        {val?.student?.student_name}
                                                                    </span>
                                                                </h6>
                                                                <div className="date">
                                                                    <p className="text-5F5F5F mb-1">
                                                                        <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                        {format(new Date(val?.sended_date), "dd-MMM-yyyy")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <h6 className="text-010A48 fs-6 mb-1 lh-1 text-wrap">
                                                                    {val?.msg_mst?.subject_text}
                                                                </h6>
                                                            </div>
                                                            <div className="show d-flex justify-content-between align-items-end">
                                                                <p className="text-5F5F5F mb-0">
                                                                    Show Upto: {formattedDate}
                                                                </p>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        to={`/chat/${val?.msg_mst?.msg_chat_type}/${val?.msg_id}/${val?.student?.student_main_id}`}
                                                                        className="me-2"
                                                                    >
                                                                        <img
                                                                            src="Images/chat-icon.png"
                                                                            alt=""
                                                                            className=""
                                                                        />
                                                                    </Link>
                                                                    <Link className="star">
                                                                        <i
                                                                            className={`fa-star fs-4 mt-1 ${val?.is_starred === 1
                                                                                ? "fa-solid text-warning"
                                                                                : "fa-regular text-FFC068"
                                                                                }`}
                                                                            onClick={() =>
                                                                                toggleStarStatus(
                                                                                    val?.sended_msg_id,
                                                                                    val?.is_starred
                                                                                )
                                                                            }
                                                                            style={{ cursor: "pointer" }}
                                                                        ></i>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div
                                className="tab-pane fade"
                                id="day-tab-2-pane"
                                role="tabpane2"
                                aria-labelledby="day-tab-2"
                                tabIndex="0"
                            >
                                <h6 className="text-010A48 fw-semibold m-0">Session 2025-2026</h6>
                                <p className="text-5F5F5F mb-2">Intimation -</p>
                                <div className="row">
                                    {filteredLastDayMessages?.map((val) => {
                                        const showUpto = val?.msg_mst?.show_upto;
                                        const formattedDate = showUpto
                                            ? format(new Date(showUpto), "dd-MMM-yyyy")
                                            : "N/A";
                                        return (
                                            <div className="col-12 mb-4" key={val?.msg_id}>
                                                <Link
                                                    to={`/reply/${val?.msg_id}/${val?.sended_msg_id}`}
                                                    className="text-decoration-none"
                                                >
                                                    <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <h6 className="mb-1">
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: val?.student?.color,
                                                                        }}
                                                                        className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                    >
                                                                        {val?.student?.student_number}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            color: val?.student?.color || "#000000",
                                                                        }}
                                                                        className="fs-18 fw-semibold"
                                                                    >
                                                                        {val?.student?.student_name}
                                                                    </span>
                                                                </h6>
                                                                <div className="date">
                                                                    <p className="text-5F5F5F mb-1">
                                                                        <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                        {format(new Date(val?.sended_date), "dd-MMM-yyyy")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h6 className="text-010A48 fs-6 mb-1 lh-1 text-wrap">
                                                                    {val?.msg_mst?.subject_text}
                                                                </h6>
                                                            </div>
                                                            <div className="show d-flex justify-content-between align-items-end">
                                                                <p className="text-5F5F5F mb-0">
                                                                    Show Upto: {formattedDate}
                                                                </p>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        to={`/chat/${val?.msg_id}/${val?.student?.student_main_id}`}
                                                                        className="me-2"
                                                                    >
                                                                        <img
                                                                            src="Images/chat-icon.png"
                                                                            alt=""
                                                                            className=""
                                                                        />
                                                                    </Link>
                                                                    <Link className="star">
                                                                        <i
                                                                            className={`fa-star fs-4 mt-1 ${val?.is_starred === 1
                                                                                ? "fa-solid text-warning"
                                                                                : "fa-regular text-FFC068"
                                                                                }`}
                                                                            onClick={() =>
                                                                                toggleStarStatus(
                                                                                    val?.sended_msg_id,
                                                                                    val?.is_starred
                                                                                )
                                                                            }
                                                                            style={{ cursor: "pointer" }}
                                                                        ></i>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div
                                className="tab-pane fade"
                                id="day-tab-3-pane"
                                role="tabpane3"
                                aria-labelledby="day-tab-3"
                                tabIndex="0"
                            >
                                <h6 className="text-010A48 fw-semibold m-0">
                                    Session 2024-2025
                                </h6>
                                <p className="text-5F5F5F mb-2">Intimation -</p>
                                <div className="row">
                                    {filteredSeenmessage?.map((val) => {
                                        const showUpto = val?.msg_mst?.show_upto;
                                        const formattedDate = showUpto ? format(new Date(showUpto), "dd-MMM-yyyy") : "N/A";
                                        return (
                                            <>
                                                <div className="col-12 mb-4">
                                                    <Link to={`/reply/${val?.msg_id}/${val?.sended_msg_id}`} className="text-decoration-none">
                                                        <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between mb-2">
                                                                    <h6 className="mb-1">
                                                                        {" "}
                                                                        <span
                                                                            style={{ backgroundColor: val?.student?.color }}
                                                                            className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                        >
                                                                            {val?.student?.student_number}
                                                                        </span>

                                                                        <span style={{ color: val?.student?.color || "#000000" }} className="fs-18 fw-semibold">
                                                                            {val?.student?.student_name}
                                                                        </span>
                                                                    </h6>
                                                                    <div className="date">
                                                                        <p className="text-5F5F5F mb-1">
                                                                            <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                            {format(new Date(val?.sended_date), "dd-MMM-yyyy")}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <h6 className="text-010A48 fs-6 mb-1 lh-1 text-wrap">
                                                                        {val?.msg_mst?.subject_text}
                                                                    </h6>
                                                                </div>
                                                                <div className="show d-flex justify-content-between align-items-end">
                                                                    <p className="text-5F5F5F mb-0">
                                                                        Show Upto:  {formattedDate}
                                                                    </p>
                                                                    <div className="d-flex align-items-center">
                                                                        <Link to={`/chat/${val?.msg_id}/${val?.student?.student_main_id}`} className="me-2" >
                                                                            <img src="Images/chat-icon.png" alt="" className="" />
                                                                        </Link>
                                                                        <Link className="star">
                                                                            <i
                                                                                className={`fa-star fs-4 mt-1 ${val?.is_starred === 1 ? "fa-solid text-warning" : "fa-regular text-FFC068"}`}
                                                                                onClick={() => toggleStarStatus(val?.sended_msg_id, val?.is_starred)}
                                                                                style={{ cursor: "pointer" }}
                                                                            ></i>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>

                            <div
                                className="tab-pane fade"
                                id="day-tab-4-pane"
                                role="tabpane4"
                                aria-labelledby="day-tab-4"
                                tabIndex="0"
                            >
                                <h6 className="text-010A48 fw-semibold m-0">
                                    Session 2024-2025
                                </h6>
                                <p className="text-5F5F5F mb-2">Intimation -</p>
                                <div className="row">
                                    {filteredStarredmessage?.map((val) => {
                                        const showUpto = val?.msg_mst?.show_upto;
                                        const formattedDate = showUpto ? format(new Date(showUpto), "dd-MMM-yyyy") : "N/A";
                                        return (
                                            <>
                                                <div className="col-12 mb-4">
                                                    <Link to={`/reply/${val?.msg_id}/${val?.sended_msg_id}`} className="text-decoration-none">
                                                        <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between mb-2">
                                                                    <h6 className="mb-1">
                                                                        {" "}
                                                                        <span
                                                                            style={{ backgroundColor: val?.student?.color }}
                                                                            className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                        >
                                                                            {val?.student?.student_number}
                                                                        </span>

                                                                        <span style={{ color: val?.student?.color || "#000000" }} className="fs-18 fw-semibold">
                                                                            {val?.student?.student_name}
                                                                        </span>
                                                                    </h6>
                                                                    <div className="date">
                                                                        <p className="text-5F5F5F mb-1">
                                                                            <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                            {format(new Date(val?.sended_date), "dd-MMM-yyyy")}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <h6 className="text-010A48 fs-6 mb-1 lh-1 text-wrap">
                                                                        {val?.msg_mst?.subject_text}
                                                                    </h6>
                                                                </div>
                                                                <div className="show d-flex justify-content-between align-items-end">
                                                                    <p className="text-5F5F5F mb-0">
                                                                        Show Upto:  {formattedDate}
                                                                    </p>
                                                                    <div className="d-flex align-items-center">
                                                                        <Link to={`/chat/${val?.msg_id}/${val?.student?.student_main_id}`} className="me-2" >
                                                                            <img src="Images/chat-icon.png" alt="" className="" />
                                                                        </Link>
                                                                        <Link className="star">
                                                                            <i
                                                                                className={`fa-star fs-4 mt-1 ${val?.is_starred === 1 ? "fa-solid text-warning" : "fa-regular text-FFC068"}`}
                                                                                onClick={() => toggleStarStatus(val?.sended_msg_id, val?.is_starred)}
                                                                                style={{ cursor: "pointer" }}
                                                                            ></i>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Home;
