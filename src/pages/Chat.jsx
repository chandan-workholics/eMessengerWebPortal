import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import sendMsgBtn from "../sendMsg-btn.png";
import { useParams, useLocation } from "react-router-dom";
import callAPI, { interceptor } from "../Common_Method/api";
import { format } from "date-fns";

const Chat = () => {
    const { msg_id, sender_id } = useParams();
    const location = useLocation();
    const { title } = location.state
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const [fivemember, setFivemember] = useState([]);
    const [message, setMessage] = useState("");
    const [isScrolling, setIsScrolling] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [uploadedPdfUrl, setUploadedPdfUrl] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedPdfs, setSelectedPdfs] = useState([]);
    const chatBoxRef = useRef(null);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const fetchData = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./chat/get_group_chat_message?groupId=${msg_id}&chat_type=GROUPCHAT`
            );

            if (response.data) {
                setDetail(response.data.data);
                setFivemember(response.data.five_numbers_Details);
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
        console.log("Button clicked, preparing to send message...");
        console.log(selectedPdfs, ">>>>>>>>>>>>>>>>>>>")
        let msgType = "TEXT";
        let link = null;

        if (uploadedImageUrl) {
            msgType = "IMAGE";
            link = uploadedImageUrl;
        } else if (uploadedPdfUrl) {
            msgType = "PDF";
            link = uploadedPdfUrl;
        }

        if (!message.trim() && !link) return;

        const payload = {
            msg_id: parseInt(msg_id),
            sender_id: parseInt(sender_id),
            chat_type: "GROUPCHAT",
            msg_type: msgType,
            group_id: parseInt(msg_id),
            mobile_no: user?.mobile_no,
            receiver_id: null,
            message: msgType === "TEXT" ? message.trim() : '',
            link: link,
        }
        try {
            await callAPI.post("/chat/send_chat_msg1", payload);
            setMessage("");
            fetchData();
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
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages((prev) => [...prev, ...files]);
        if (files.length > 0) {
            uploadImage(files[0]);
        }
    };
    const removeImage = (index) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await callAPI.post(`/v1/admin/imageUpload_Use/imageUpload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const uploadedImageUrl = response.data?.url;
            setUploadedImageUrl(uploadedImageUrl);
            return uploadedImageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    const handlePdfUpload = (e) => {
        const files = Array.from(e.target.files);
        setSelectedPdfs((prev) => [...prev, ...files]);
        if (files.length > 0) {
            uploadPdf(files[0]);
        }
    };
    const removePdf = (index) => {
        setSelectedPdfs((prev) => prev.filter((_, i) => i !== index));
    };
    const uploadPdf = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await callAPI.post(`/v1/admin/pdfUpload_Use/pdfUpload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const uploadedPdfUrl = response.data?.url;
            setUploadedPdfUrl(uploadedPdfUrl);
            return uploadedPdfUrl;
        } catch (error) {
            console.error("Error uploading PDF:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid p-0 chat-page">
                <div className="container">
                    <div className="row my-0 my-md-4">
                        {/* Chatbox */}

                        <div className="col-xl-9 col-lg-8 col-md-12 col-12 px-0 px-md-0 px-xl-auto">
                            <div className="card bg-FAFAFA mb-lg-0 h-87vh position-relative border-0">
                                <div className="chatbox pt-0 h-100">
                                    <div
                                        className="card-header bg-FAFAFA py-0"
                                        style={{ borderColor: "#EDEDED" }}
                                    >
                                        <div className="chatbox-header py-2 px-0 d-flex justify-content-between">
                                            <div className="w-100">
                                                <p className="text-010A48 fw-semibold mt-1 mb-0 teach">
                                                    {user?.scholar_no} - {user?.student_name}
                                                </p>
                                                {title ? <p className="text-010A48 fw-semibold mt-1 mb-0 teach">
                                                    {title}
                                                </p> : ''}
                                            </div>
                                            <div className="dropdown d-block d-lg-none">
                                                <button
                                                    className="dropdown-toggle border-0 bg-transparent"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fa-solid fa-ellipsis-vertical text-success fs-4"></i>
                                                </button>
                                                <ul className="dropdown-menu p-0 border-0">
                                                    <li className="">
                                                        <div
                                                            className="card bg-FAFAFA shadow"
                                                            style={{ borderColor: "#F1F1F1" }}
                                                        >
                                                            <div
                                                                className="card-header px-2 bg-FAFAFA"
                                                                style={{ borderColor: "#EDEDED" }}
                                                            >
                                                                <p className="mb-0 text-010A48 fw-semibold">
                                                                    <i className="fa-solid fa-circle me-2 text-4CD964"></i>
                                                                    Available Teacher
                                                                </p>
                                                            </div>
                                                            <div className="card-body p-1 pb-2">
                                                                {/* Dynamic Teacher List */}
                                                                {fivemember?.map((teacher) => (
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
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>



                                    <div
                                        className="card-body py-1 chatbox-messages"
                                        ref={chatBoxRef}
                                        onScroll={handleScroll}
                                        style={{ overflowY: "scroll", height: "70vh" }}
                                    >
                                        {/* Render Messages Dynamically */}
                                        {detail.map((chat) => {
                                            const isUserMessage =
                                                chat.sender?.student_number ===
                                                parseInt(user?.scholar_no);

                                            return (
                                                <div
                                                    key={chat.chat_msg_id}
                                                    className={`message ${isUserMessage
                                                        ? "outgoing align-self-end text-end"
                                                        : "incoming d-flex align-items-center align-self-start"
                                                        } mb-1`}
                                                >
                                                    {!isUserMessage && (
                                                        // <img
                                                        //     src={`Images/profile${chat.sender?.student_number}.png`}
                                                        //     alt=""
                                                        //     className="me-2"
                                                        // />
                                                        <span className="me-2 pt-3">
                                                            <i className="fa-solid fa-circle-user fs-2 bg-white rounded-circle" style={{ color: chat?.sender?.color }}></i>
                                                        </span>
                                                    )}
                                                    <div className="message-content">
                                                        {!isUserMessage && (
                                                            <p className="mb-0 text-010A48 info">
                                                                {chat.sender?.student_name}
                                                            </p>
                                                        )}
                                                        <p
                                                            className={`${isUserMessage
                                                                ? "bg-E79C1D text-white"
                                                                : "bg-F3F0FF text-0D082C"
                                                                } px-2 py-2 mb-0 info`}
                                                        >
                                                            {chat?.message}
                                                            {chat?.link && (
                                                                chat.link.includes('.pdf') ? (
                                                                    <a href={chat.link} target="_blank" rel="noopener noreferrer">
                                                                        <button className="btn btn-primary">View PDF</button>
                                                                    </a>
                                                                ) : (
                                                                    <img
                                                                        src={chat.link}
                                                                        alt="Uploaded"
                                                                        style={{ maxHeight: "100px", maxWidth: "100px" }}
                                                                        className="me-2"
                                                                    />
                                                                )
                                                            )}
                                                        </p>
                                                        <p className="text-0D082C px-2 mb-0 info">
                                                            {chat?.sent_at ? format(new Date(chat.sent_at), "hh:mm a") : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>


                                    {/* Chatbox Input */}
                                    <div className="selected-files">
                                        {selectedImages.map((image, index) => (
                                            <div key={index} className="file-preview">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`selected-${index}`}
                                                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                                                />
                                                <button type="button" onClick={() => removeImage(index)} className="cancel-btn">
                                                    <i className="fa-solid fa-times-circle"></i>
                                                </button>  </div>))}
                                        {selectedPdfs.map((pdf, index) => (
                                            <div key={index} className="file-preview">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => removePdf(index)}>
                                                    {pdf.name}
                                                    <i className="fa-solid fa-times-circle cancel-btn"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>


                                    <div className="chatbox-input border rounded-bottom-3 d-flex align-items-center position-absolute w-100 bg-FAFAFA">
                                        <input
                                            type="text"
                                            placeholder="Reply..."
                                            className="me-3 p-2 rounded-3"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <input
                                            type="file"
                                            className="d-none"
                                            id="imageUpload"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <label htmlFor="imageUpload">
                                            <i className="fa-solid fa-image text-969599 pe-2"></i>
                                        </label>

                                        <input
                                            type="file"
                                            className="d-none"
                                            id="pdfUpload"
                                            accept="application/pdf"
                                            onChange={handlePdfUpload}
                                        />
                                        <label htmlFor="pdfUpload">
                                            <i className="fa-solid fa-file-pdf pe-2"></i>
                                        </label>
                                        <button
                                            className="send-message-btn bg-FF0000 rounded-circle px-2 py-2 d-flex justify-content-center align-items-center"
                                            onClick={handleSendMessage}
                                        >
                                            <img src={sendMsgBtn} alt="Send" className="ms-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Available Teachers */}
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12 d-none d-lg-block">
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
                                    {fivemember?.map((teacher) => (
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
