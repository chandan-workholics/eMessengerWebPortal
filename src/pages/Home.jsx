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
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const toggleStarStatus = async (id, currentStatus) => {
        try {
            interceptor();
            const newStatus = currentStatus === 1 ? 0 : 1;
            await callAPI.put(`./msg/staredStatusUpdateMsgDetail/${id}`, {
                star_status: newStatus,
            });

            message.data = message.data.map((item) =>
                item.id === id ? { ...item, is_starred: newStatus } : item
            );
            fetchMessage();
            fetchSeenMessage();
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

            const response = await callAPI.get(`./msg/getInboxMsgDetails/${user?.mobile_no}`);

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
                `./msg/getLastdayMsgDetails/${user?.mobile_no}`
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
                `./msg/getSeenMsgDetails/${user?.mobile_no}`
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
                `./msg/getStaredMsgDetails/${user?.mobile_no}`
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
        fetchlastDayMessage();// eslint-disable-next-line react-hooks/exhaustive-deps
        fetchSeenMessage();// eslint-disable-next-line react-hooks/exhaustive-deps
        fetchStarredMessage();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Debounce function to limit API calls
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Fetch search results
    const fetchSearchResults = async (query) => {
        if (!query) {
            setResults([]); // Clear results when query is empty
            return;
        }
        setIsLoading(true);
        try {
            const response = await callAPI.get(
                `msg/getSearchDetail?mobile=${user?.mobile_no}&searchquery=${encodeURIComponent(query)}`
            );
            setResults(response.data); // Update this if your API returns a different structure
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced version of the fetch function
    const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);

    // Trigger API call when searchQuery changes
    useEffect(() => {
        debouncedFetchSearchResults(searchQuery);// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);


    return (
        <>
            <Header />
            <div className="bg-F4F4F4 home-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 head-top py-1">
                            {loading ? (
                                <h6 className="text-010A48 fw-normal mb-0">Loading message...</h6>
                            ) : (
                                <h6 className="text-010A48 fw-normal mb-0">
                                    {noticeBoardDetail?.data?.noticeMsg?.map((item, index) => (
                                        <span key={index} className="me-4">
                                            {item?.student_name}-{item?.noticeMsg}
                                        </span>
                                    ))}
                                </h6>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-0 shadow-sm">
                <div className="container pt-3">
                    <div className="row">


                        <div className="col-12 col-lg-12 mb-lg-2 pe-lg-4 pe-xl-5">
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
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link me-3 rounded-2 text-010A48 home-tab-btn mb-lg-0 mb-2 me-lg-0 me-auto d-flex align-items-center justify-content-center gap-2 px-3 py-2 border-0 bg-gray shadow-sm"
                                        id="day-tab-5"
                                        data-bs-toggle="tab"
                                        data-bs-target="#day-tab-5-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="day-tab-5-pane"
                                        aria-selected="false"
                                    >
                                        <span>Search</span>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>

                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container-fluid p-0">
                <div className="container pt-3">
                    <div className="pb-20">
                        <div className="tab-content" id="myTabContent">

                            <div className="tab-pane fade show active" id="day-tab-1-pane" role="tabpanel" aria-labelledby="day-tab-1" tabIndex="0">
                                {message?.data?.map((group) => (
                                    <div key={group.msg_group_id} className="mb-4">
                                        {/* Message Group Heading */}
                                        <h5 className="text-primary fw-bold mb-2">{group.msg_group_name}</h5>

                                        {group.subgroups?.map((subgroup) => (
                                            <div key={subgroup.msg_sgroup_id} className="mb-3 ps-3">
                                                {/* Subgroup Heading */}
                                                <h6 className="text-secondary fw-semibold mb-2">{subgroup.msg_sgroup_name}</h6>

                                                <div className="row">
                                                    {subgroup.messages?.map((val) => (
                                                        <div className="col-12 mb-4" key={val.sended_msg_id}>
                                                            <Link
                                                                to={`/reply/${val.msg_id}/${val.sended_msg_id}`}
                                                                className="text-decoration-none"
                                                                state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                            >
                                                                <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-between mb-1">
                                                                            <h6 className="mb-1">
                                                                                <span
                                                                                    style={{ backgroundColor: val.student?.color }}
                                                                                    className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                                >
                                                                                    {val.student?.student_number}
                                                                                </span>
                                                                                <span
                                                                                    style={{ color: val.student?.color || "#000000" }}
                                                                                    className="fs-18 fw-semibold"
                                                                                >
                                                                                    {val.student?.student_name}
                                                                                </span>
                                                                            </h6>
                                                                            <div className="date">
                                                                                <p className="text-5F5F5F mb-1">
                                                                                    <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                                    {format(new Date(val.sended_date), "dd-MMM-yyyy")}
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <h6 className="text-010A48 fs-18 mb-0 text-wrap">
                                                                                {val.msg_mst?.subject_text}
                                                                            </h6>
                                                                        </div>

                                                                        <div className="show d-flex justify-content-between align-items-end">
                                                                            <p className="text-5F5F5F mb-0">
                                                                                Show Upto: {val.msg_mst?.show_upto ? format(new Date(val.msg_mst.show_upto), "dd-MMM-yyyy hh:mm a") : "N/A"}
                                                                            </p>

                                                                            <div className="d-flex align-items-center">
                                                                                {/* Chat Links */}
                                                                                {val.msg_mst?.msg_chat_type === "GROUPCHAT" && (
                                                                                    <Link
                                                                                        to={`/chat/GROUPCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                        className="me-2"
                                                                                        state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                    >
                                                                                        <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                    </Link>
                                                                                )}

                                                                                {val.msg_mst?.msg_chat_type === "INDIVIDUALCHAT" && (
                                                                                    <Link
                                                                                        to={`/chat/INDIVIDUALCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                        className="me-2"
                                                                                        state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                    >
                                                                                        <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                    </Link>
                                                                                )}

                                                                                {/* Star Logic */}
                                                                                {[4, 5].includes(val.msg_mst?.msg_priority) ? (
                                                                                    <Link className="star">
                                                                                        <i
                                                                                            className={`fa-star fs-4 mt-1 ${val.is_starred === 1
                                                                                                ? "fa-solid text-warning"
                                                                                                : "fa-solid text-FFC068"
                                                                                                }`}
                                                                                            onClick={() => toggleStarStatus(val.sended_msg_id, val.is_starred)}
                                                                                            style={{ cursor: "pointer" }}
                                                                                        ></i>
                                                                                    </Link>
                                                                                ) : (
                                                                                    ![1, 2, 3].includes(val.msg_mst?.msg_priority) && (
                                                                                        <Link className="star">
                                                                                            <i
                                                                                                className={`fa-star fs-4 mt-1 ${val.is_starred === 1
                                                                                                    ? "fa-solid text-warning"
                                                                                                    : "fa-regular text-FFC068"
                                                                                                    }`}
                                                                                                onClick={() => toggleStarStatus(val.sended_msg_id, val.is_starred)}
                                                                                                style={{ cursor: "pointer" }}
                                                                                            ></i>
                                                                                        </Link>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>


                            <div className="tab-pane fade" id="day-tab-2-pane" role="tabpane2" aria-labelledby="day-tab-2" tabIndex="0" >
                                {isLoading ? (
                                    <h6 className="text-010A48 fw-normal mb-0">Loading message...</h6>
                                ) : (
                                    lastdaymessage?.data?.map((group) => (
                                        <div key={group.msg_group_id} className="mb-4">
                                            {/* Message Group Heading */}
                                            <h5 className="text-primary fw-bold mb-2">{group.msg_group_name}</h5>

                                            {group.subgroups?.map((subgroup) => (
                                                <div key={subgroup.msg_sgroup_id} className="mb-3 ps-3">
                                                    {/* Subgroup Heading */}
                                                    <h6 className="text-secondary fw-semibold mb-2">{subgroup.msg_sgroup_name}</h6>

                                                    <div className="row">
                                                        {subgroup.messages?.map((val) => (
                                                            <div className="col-12 mb-4" key={val.sended_msg_id}>
                                                                <Link
                                                                    to={`/reply/${val.msg_id}/${val.sended_msg_id}`}
                                                                    className="text-decoration-none"
                                                                    state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                >
                                                                    <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                                        <div className="card-body">
                                                                            <div className="d-flex justify-content-between mb-2">
                                                                                <h6 className="mb-1">
                                                                                    <span
                                                                                        style={{ backgroundColor: val.student?.color }}
                                                                                        className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                                    >
                                                                                        {val.student?.student_number}
                                                                                    </span>
                                                                                    <span
                                                                                        style={{ color: val.student?.color || "#000000" }}
                                                                                        className="fs-18 fw-semibold"
                                                                                    >
                                                                                        {val.student?.student_name}
                                                                                    </span>
                                                                                </h6>
                                                                                <div className="date">
                                                                                    <p className="text-5F5F5F mb-1">
                                                                                        <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                                        {format(new Date(val.sended_date), "dd-MMM-yyyy")}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div>
                                                                                <h6 className="text-010A48 fs-18 mb-1 lh-1 text-wrap">
                                                                                    {val.msg_mst?.subject_text}
                                                                                </h6>
                                                                            </div>

                                                                            <div className="show d-flex justify-content-between align-items-end">
                                                                                <p className="text-5F5F5F mb-0">
                                                                                    Show Upto:{" "}
                                                                                    {val.msg_mst?.show_upto
                                                                                        ? format(new Date(val.msg_mst.show_upto), "dd-MMM-yyyy hh:mm a")
                                                                                        : "N/A"}
                                                                                </p>

                                                                                <div className="d-flex align-items-center">
                                                                                    {val.msg_mst?.msg_chat_type === "GROUPCHAT" && (
                                                                                        <Link
                                                                                            to={`/chat/GROUPCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                            className="me-2"
                                                                                            state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                        >
                                                                                            <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                        </Link>
                                                                                    )}

                                                                                    {val.msg_mst?.msg_chat_type === "INDIVIDUALCHAT" && (
                                                                                        <Link
                                                                                            to={`/chat/INDIVIDUALCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                            className="me-2"
                                                                                            state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                        >
                                                                                            <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                        </Link>
                                                                                    )}

                                                                                    {/* Star Logic */}
                                                                                    <Link className="star">
                                                                                        <i
                                                                                            className={`fa-star fs-4 mt-1 ${val.is_starred === 1 ? "fa-solid text-warning" : "fa-regular text-FFC068"
                                                                                                }`}
                                                                                            onClick={() =>
                                                                                                toggleStarStatus(val.sended_msg_id, val.is_starred)
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
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                )}
                            </div>


                            <div className="tab-pane fade" id="day-tab-3-pane" role="tabpane3" aria-labelledby="day-tab-3" tabIndex="0">
                                {seenmessage?.data?.map((group) => (
                                    <div key={group.msg_group_id} className="mb-4">
                                        {/* Message Group Heading */}
                                        <h5 className="text-primary fw-bold mb-2">{group.msg_group_name}</h5>

                                        {group.subgroups?.map((subgroup) => (
                                            <div key={subgroup.msg_sgroup_id} className="mb-3 ps-3">
                                                {/* Subgroup Heading */}
                                                <h6 className="text-secondary fw-semibold mb-2">{subgroup.msg_sgroup_name}</h6>

                                                <div className="row">
                                                    {subgroup.messages?.map((val) => (
                                                        <div className="col-12 mb-4" key={val.sended_msg_id}>
                                                            <Link
                                                                to={`/reply/${val.msg_id}/${val.sended_msg_id}`}
                                                                className="text-decoration-none"
                                                                state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                            >
                                                                <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-between mb-2">
                                                                            <h6 className="mb-1">
                                                                                <span
                                                                                    style={{ backgroundColor: val.student?.color }}
                                                                                    className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                                >
                                                                                    {val.student?.student_number}
                                                                                </span>
                                                                                <span
                                                                                    style={{ color: val.student?.color || "#000000" }}
                                                                                    className="fs-18 fw-semibold"
                                                                                >
                                                                                    {val.student?.student_name}
                                                                                </span>
                                                                            </h6>
                                                                            <div className="date">
                                                                                <p className="text-5F5F5F mb-1">
                                                                                    <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                                    {format(new Date(val.sended_date), "dd-MMM-yyyy")}
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <h6 className="text-010A48 fs-18 mb-1 lh-1 text-wrap">
                                                                                {val.msg_mst?.subject_text}
                                                                            </h6>
                                                                        </div>

                                                                        <div className="show d-flex justify-content-between align-items-end">
                                                                            <p className="text-5F5F5F mb-0">
                                                                                Show Upto:{" "}
                                                                                {val.msg_mst?.show_upto
                                                                                    ? format(new Date(val.msg_mst.show_upto), "dd-MMM-yyyy hh:mm a")
                                                                                    : "N/A"}
                                                                            </p>

                                                                            <div className="d-flex align-items-center">
                                                                                {val.msg_mst?.msg_chat_type === "GROUPCHAT" && (
                                                                                    <Link
                                                                                        to={`/chat/GROUPCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                        className="me-2"
                                                                                        state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                    >
                                                                                        <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                    </Link>
                                                                                )}

                                                                                {val.msg_mst?.msg_chat_type === "INDIVIDUALCHAT" && (
                                                                                    <Link
                                                                                        to={`/chat/INDIVIDUALCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                        className="me-2"
                                                                                        state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                    >
                                                                                        <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                    </Link>
                                                                                )}

                                                                                {/* Star Logic */}
                                                                                <Link className="star">
                                                                                    <i
                                                                                        className={`fa-star fs-4 mt-1 ${val.is_starred === 1 ? "fa-solid text-warning" : "fa-regular text-FFC068"
                                                                                            }`}
                                                                                        onClick={() => toggleStarStatus(val.sended_msg_id, val.is_starred)}
                                                                                        style={{ cursor: "pointer" }}
                                                                                    ></i>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>


                            <div className="tab-pane fade" id="day-tab-4-pane" role="tabpane4" aria-labelledby="day-tab-4" tabIndex="0">
                                {starredmessage?.data?.map((group) => (
                                    <div key={group.msg_group_id} className="mb-4">
                                        {/* Message Group Heading */}
                                        <h5 className="text-primary fw-bold mb-2">{group.msg_group_name}</h5>

                                        {group.subgroups?.map((subgroup) => (
                                            <div key={subgroup.msg_sgroup_id} className="mb-3 ps-3">
                                                {/* Subgroup Heading */}
                                                <h6 className="text-secondary fw-semibold mb-2">{subgroup.msg_sgroup_name}</h6>

                                                <div className="row">
                                                    {subgroup.messages?.map((val) => (
                                                        <div className="col-12 mb-4" key={val.sended_msg_id}>
                                                            <Link
                                                                to={`/reply/${val.msg_id}/${val.sended_msg_id}`}
                                                                className="text-decoration-none"
                                                                state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                            >
                                                                <div className="msg-card card shadow-sm rounded-4 bg-F1F3FA">
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-between mb-2">
                                                                            <h6 className="mb-1">
                                                                                <span
                                                                                    style={{ backgroundColor: val.student?.color }}
                                                                                    className="text-white rounded-1 px-1 fw-semibold me-2 mb-2"
                                                                                >
                                                                                    {val.student?.student_number}
                                                                                </span>
                                                                                <span
                                                                                    style={{ color: val.student?.color || "#000000" }}
                                                                                    className="fs-18 fw-semibold"
                                                                                >
                                                                                    {val.student?.student_name}
                                                                                </span>
                                                                            </h6>
                                                                            <div className="date">
                                                                                <p className="text-5F5F5F mb-1">
                                                                                    <i className="fa-regular fa-calendar text-FF79AE me-1"></i>
                                                                                    {format(new Date(val.sended_date), "dd-MMM-yyyy")}
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <h6 className="text-010A48 fs-18 mb-1 lh-1 text-wrap">
                                                                                {val.msg_mst?.subject_text}
                                                                            </h6>
                                                                        </div>

                                                                        <div className="show d-flex justify-content-between align-items-end">
                                                                            <p className="text-5F5F5F mb-0">
                                                                                Show Upto:{" "}
                                                                                {val.msg_mst?.show_upto
                                                                                    ? format(new Date(val.msg_mst.show_upto), "dd-MMM-yyyy hh:mm a")
                                                                                    : "N/A"}
                                                                            </p>

                                                                            <div className="d-flex align-items-center">
                                                                                {/* Chat Links */}
                                                                                {val.msg_mst?.msg_chat_type === "GROUPCHAT" && (
                                                                                    <Link
                                                                                        to={`/chat/GROUPCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                        className="me-2"
                                                                                        state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                    >
                                                                                        <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                    </Link>
                                                                                )}

                                                                                {val.msg_mst?.msg_chat_type === "INDIVIDUALCHAT" && (
                                                                                    <Link
                                                                                        to={`/chat/INDIVIDUALCHAT/${val.msg_id}/${val.student?.student_number}`}
                                                                                        className="me-2"
                                                                                        state={{ title: val.msg_mst.subject_text, student: val.student }}
                                                                                    >
                                                                                        <img src="Images/chat-icon.png" alt="Chat Icon" />
                                                                                    </Link>
                                                                                )}

                                                                                {/* Star Logic */}
                                                                                {[4, 5].includes(val.msg_mst?.msg_priority) ? (
                                                                                    <Link className="star disabled">
                                                                                        <i
                                                                                            className={`fa-star fs-4 mt-1 ${val.is_starred === 1 || val.is_starred === 0
                                                                                                ? "fa-solid text-warning"
                                                                                                : "fa-solid text-FFC068"
                                                                                                }`}
                                                                                            onClick={() => toggleStarStatus(val.sended_msg_id, val.is_starred)}
                                                                                            style={{ cursor: "pointer" }}
                                                                                        ></i>
                                                                                    </Link>
                                                                                ) : (
                                                                                    <Link className="star">
                                                                                        <i
                                                                                            className={`fa-star fs-4 mt-1 ${val.is_starred === 1
                                                                                                ? "fa-solid text-warning"
                                                                                                : "fa-regular text-FFC068"
                                                                                                }`}
                                                                                            onClick={() => toggleStarStatus(val.sended_msg_id, val.is_starred)}
                                                                                            style={{ cursor: "pointer" }}
                                                                                        ></i>
                                                                                    </Link>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>


                            <div className="tab-pane fade" id="day-tab-5-pane" role="tabpane5" aria-labelledby="day-tab-5" tabIndex="0"   >
                                <div className="row">
                                    <div className="col">
                                        <h6 className="text-010A48 fw-semibold m-0">

                                        </h6>
                                        <p className="text-5F5F5F mb-2"></p>
                                    </div>
                                    <div className="col-12 col-lg-6 col-md-6 mt-2 mt-xl-0">
                                        <div className="mb-3 position-relative">
                                            <input
                                                type="search"
                                                className="form-control bg-F4F4F4 border rounded pe-5"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <i
                                                className="fa-solid fa-magnifying-glass text-797979 position-absolute"
                                                style={{ top: "50%", right: "15px", transform: "translateY(-50%)" }}
                                            ></i>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    {results?.data?.map((val) => {

                                        return (
                                            <>
                                                <div className="col-12 mb-4">
                                                    <Link to={`/reply/${val?.msg_id}/${val?.sended_msg_id}`} className="text-decoration-none" state={{ title: val.msg_mst.subject_text, student: val.student }}>
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
                                                                    <h6 className="text-010A48 fs-18 mb-1 lh-1 text-wrap">
                                                                        {val?.msg_mst?.subject_text}
                                                                    </h6>
                                                                </div>
                                                                <div className="show d-flex justify-content-between align-items-end">
                                                                    <p className="text-5F5F5F mb-0">
                                                                        Show Upto:  {val?.msg_mst?.show_upto ? format(new Date(val?.msg_mst?.show_upto), "dd-MMM-yyyy hh:mm a") : "N/A"}
                                                                    </p>
                                                                    <div className="d-flex align-items-center">

                                                                        {val?.msg_mst?.msg_chat_type === "GROUPCHAT" ? (
                                                                            <Link
                                                                                to={`/chat/GROUPCHAT/${val?.msg_id}/${val?.student?.student_number}`}
                                                                                className="me-2"
                                                                                state={{ title: val?.msg_mst?.subject_text, student: val?.student }}
                                                                            >
                                                                                <img
                                                                                    src="Images/chat-icon.png"
                                                                                    alt="Chat Icon"
                                                                                    className=""
                                                                                />
                                                                            </Link>
                                                                        ) : null}
                                                                        {val?.msg_mst?.msg_chat_type === "INDIVIDUALCHAT" ? (
                                                                            <Link
                                                                                to={`/chat/INDIVIDUALCHAT/${val?.msg_id}/${val?.student?.student_number}`}
                                                                                className="me-2"
                                                                                state={{ title: val?.msg_mst?.subject_text, student: val?.student }}
                                                                            >
                                                                                <img
                                                                                    src="Images/chat-icon.png"
                                                                                    alt="Chat Icon"
                                                                                    className=""
                                                                                />
                                                                            </Link>
                                                                        ) : null}

                                                                        {[4, 5].includes(val?.msg_mst?.msg_priority) ? (
                                                                            <Link className="star disabled">
                                                                                <i
                                                                                    className={`fa-star fs-4 mt-1 ${val?.is_starred === 1 || val?.is_starred === 0
                                                                                        ? "fa-solid text-warning"
                                                                                        : "fa-solid text-FFC068"
                                                                                        }`}
                                                                                    onClick={() => toggleStarStatus(val?.sended_msg_id, val?.is_starred)}
                                                                                    style={{ cursor: "pointer" }}
                                                                                ></i>
                                                                            </Link>
                                                                        ) : (
                                                                            <Link className="star">
                                                                                <i
                                                                                    className={`fa-star fs-4 mt-1 ${val?.is_starred === 1 ? "fa-solid text-warning" : "fa-regular text-FFC068"}`}
                                                                                    onClick={() => toggleStarStatus(val?.sended_msg_id, val?.is_starred)}
                                                                                    style={{ cursor: "pointer" }}
                                                                                ></i>
                                                                            </Link>
                                                                        )}

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
