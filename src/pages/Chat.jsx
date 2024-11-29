import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import sendMsgBtn from "../sendMsg-btn.png";
import { useParams } from "react-router-dom";
import callAPI, { interceptor } from "../Common_Method/api";

const Chat = () => {
    const { msg_id, sender_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]); // Stores chat messages
    const [message, setMessage] = useState(""); // Stores the message input by the user
    const [isScrolling, setIsScrolling] = useState(false); // Tracks if user is scrolling manually
    const chatBoxRef = useRef(null); // Ref for the chatbox container
    const user = JSON.parse(sessionStorage.getItem("user")); // User details

    const fetchData = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./chat/get_group_chat_message?groupId=${msg_id}&chat_type=GROUPCHAT`
            );

            if (response.data) {
                setDetail(response.data.data);
            } else {
                console.warn("No data received from API.");
                setDetail([]);
            }
        } catch (error) {
            console.error("Error fetching message details:", error.message);
            setDetail([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return; // Avoid sending empty messages

        const payload = {
            msg_id: parseInt(msg_id),
            sender_id: sender_id,
            chat_type: "GROUPCHAT",
            group_id: parseInt(msg_id),
            mobile_no: user?.mobile_no,
            receiver_id: null,
            message,
        };

        try {
            await callAPI.post("/chat/send_chat_msg1", payload);
            setMessage(""); // Clear input
            fetchData(); // Fetch updated messages
            // Scroll to the bottom after sending a message
            setTimeout(() => {
                if (chatBoxRef.current) {
                    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
                }
            }, 100);
        } catch (error) {
            console.error("Error sending message:", error.message);
        }
    };

    const handleScroll = () => {
        if (!chatBoxRef.current) return;

        // Check if the user is at the top of the chatbox
        const isAtTop = chatBoxRef.current.scrollTop === 0;
        setIsScrolling(!isAtTop);
    };

    useEffect(() => {
        fetchData(); // Fetch messages on component mount

        const interval = setInterval(() => {
            if (!isScrolling) {
                fetchData(); // Fetch messages only if not manually scrolling
            }
        }, 2000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [isScrolling]);

    useEffect(() => {
        // Scroll to the bottom when messages are loaded, only if not scrolling manually
        if (!isScrolling && chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [detail]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid p-0 chat-page">
                <div className="container">
                    <div className="row my-3">
                        {/* Chatbox */}
                        <div className="col-xl-9 col-lg-8 col-md-8 col-12">
                            <div className="card bg-FAFAFA mb-lg-0 mb-1 h-80vh position-relative border-0">
                                <div className="chatbox py-0 h-100">
                                    <div
                                        className="card-header bg-FAFAFA py-0"
                                        style={{ borderColor: "#EDEDED" }}
                                    >
                                        <div className="chatbox-header py-2 px-1">
                                            <p className="mb-0 fw-semibold text-010A48 chat-head">
                                                {user?.scholar_no} - {user?.student_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="card-body py-1 chatbox-messages"
                                        ref={chatBoxRef}
                                        onScroll={handleScroll}
                                        style={{ overflowY: "scroll", height: "70vh" }}
                                    >
                                        <p className="text-010A48 fw-semibold mb-0 teach">
                                            Information regarding group chat duration for biology
                                            subject
                                        </p>
                                        {/* Render Messages Dynamically */}
                                        {detail.map((chat) => {
                                            const isUserMessage =
                                                chat.sender?.student_number === parseInt(user?.scholar_no);

                                            return (
                                                <div
                                                    key={chat.chat_msg_id}
                                                    className={`message ${isUserMessage
                                                        ? "outgoing align-self-end text-end"
                                                        : "incoming d-flex align-items-center align-self-start"
                                                        } mb-1`}
                                                >
                                                    {!isUserMessage && (
                                                        <img
                                                            src={`Images/profile${chat.sender?.student_number}.png`}
                                                            alt=""
                                                            className="me-2"
                                                        />
                                                    )}
                                                    <div className="message-content">
                                                        {!isUserMessage && (
                                                            <p className="mb-0 text-010A48 info">
                                                                {chat.sender?.student_number} -{" "}
                                                                {chat.sender?.student_name}
                                                            </p>
                                                        )}
                                                        <p
                                                            className={`${isUserMessage
                                                                ? "bg-E79C1D text-white"
                                                                : "bg-F3F0FF text-0D082C"
                                                                } px-2 py-2 mb-0 info`}
                                                        >
                                                            {chat.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Chatbox Input */}
                                    <div className="chatbox-input d-flex align-items-center position-absolute w-100 bg-FAFAFA">
                                        <input
                                            type="text"
                                            placeholder="Reply..."
                                            className="me-3 p-2 rounded-3"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <Link>
                                            <i className="fa-solid fa-camera text-969599 me-3"></i>
                                        </Link>
                                        <Link>
                                            <i className="fa-solid fa-image text-969599"></i>
                                        </Link>
                                        <button
                                            className="bg-FF0000 rounded-circle px-2 py-2 d-flex justify-content-center align-items-center"
                                            onClick={handleSendMessage}
                                        >
                                            <img src={sendMsgBtn} alt="" className="ms-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Available Teachers */}
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                            <div
                                className="card bg-FAFAFA"
                                style={{ borderColor: "#F1F1F1" }}
                            >
                                <div
                                    className="card-header bg-FAFAFA"
                                    style={{ borderColor: "#EDEDED" }}
                                >
                                    <p className="mb-0 text-010A48 fw-semibold">
                                        <i className="fa-solid fa-circle me-2 text-4CD964"></i>
                                        Available Teacher
                                    </p>
                                </div>
                                <div className="card-body">
                                    {/* Dynamic Teacher List */}
                                    {detail?.five_numbers_Details?.map((teacher) => (
                                        <p
                                            key={teacher.student_main_id}
                                            className="mb-0 my-2 text-010A48 fw-normal teach"
                                        >
                                            <img
                                                src={`Images/profile${teacher.student_main_id}.png`}
                                                alt=""
                                                className="me-2"
                                            />
                                            {teacher.student_number} - {teacher.student_name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
