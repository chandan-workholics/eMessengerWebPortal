import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import callAPI from "../Common_Method/api";
import axios from "axios";
import { format } from "date-fns";

const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);
    const [replyBodies, setReplyBodies] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(
                `./msg/get_single_mst_msg_by_msg_id?msg_id=114&sended_msg_id=1303`
            );
            if (response.data) {
                setDetail(response.data);
                setError(null);
            } else {
                setDetail(null);
                setError("No data available.");
            }
        } catch (error) {
            console.error("Error fetching message details:", error.message);
            setDetail(null);
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    // Function to handle user input changes
    const handleInputChange = (msg_body_id, msg_type, value) => {
        setReplyBodies(prev => {
            const updated = [...prev];
            const index = updated.findIndex(body => body.msg_body_id === msg_body_id);
            if (index !== -1) {
                updated[index].data_reply_text = value;
            } else {
                updated.push({ msg_body_id, msg_type, data_reply_text: value });
            }
            return updated;
        });
    };

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    if (!detail) {
        return <div className="text-center">No data available.</div>;
    }

    // Divide the msg_body into two equal arrays for rendering
    const midIndex = Math.ceil((detail?.data?.msg_body?.length || 0) / 2);
    const firstColumn = detail?.data?.msg_body?.slice(0, midIndex);
    const secondColumn = detail?.data?.msg_body?.slice(midIndex);

    const MessageCard = ({ msgBody, handleInputChange }) => {
        const { msg_type, data_text, msg_body_id } = msgBody;

        const parseReplyText = (text) => {
            try {
                return text ? JSON.parse(text) : {};
            } catch (error) {
                return {};
            }
        };

        const renderInputField = () => {

            if (msg_type?.startsWith("OPTION")) {
                const handleOptionChange = (selectedValue) => {
                    const updatedData = { selected: { 0: selectedValue } };
                    handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                    data_text.data_reply_text = JSON.stringify(updatedData);
                };

                return (
                    <div>
                        <label className="fw-bolder">{data_text.title}</label>
                        <div className="form-control">
                            {data_text.options.map((option, idx) => (
                                <div key={idx} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="option"
                                        id={`option-${idx}`}
                                        value={option.option}
                                        onChange={(e) => handleOptionChange(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor={`option-${idx}`}>
                                        {option.option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }


            // Handling CHECKBOX type (checkbox selection)
            if (msg_type?.startsWith("CHECKBOX")) {
                const parsedText = parseReplyText(data_text.data_reply_text);

                const handleCheckboxChange = (idx, isChecked) => {
                    const updatedSelected = { ...parsedText.selected, [idx]: isChecked };
                    const updatedData = { selected: updatedSelected };
                    handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                    data_text.data_reply_text = JSON.stringify(updatedData);
                };

                return (
                    <div>
                        <label className="fw-bolder">{data_text.title}</label>
                        {data_text.options.map((option, idx) => {
                            const isChecked = parsedText.selected?.[idx] || false;
                            return (
                                <div key={idx}>
                                    <input
                                        type="checkbox"
                                        id={`option-${idx}`}
                                        checked={isChecked}
                                        onChange={e => handleCheckboxChange(idx, e.target.checked)}
                                    />
                                    <label htmlFor={`option-${idx}`} className="ms-2">{option.option}</label>
                                </div>
                            );
                        })}
                    </div>
                );
            }


            // Handling TEXTBOX type (single-line input)
            if (msg_type?.startsWith("TEXTBOX")) {
                const parsedText = parseReplyText(data_text.data_reply_text);

                const handleTextboxChange = (e) => {
                    const updatedData = { text: e.target.value };
                    handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                    data_text.data_reply_text = JSON.stringify(updatedData);
                };

                return (
                    <div>
                        <label className="fw-bolder">{data_text.title}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={parsedText.text || ""}
                            onChange={handleTextboxChange}
                        />
                    </div>
                );
            }


            // Handling TEXTAREA type (multi-line input)
            if (msg_type?.startsWith("TEXTAREA")) {
                const parsedText = parseReplyText(data_text.data_reply_text);

                const handleTextareaChange = (e) => {
                    const updatedData = { text: e.target.value };
                    handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                    data_text.data_reply_text = JSON.stringify(updatedData);
                };

                return (
                    <div>
                        <label className="fw-bolder">{data_text.title}</label>
                        <textarea
                            className="form-control"
                            value={parsedText.text || ""}
                            onChange={handleTextareaChange}
                        />
                    </div>
                );
            }



            // Handling CAMERA type (file input for image capture)
            if (msg_type?.startsWith("CAMERA")) {
                const handleCameraChange = async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        try {
                            const formData = new FormData();
                            formData.append("file", file); // The key "image" should match the API's expected field name

                            const response = await axios.post(
                                "http://206.189.130.102:3550/api/v1/admin/imageUpload_Use/imageUpload",
                                formData,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );

                            const imageLink = response?.data?.url; // Assuming API returns the link in `data.url`
                            console.log(imageLink);
                            handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: imageLink }));
                        } catch (error) {
                            console.error("Error uploading file:", error);
                            alert("Failed to upload the file. Please try again.");
                        }
                    }
                };

                return (
                    <div className="mt-3">
                        <label className="fw-bolder">{data_text.title || "Camera Input"}</label>
                        <input
                            type="file"
                            accept="image/*"
                            capture="camera"
                            className="form-control"
                            onChange={handleCameraChange}
                        />
                    </div>
                );
            }


            // Handling FILE type (file upload)
            if (msg_type?.startsWith("FILE")) {
                const handleFileChange = async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        try {
                            const formData = new FormData();
                            formData.append("file", file); // The key "image" should match the API's expected field name

                            const response = await axios.post(
                                "http://206.189.130.102:3550/api/v1/admin/imageUpload_Use/imageUpload",
                                formData,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );

                            const fileLink = response?.data?.url; // Assuming API returns the link in `data.url`
                            console.log(fileLink);
                            handleInputChange(msg_body_id, msg_type, JSON.stringify({ fileURIsave: fileLink }));
                        } catch (error) {
                            console.error("Error uploading file:", error);
                            alert("Failed to upload the file. Please try again.");
                        }
                    }
                };

                return (
                    <div className="mt-3">
                        <label className="fw-bolder">Upload File</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                    </div>
                );
            }


            // For other message types, display content without input handling
            if (msg_type?.startsWith("YOUTUBE")) {
                if (!data_text.link) {
                    // If the link is blank, return a fallback message or UI
                    return <p className="text-muted">No YouTube link provided.</p>;
                }
                try {
                    const videoId = new URLSearchParams(new URL(data_text.link).search).get("v");
                    if (!videoId) {
                        // If the link is invalid or doesn't contain a valid video ID
                        return <p className="text-muted">Invalid YouTube link.</p>;
                    }
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    return (
                        <iframe
                            src={embedUrl}
                            title="YouTube Video"
                            width="100%"
                            height="300"
                            style={{ border: "none" }}
                            allowFullScreen
                        ></iframe>
                    );
                } catch (error) {
                    // If the link is not a valid URL
                    return <p className="text-muted">Invalid YouTube link format.</p>;
                }
            }


            if (msg_type?.startsWith("IMAGE")) {
                return (
                    <img
                        src={data_text.link}
                        alt="Message Content"
                        className="img-fluid rounded-3 w-100"
                    />
                );
            }

            return (
                <>
                    {data_text?.title && <label className="fw-bolder">{data_text.title}</label>}
                    {data_text?.text && <p dangerouslySetInnerHTML={{ __html: data_text.text }}></p>}
                    {data_text?.link && (
                        <div className="">
                            <label className="fw-bolder">Link Title</label>
                            <a
                                href={data_text.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-link text-start"
                            >
                                {data_text.link}
                            </a>
                        </div>
                    )}
                    {data_text?.options && (
                        <div>
                            <label className="fw-bolder">{data_text.title}</label>
                            <ul className="list-group">
                                {data_text.options?.map((option, idx) => (
                                    <li key={idx} className="list-group-item">
                                        {option.option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            );
        };

        return <>{renderInputField()}</>;
    };






    // Handle reply submission
    const handleReply = async () => {
        const payload = {
            msg_id: parseInt(msg_id),
            mobile_no: parseInt(user?.mobile_no),  // You might want to capture this dynamically
            student_main_id: parseInt(user?.scholar_no),  // Capture this dynamically if needed
            sended_msg_id: parseInt(sended_msg_id),
            student_number: user?.scholar_no,  // Capture this dynamically if needed
            replyBodies: replyBodies,
        };

        try {
            const response = await callAPI.post(
                "http://206.189.130.102:3550/api/msg/insertRepliedMessageAndBodies",
                payload
            );
            if (response.data) {
                alert("Reply sent successfully!");
                fetchData();
            }
        } catch (error) {
            console.error("Error sending reply:", error.message);
            alert("Failed to send reply.");
        }
    };



    console.log("reply", replyBodies)



    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h6 className="text-1F2C37 fw-bolder mb-0">
                            {detail?.data?.msg_detail?.subject_text}
                        </h6>
                        <h6 className="text-secondary fw-normal mb-0">
                            Show Up to : {format(new Date(detail?.data?.msg_detail?.show_upto), "dd-MMM-yyyy  hh:mm")}
                        </h6>
                    </div>
                </div>
                <div className="container my-3">
                    <div className="row">
                        {/* First Column */}
                        <div className="col-xl-6 col-lg-6 col-12">

                            <div className="card px-3 py-4 border-0 rounded-4 mb-xl-0 mb-4">
                                {firstColumn?.map((msgBody, index) => (
                                    <div key={index} className="mb-3">
                                        <MessageCard msgBody={msgBody} handleInputChange={handleInputChange} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Second Column */}
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="card px-3 py-4 rounded-4 border-0 mb-xl-0 mb-4">
                                {secondColumn?.map((msgBody, index) => (
                                    <div key={index} className="mb-3">
                                        <MessageCard msgBody={msgBody} handleInputChange={handleInputChange} />
                                    </div>
                                ))}

                                <button
                                    className='btn border-0 bg-FF0000 text-white rounded-5'
                                    onClick={handleReply}


                                >
                                    Send Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reply;
