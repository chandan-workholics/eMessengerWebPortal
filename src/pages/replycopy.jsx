import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams,Link } from "react-router-dom";
import callAPI, { interceptor } from "../Common_Method/api";

const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);
    const [replyBodies, setReplyBodies] = useState([]);  // State to track the reply bodies

    const fetchData = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(
                `./msg/get_single_mst_msg_by_msg_id?msg_id=${msg_id}&sended_msg_id=${sended_msg_id}`
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
    }, [msg_id, sended_msg_id]);

    // Handle reply submission
    const handleReply = async () => {
        const payload = {
            msg_id,
            mobile_no: 9009436798,  // You might want to capture this dynamically
            student_main_id: 14,  // Capture this dynamically if needed
            sended_msg_id,
            student_number: "44010105",  // Capture this dynamically if needed
            replyBodies: replyBodies,
        };

        try {
            const response = await callAPI.post(
                "http://206.189.130.102:3550/api/msg/insertRepliedMessageAndBodies",
                payload
            );
            if (response.data) {
                alert("Reply sent successfully!");
            }
        } catch (error) {
            console.error("Error sending reply:", error.message);
            alert("Failed to send reply.");
        }
    };

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
                return (
                    <div>
                        <h4>{data_text.title}</h4>
                        <select
                            onChange={e => {
                                const selectedValue = e.target.value;
                                const updatedData = { selected: { 0: selectedValue } };
                                handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                            }}
                            className="form-control"
                        >
                            {data_text.options.map((option, idx) => (
                                <option key={idx} value={option.option}>
                                    {option.option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }
            if (msg_type?.startsWith("CHECKBOX")) {
                const parsedText = parseReplyText(data_text.data_reply_text);
                return (
                    <div>
                        <h4>{data_text.title}</h4>
                        {data_text.options.map((option, idx) => {
                            const isChecked = parsedText.selected?.[idx] || false;
                            return (
                                <div key={idx}>
                                    <input
                                        type="checkbox"
                                        id={`option-${idx}`}
                                        checked={isChecked}
                                        onChange={e => {
                                            const updatedSelected = { ...parsedText.selected, [idx]: e.target.checked };
                                            const updatedData = { selected: updatedSelected };
                                            handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                                        }}
                                    />
                                    <label htmlFor={`option-${idx}`} className="ml-2">{option.option}</label>
                                </div>
                            );
                        })}
                    </div>
                );
            }

            if (msg_type?.startsWith("TEXTBOX")) {
                const parsedText = parseReplyText(data_text.data_reply_text);
                return (
                    <div>
                        <label>{data_text.title}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={parsedText.text || ""}
                            onChange={e => {
                                const updatedData = { text: e.target.value };
                                handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                            }}
                        />
                    </div>
                );
            }

            if (msg_type?.startsWith("TEXTAREA")) {
                const parsedText = parseReplyText(data_text.data_reply_text);
                return (
                    <div>
                        <label>{data_text.title}</label>
                        <textarea
                            className="form-control"
                            value={parsedText.text || ""}
                            onChange={e => {
                                const updatedData = { text: e.target.value };
                                handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                            }}
                        />
                    </div>
                );
            }

            if (msg_type?.startsWith("CAMERA")) {
                return (
                    <div className="mt-3">
                        <h4>{data_text.title || "Camera Input"}</h4>
                        <input
                            type="file"
                            accept="image/*"
                            capture="camera"
                            className="form-control"
                            onChange={e => {
                                const file = e.target.files[0];
                                handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: file ? URL.createObjectURL(file) : "" }));
                            }}
                        />
                    </div>
                );
            }

            if (msg_type?.startsWith("FILE")) {
                return (
                    <div className="mt-3">
                        <h4>Upload File</h4>
                        <input
                            type="file"
                            className="form-control"
                            onChange={e => {
                                const file = e.target.files[0];
                                handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: file ? URL.createObjectURL(file) : "" }));
                            }}
                        />
                    </div>
                );
            }

            return null;
        };

        return <>{renderInputField()}</>;
    };

    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h6 className="text-muted">
                            <Link to={`/message-center`} style={{ color: "#2196F3" }}>
                                Message Center
                            </Link> &gt;
                            <span className="ms-1 text-secondary">Reply</span>
                        </h6>
                    </div>
                </div>

                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-6">{firstColumn?.map((msgBody, index) => (
                            <div key={index}>
                                <MessageCard msgBody={msgBody} handleInputChange={handleInputChange} />
                                <hr />
                            </div>
                        ))}</div>

                        <div className="col-md-6">
                            {secondColumn?.map((msgBody, index) => (
                                <div key={index}>
                                    <MessageCard msgBody={msgBody} handleInputChange={handleInputChange} />
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-center mt-4">
                            <button className="btn btn-primary" onClick={handleReply}>Send Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reply;


