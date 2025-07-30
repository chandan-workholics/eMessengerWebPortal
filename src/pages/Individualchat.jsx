import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";

import sendMsgBtn from "../sendMsg-btn.png";
import { useParams, useLocation } from "react-router-dom";
import callAPI from "../Common_Method/api";
import { format } from "date-fns";


import io from "socket.io-client";

const socket = io("https://apps.actindore.com", {
    withCredentials: true,
    transports: ["websocket", "polling"], // prioritize websocket

});



const Individualchat = () => {
    const { msg_id, sender_id } = useParams();
    const location = useLocation();
    const { title, student } = location.state
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const [fivemember, setFivemember] = useState([]);
    const [fivenumber, setFivenumber] = useState([]);
    const [message, setMessage] = useState("");

    const [isScrolling, setIsScrolling] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [uploadedPdfUrl, setUploadedPdfUrl] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedPdfs, setSelectedPdfs] = useState([]);
    const chatBoxRef = useRef(null);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [previewImage, setPreviewImage] = useState(null);

    const [groupMembers, setGroupMembers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [msgId, setMsgId] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const inputRef = useRef(null);


    const handleImageClick = (imageUrl) => {
        setPreviewImage(imageUrl); // Set the clicked image URL
    };

    const closePreview = () => {
        setPreviewImage(null); // Close the preview
    };


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./chat/get_individual_chat_messages?msg_id=${msg_id}&student_main_id=${sender_id}`);

            if (response.data) {
                setDetail(response.data.messages);
                setFivemember(response?.data?.messages[0]?.messageDetails?.five_mobile_number);
                setFivenumber(response?.data?.five_numbers_Details);
                setSelectedUserId(response?.data?.groupMember?.student_main_id);
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

    const fetchChatDetails = async () => {
        try {
            const response = await callAPI.get(`./chat/get_individual_chat_messages?msg_id=${msg_id}&student_main_id=${sender_id}`);

            if (response.data && response.data.messages.length > 0) {
                const firstMessage = response.data.messages[0]; // Get first message dynamically
                setMsgId(firstMessage.msg_id);
                setSenderId(firstMessage.sender_id);
                const groupMemberIds = response.data.groupMember.map(member => member.student_main_id);
                setSelectedUserId(groupMemberIds);
            }
        } catch (error) {
            console.error("Error fetching chat details:", error.message);
        }
    };

    const fetchGroupMembers = async () => {
        if (!msgId || !senderId) return;

        try {
            const response = await callAPI.get(`/chat/get_individual_chat_messages?msg_id=${msgId}&student_main_id=${senderId}`);
            if (response.data && response.data.groupMember) {
                setGroupMembers(response.data.groupMember);
            } else {
                setGroupMembers([]);
            }

        } catch (error) {
            console.error("Error fetching group members:", error.message);
        }
    };

    useEffect(() => {
        fetchChatDetails();
    }, []);

    useEffect(() => {
        if (msgId && senderId) {
            fetchGroupMembers();
        }
    }, [msgId, senderId]);

    const handleInputChange = (e) => {

        const value = e.target.value;
        setMessage(value);

        const lastChar = value.slice(-1);
        if (lastChar === "@" && groupMembers.length > 0) {
            setSuggestions(groupMembers);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }

        setCursorPosition(e.target.selectionStart);
    };

    const handleSelectUser = (student_name, student_main_id) => {
        const textBeforeCursor = message.substring(0, cursorPosition);
        const textAfterCursor = message.substring(cursorPosition);
        const updatedMessage = `${textBeforeCursor}${student_name} ${textAfterCursor}`;

        const studentMainId = student_main_id && !isNaN(student_main_id)
            ? `${textBeforeCursor}${Number(student_main_id)}${textAfterCursor}`
            : `${textBeforeCursor}Invalid ID${textAfterCursor}`;

        // Update state
        setMessage(updatedMessage);
        setSelectedUserId(studentMainId);
        setShowSuggestions(false);
        setSelectedUser({ student_name, student_main_id });



        // Ensure inputRef is valid before accessing it
        setTimeout(() => {
            if (inputRef.current) {
                const cursorPos = textBeforeCursor.length + student_name.length + 1;
                inputRef.current.selectionStart = cursorPos;
                inputRef.current.selectionEnd = cursorPos;
                inputRef.current.focus();
            } else {
                console.warn("Input field is not available.");
            }
        }, 0);
    };


    const handleSendMessage = async () => {

        let msgType = "TEXT";
        let link = null;
        try {
            if (uploadedImageUrl) {
                console.log("Uploading image file...");
                msgType = "IMAGE";
                link = uploadedImageUrl;
            } else if (uploadedPdfUrl) {
                console.log("Uploading PDF file...");
                msgType = "PDF";
                link = uploadedPdfUrl;
            }
            if (!message.trim() && !link) {
                console.warn("No message or file to send");
                return;
            }



            const isMentionMessage = selectedUser !== null;

            const receiverDetails = isMentionMessage
                ? [{ student_main_id: selectedUser.student_main_id, mobilenumber: selectedUser.student_family_mobile_number }]
                : fivenumber?.map((val) => ({
                    student_main_id: val.student_main_id,
                    mobilenumber: val.student_family_mobile_number,
                }));

            const payload = {
                msg_id: parseInt(msg_id),
                sender_id: parseInt(sender_id),
                sender_detail: {
                    student_name: student?.student_name,
                    student_number: student?.student_number,
                    student_main_id: student?.student_main_id || null,
                    color: student?.color
                },
                msg_type: msgType,
                link: link || "",
                chat_type: "INDIVIDUALCHAT",
                sent_at: new Date().toISOString(),
                mobile_no: user?.mobile_no,
                group_id: parseInt(msg_id),
                message: message.trim(),
                private_message: isMentionMessage ? selectedUser.student_main_id : null,
                receiverMobileNumbers: fivenumber?.map((val) => ({
                    student_main_id: val.student_main_id,
                    mobilenumber: val.student_family_mobile_number,
                })),
            };

            const payloadToSend = {
                ...payload,
                sender_detail: JSON.stringify(payload.sender_detail),
            };
            const response = await callAPI.post("/chat/send_chat_msg_individuals", payloadToSend);

            // Ensure response.data.groupMember exists
            if (response.data && response.data.groupMember && Array.isArray(response.data.groupMember)) {
                payload.sender_detail.student_main_id = response.data.groupMember.map(member => member.student_main_id);
            } else {
                // console.warn("groupMember is missing or not an array", response.data);
                payload.sender_detail.student_main_id = []; // Default empty array
            }
            socket.emit("send_individual_message", payloadToSend);
            setMessage("");
            setImageFile(null);
            setPdfFile(null);
            setUploadedImageUrl(null);
            setUploadedPdfUrl(null);
            fetchData();
            if (isMentionMessage) {
                setSelectedUser(null);
            }
            setTimeout(() => {
                if (chatBoxRef.current) {
                    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
                }
            }, 100);

        } catch (error) {
            console.error("Error sending message:", error.message);
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    // useEffect(() => {

    //     socket.emit("join_individual", msg_id);  // Emit join_group event

    //     socket.on("receive_individual_message", (newMessage) => {
    //         console.log("New message received:", newMessage);
    //         fetchData();
    //         setDetail((prevDetails) => [...prevDetails, newMessage]);
    //         scrollToBottom();
    //     });

    //     return () => {

    //         socket.off("receive_individual_message");
    //     };
    // }, [msg_id, detail]);


    useEffect(() => {
        socket.emit("join_individual", msg_id); // Join the chat room

        const handleNewMessage = (newMessage) => {
            // Don't manually add the message to UI; just refetch from backend
            fetchData(); // This will show only allowed messages
            scrollToBottom(); // Optionally delay this if needed
        };

        socket.on("receive_individual_message", handleNewMessage);

        return () => {
            socket.off("receive_individual_message", handleNewMessage);
        };
    }, [msg_id]); // <-- Only depend on msg_id, not detail




    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [detail]);


    useEffect(() => {
        fetchData();
    }, []);

    const handleScroll = () => {
        if (!chatBoxRef.current) return;
        const isAtTop = chatBoxRef.current.scrollTop === 0;
        setIsScrolling(!isAtTop);
    };

    useEffect(() => {
        if (!isScrolling && chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [detail]);





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
                                                                    Available Teachers
                                                                </p>
                                                            </div>
                                                            <div className="card-body p-1 pb-2">
                                                                {/* Dynamic Teacher List */}
                                                                {fivenumber?.map((teacher) => (
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
                                                chat?.senderDetails?.student_number ===
                                                parseInt(user?.scholar_no);

                                            return (
                                                <div
                                                    key={chat.chat_msg_id}
                                                    className={`message ${isUserMessage
                                                        ? "outgoing align-self-end text-end"
                                                        : "incoming d-flex align-items-center align-self-start"
                                                        } mb-3`}
                                                >
                                                    {!isUserMessage && (
                                                        <span className="me-2 pt-3">
                                                            <i className="fa-solid fa-circle-user fs-2 bg-white rounded-circle" style={{ color: JSON.parse(chat.sender_detail)?.color }}></i>
                                                        </span>
                                                    )}
                                                    <div className="message-content">
                                                        {!isUserMessage && (
                                                            <p className="mb-0 text-010A48 info">
                                                                {chat.sender_detail ? JSON.parse(chat.sender_detail)?.student_name : ''}
                                                            </p>
                                                        )}
                                                        <p
                                                            className={`${isUserMessage
                                                                ? "bg-E79C1D text-white"
                                                                : "bg-F3F0FF text-0D082C"
                                                                } px-2 py-2 mb-0 info`}
                                                        >
                                                            <div className="">
                                                                <p className="mb-1">{chat?.message}</p>
                                                            </div>
                                                            {chat?.link &&
                                                                (chat.link.includes(".pdf") ||
                                                                    chat.link.includes(".xlsx") ||
                                                                    chat.link.includes(".xls") ||
                                                                    chat.link.includes(".doc") ||
                                                                    chat.link.includes(".docx") ? (
                                                                    <a
                                                                        href={chat.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <button className="btn btn-primary">View Doc</button>
                                                                    </a>
                                                                ) : (
                                                                    <img
                                                                        src={chat.link}
                                                                        alt="Uploaded"
                                                                        style={{
                                                                            maxHeight: "100px",
                                                                            maxWidth: "100px",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        className="me-2"
                                                                        onClick={() => handleImageClick(chat.link)}
                                                                    />
                                                                ))}
                                                            {/* Modal for Image Preview */}
                                                            {previewImage && (
                                                                <div
                                                                    style={{
                                                                        position: "fixed",
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        zIndex: 1000,
                                                                    }}
                                                                    onClick={closePreview}
                                                                >
                                                                    <img
                                                                        src={previewImage}
                                                                        alt="Full Preview"
                                                                        style={{
                                                                            maxHeight: "90%",
                                                                            maxWidth: "90%",
                                                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                                        }}
                                                                    />
                                                                </div>
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
                                                </button>
                                            </div>))}
                                        {selectedPdfs.map((pdf, index) => (
                                            <div key={index} className="file-preview">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => removePdf(index)}>
                                                    {pdf.name}
                                                    <i className="fa-solid fa-times-circle cancel-btn"></i>
                                                </button>
                                            </div>))}
                                    </div>
                                    <div className="chatbox-input border rounded-bottom-3 d-flex align-items-center position-absolute w-100 bg-FAFAFA">
                                        <input
                                            type="text"
                                            placeholder="Reply..."
                                            className="me-3 p-2 rounded-3"
                                            value={message}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        {/* Suggestions List (Bootstrap Dropdown) */}
                                        {showSuggestions && suggestions.length > 0 && (
                                            <div className="position-absolute w-50 bg-white border rounded shadow mt-5" style={{ zIndex: 1050,bottom:"60px" }}>
                                                <ul className="list-group">
                                                    {suggestions.map((user, student_main_id) => (
                                                        <li
                                                            key={student_main_id}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => handleSelectUser(user.student_name, user.student_main_id)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {user.student_name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            className="d-none"
                                            id="pdf-upload"
                                            onChange={handlePdfUpload}
                                        />
                                        <label htmlFor="pdf-upload">
                                            <i className="fa-solid fa-file-pdf pe-2"></i>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="d-none"
                                            id="image-upload"
                                            onChange={handleImageUpload}
                                        />
                                        <label htmlFor="image-upload">
                                            <i className="fa-solid fa-image pe-2"></i>
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
                                    {fivenumber?.map((teacher) => (
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

export default Individualchat;



