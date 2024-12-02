import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import callAPI, { interceptor } from "../Common_Method/api";

const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(nullnull);
    const [responses, setResponses] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleInputChange = (msg_body_id, msg_type, value) => {
        setResponses(prev => ({
            ...prev,
            [msg_body_id]: {
                msg_body_id,
                msg_type,
                data_reply_text: JSON.stringify(value)
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const payload = {
                msg_id,
                mobile_no: 9009436798,
                student_main_id: 14,
                sended_msg_id,
                student_number: "44010105",
                replyBodies: Object.values(responses)
            };

            const response = await callAPI.post(`http://206.189.130.102:3550/api/msg/insertRepliedMessageAndBodies`, payload);

            if (response.data?.success) {
                alert("Reply submitted successfully!");
            } else {
                alert("Failed to submit reply.");
            }
        } catch (error) {
            console.error("Error submitting reply:", error.message);
            alert("An error occurred while submitting your reply.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [msg_id, sended_msg_id]);

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

    const MessageCard = ({ msgBody }) => {
        const { msg_type, data_text } = msgBody;

        if (msg_type?.startsWith("YOUTUBE")) {
            const videoId = new URLSearchParams(new URL(data_text.link).search).get("v");
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
        }

        if (msg_type?.startsWith("IMAGE")) {
            return (
                <img
                    src={data_text.link}
                    alt="Message Content"
                    className="img-fluid rounded"
                />
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
                    />
                </div>
            );
        }

        if (msg_type?.startsWith("FILE")) {
            return (
                <div className="mt-3">
                    <h4>Upload File</h4>
                    <input type="file" className="form-control" />
                </div>
            );
        }

        return (
            <>
                {data_text?.title && (
                    <h5 className="text-010A48 mb-0">{data_text.title}</h5>
                )}
                {data_text?.text && <p>{data_text.text}</p>}
                {data_text?.link && (
                    <a
                        href={data_text.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-link"
                    >
                        {data_text.link}
                    </a>
                )}
                {/* {data_text?.msg_type === `CHECKBOX-${detail?.data?.msg_detail?.msg_chat_type}` && (
                    <div className="mt-3">
                        <h4>{msgBody.data_text.title}</h4>
                        {msgBody.data_text.options.map((option, idx) => (
                            <div key={idx}>
                                <input type="checkbox" id={`option-${idx}`} />
                                <label htmlFor={`option-${idx}`} className="ml-2">{option.option}</label>
                            </div>
                        ))}
                    </div>
                )} */}
                {data_text?.options && (
                    <div>
                        <h4>{data_text.title}</h4>
                        <ul className="list-group">
                            {data_text.options?.map((option, idx) => (
                                <li key={idx} className="list-group-item">
                                    {option.option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {data_text?.placeholder && (
                    <div className="mt-3">
                        <label>{data_text.title}</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={data_text.placeholder}
                        />
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h6 className='text-1F2C37 fw-normal mb-0'>{msg_id} - {detail?.data?.msg_detail?.student_name}</h6>
                    </div>
                </div>
                <div className="container my-3">
                    <div className="row">
                        {/* First Column */}
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="card px-3 py-4 bg-FAFAFA rounded-3 border-0">
                                {detail?.data?.msg_body?.map((msgBody, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="">
                                            {/* Render content dynamically based on msg_body data */}
                                            {msgBody?.data_text?.title &&
                                                <h5 className="text-010A48 mb-0">{msgBody.data_text.title}</h5>
                                            }
                                            {msgBody?.data_text?.text && <p>{msgBody.data_text.text}</p>}
                                            {msgBody?.data_text?.link && (
                                                <a href={msgBody.data_text.link} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                                    {msgBody.data_text.link}
                                                </a>
                                            )}
                                            {msgBody?.data_text?.options && (
                                                <div>
                                                    <h4>{msgBody.data_text.title}</h4>
                                                    <ul className="list-group">
                                                        {msgBody.data_text.options?.map((option, idx) => (
                                                            <li key={idx} className="list-group-item">{option.option}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {msgBody?.data_text?.placeholder && (
                                                <div className="mt-3">
                                                    <label>{msgBody.data_text.title}</label>
                                                    <input type="text" className="form-control" placeholder={msgBody.data_text.placeholder} />
                                                </div>
                                            )}
                                            {msgBody?.msg_type === `CHECKBOX-${detail?.data?.msg_detail?.msg_chat_type}` && (
                                                <div className="mt-3">
                                                    <h4>{msgBody.data_text.title}</h4>
                                                    {msgBody.data_text.options.map((option, index) => (
                                                        <div key={index}>
                                                            <input type="checkbox" id={`option-${index}`} />
                                                            <label htmlFor={`option-${index}`} className="ml-2">{option.option}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {
                                                msgBody?.msg_type === `YOUTUBE-${detail?.data?.msg_detail?.msg_chat_type}` && (
                                                    (() => {
                                                        // Extract the video ID from the link
                                                        const videoId = msgBody.data_text.link.split('v=')[1]?.split('&')[0];

                                                        // Create the embed URL
                                                        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                                                        return (
                                                            <div className="mt-3">
                                                                <iframe
                                                                    src={embedUrl}
                                                                    title="YouTube Video"
                                                                    width="100%"
                                                                    height="300"
                                                                    style={{ border: "none" }}
                                                                    allowFullScreen
                                                                ></iframe>
                                                            </div>
                                                        );
                                                    })()
                                                )
                                            }

                                            {msgBody?.msg_type === `IMAGE-${detail?.data?.msg_detail?.msg_chat_type}` && (
                                                <div className="mt-3">
                                                    <img
                                                        src={msgBody.data_text.link}
                                                        alt=""
                                                        className="img-fluid rounded"
                                                    />
                                                </div>
                                            )}
                                            {msgBody?.msg_type === `CAMERA-${detail?.data?.msg_detail?.msg_chat_type}` && (
                                                <div className="mt-3">
                                                    <h4>{msgBody.data_text?.title || "Camera Input"}</h4>
                                                    <input type="file" accept="image/*" capture="camera" className="form-control" />
                                                </div>
                                            )}
                                            {msgBody?.msg_type === `FILE-${detail?.data?.msg_detail?.msg_chat_type}` && (
                                                <div className="mt-3">
                                                    <h4>Upload File</h4>
                                                    <input type="file" className="form-control" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Send Reply"}
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
