import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import callAPI, { interceptor } from "../Common_Method/api";
import axios from "axios";
import { format } from "date-fns";
const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);
    const [replyBodies, setReplyBodies] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValues, setSelectedValues] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [selectedFileName, setSelectedFileName] = useState("");
    const [fileName, setFileName] = useState("");

    const user = JSON.parse(sessionStorage.getItem("user"));
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
    const handleInputChange = (msg_body_id, msg_type, value) => {
        setReplyBodies(prev => {
            const updated = [...prev];
            const index = updated.findIndex(body => body.msg_body_id === msg_body_id);

            if (index !== -1) {
                updated[index].data_reply_text = value;
            } else {
                updated.push({ msg_body_id, msg_type, data_reply_text: value });
            }
            validateForm(updated);
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
        )
    }
    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }
    if (!detail) {
        return <div className="text-center">No data available.</div>;
    }

    const validateForm = (updatedReplyBodies) => {
        const allFieldsFilled = updatedReplyBodies.every(body => {
            if (body.msg_type.startsWith("OPTION")) {
                return body.data_reply_text && JSON.parse(body.data_reply_text).selected;
            }
            if (body.msg_type.startsWith("CHECKBOX")) {
                const selectedValues = JSON.parse(body.data_reply_text).selected;
                return Object.values(selectedValues).some(value => value);
            }
            if (body.msg_type.startsWith("TEXTBOX") || body.msg_type.startsWith("TEXTAREA")) {
                return body.data_reply_text && body.data_reply_text.text.trim() !== "";
            }
            if (body.msg_type.startsWith("FILE") || body.msg_type.startsWith("CAMERA")) {
                return body.data_reply_text && body.data_reply_text.imageURIsave;
            }
            return true;
        });
        setIsFormValid(allFieldsFilled);
    };
    const midIndex = Math.ceil((detail?.data?.msg_body?.length || 0) / 2);
    const firstColumn = detail?.data?.msg_body?.slice(0, midIndex);
    const secondColumn = detail?.data?.msg_body?.slice(midIndex);

    const MessageCard = ({ msgBody, handleInputChange }) => {
        const { msg_type, data_text, msg_body_id } = msgBody;

        const [inputValue, setInputValue] = useState("");
        const [textareaValue, setTextareaValue] = useState("");
        const [selectedValues, setSelectedValues] = useState({});
        const [selectedValue, setSelectedValue] = useState("");
        const [selectedFileName, setSelectedFileName] = useState("");
        const [fileName, setFileName] = useState("");
        // const parseReplyText = (text) => {
        //     try {
        //         return text ? JSON.parse(text) : {};
        //     } catch (error) {
        //         return {};
        //     }
        // };

        const renderInputField = () => {
            if (msg_type?.startsWith("OPTION")) {
                return (
                    <div>
                        <label className="fw-bolder">{data_text?.title}</label>
                        <select
                            value={selectedValue}
                            onChange={e => {
                                const newValue = e.target.value;
                                setSelectedValue(newValue);
                                const updatedData = { selected: { 0: newValue } };
                                handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                            }}
                            className="form-control">
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
                // Safely parse the reply text if it exists
                const parsedReplyText = data_text?.data_reply_text
                    ? JSON.parse(data_text.data_reply_text)
                    : { selected: {} };

                return (
                    <div>
                        <label className="fw-bolder">{data_text.title}</label>
                        {data_text.options.map((option, idx) => {
                            const isChecked = selectedValues[idx] || false;

                            return (
                                <div key={idx}>
                                    <input
                                        type="checkbox"
                                        id={`option-${idx}`}
                                        checked={isChecked}
                                        onChange={e => {
                                            const updatedSelectedValues = {
                                                ...selectedValues,
                                                [idx]: e.target.checked
                                            };
                                            setSelectedValues(updatedSelectedValues); // Update local state
                                            const updatedData = { selected: updatedSelectedValues };
                                            handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData)); // Pass the updated data
                                        }}
                                    />
                                    <label htmlFor={`option-${idx}`} className="ms-2">{option.option}</label>
                                </div>
                            );
                        })}
                    </div>
                );
            }
            if (msg_type?.startsWith("TEXTBOX")) {
                // const parsedReplyText = data_text?.data_reply_text
                //     ? JSON.parse(data_text.data_reply_text)
                //     : { text: "" };

                const handleChangeBox = (e) => {
                    const newValue = e.target.value;
                    setInputValue(newValue);
                    const updatedData = { text: newValue };
                    handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                };

                return (
                    <div>
                        <label className="fw-bolder">{data_text.title}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={inputValue}
                            onChange={handleChangeBox}
                            autoFocus
                            onFocus={(e) => {
                                e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
                            }}
                        />
                    </div>
                );
            }

            if (msg_type?.startsWith("TEXTAREA")) {
                // const parsedReplyText = data_text?.data_reply_text
                //     ? JSON.parse(data_text.data_reply_text)
                //     : { text: "" };

                const handleChange = (e) => {
                    const newValue = e.target.value;
                    setTextareaValue(newValue);
                    const updatedData = { text: newValue };
                    handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                };

                return (
                    <div>
                        <label className="fw-bolder">{data_text.title}</label>
                        <textarea
                            className="form-control"
                            value={textareaValue}
                            onChange={handleChange}
                            rows={4}
                            autoFocus
                            onFocus={(e) => {
                                const textarea = e.target;
                                textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
                            }}
                        />
                    </div>
                );
            }


            if (msg_type?.startsWith("CAMERA")) {
                return (
                    <div className="mt-3">
                        <label className="fw-bolder">{data_text.title || "Camera Input"}</label>

                        <input
                            type="file"
                            accept="image/*"
                            capture="camera"
                            className="form-control"
                            onChange={async (e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file) {
                                    console.log("File selected:", file.name);
                                    setSelectedFileName(file.name);

                                    try {
                                        interceptor();
                                        const formData = new FormData();
                                        formData.append("file", file);

                                        const response = await callAPI.post(
                                            "/v1/admin/imageUpload_Use/imageUpload",
                                            formData,
                                            {
                                                headers: {
                                                    "Content-Type": "multipart/form-data",
                                                },
                                            });

                                        const imageLink = response?.data?.url;
                                        if (imageLink) {
                                            console.log("Image uploaded successfully:", imageLink);
                                            handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: imageLink }));
                                        } else {
                                            console.error("Failed to upload image: No URL returned");
                                            alert("Failed to upload the image. Please try again.");
                                        }
                                    } catch (error) {
                                        console.error("Error uploading file:", error);
                                        alert("Failed to upload the file. Please try again.");
                                    }
                                } else {
                                    console.log("No file selected.");
                                    alert("Please select a file.");
                                }
                            }}
                        />
                        {selectedFileName && (
                            <div className="mt-2">
                                <strong>Selected file:</strong> {selectedFileName}
                            </div>
                        )}
                    </div>
                );
            }

            if (msg_type?.startsWith("FILE")) {
                return (
                    <div className="mt-3">
                        <label className="fw-bolder">Upload File</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setFileName(file.name);

                                    try {
                                        interceptor();
                                        const formData = new FormData();
                                        formData.append("file", file);

                                        const response = await callAPI.post(
                                            "/v1/admin/imageUpload_Use/imageUpload",
                                            formData,
                                            {
                                                headers: {
                                                    "Content-Type": "multipart/form-data",
                                                },
                                            }
                                        );

                                        const imageLink = response?.data?.url;
                                        console.log(imageLink);
                                        handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: imageLink }));
                                    } catch (error) {
                                        console.error("Error uploading file:", error);
                                        alert("Failed to upload the file. Please try again.");
                                    }
                                }
                            }}
                        />
                        {fileName && <div className="mt-2 text-muted">Selected file: {fileName}</div>}
                    </div>
                );
            }
            if (msg_type?.startsWith("YOUTUBE")) {
                if (!data_text.link) {
                    return <p className="text-muted">No YouTube link provided.</p>;
                }
                try {
                    const videoId = new URLSearchParams(new URL(data_text.link).search).get("v");
                    if (!videoId) {
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
                )
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
            )
        };

        return <>{renderInputField()}</>;
    };

    const handleReply = async () => {
        console.log("Button clicked");
        const payload = {
            msg_id: parseInt(msg_id),
            mobile_no: parseInt(user?.mobile_no),
            student_main_id: parseInt(user?.scholar_no),
            sended_msg_id: parseInt(sended_msg_id),
            student_number: user?.scholar_no,
            replyBodies: replyBodies,
        };

        console.log("Payload:", payload);

        try {
            const response = await callAPI.post(`/msg/insertRepliedMessageAndBodies`, payload);
            console.log("API response:", response);
            if (response.data) {
                alert("Reply sent successfully!");
                fetchData();
            }
        } catch (error) {
            console.error("Error sending reply:", error.response || error.message);
            alert("Failed to send reply.");
        }
    };

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
                                {detail?.data?.msg_detail?.is_reply_required_any == 1 ?
                                    <button
                                        className='btn border-0 bg-FF0000 text-white rounded-5'
                                        onClick={handleReply}

                                    >
                                        {detail?.data?.is_reply_done == 1 ? "Send Reply" : "Send Reply"}
                                    </button> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Reply;


