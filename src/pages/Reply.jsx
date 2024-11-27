import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import callAPI, { interceptor } from "../Common_Method/api";

const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState();

    const fetchData = async () => {
        try {
            setLoading(true);
            interceptor();

            const response = await callAPI.get(`./msg/get_single_mst_msg_by_msg_id?msg_id=${msg_id}&sended_msg_id=${sended_msg_id}`);

            if (response.data) {
                setDetail(response.data);
            } else {
                console.warn("No data received from API.");
                setDetail(null);
            }
        } catch (error) {
            console.error("Error fetching message details:", error.message);
            setDetail(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch message details when component is mounted
    }, [msg_id, sended_msg_id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!detail) {
        return <div className="text-center">No data available.</div>;
    }

    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                {/* Subject Section */}
                <div className="message-header bg-info text-white p-4 rounded">
                    <h1 className="mb-2">{detail?.data?.msg_detail?.subject_text || "No Subject"}</h1>
                    <p><strong>Priority:</strong> {detail?.data?.msg_detail?.msg_priority || "N/A"}</p>
                </div>

                {/* Message Body Section */}
                <div className="message-body-section py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {detail?.data?.msg_body?.map((msgBody, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                                    <div className="message-item p-4 rounded shadow-sm bg-white">
                                        {/* Render content dynamically based on msg_body data */}
                                        {msgBody?.data_text?.title && <h3 className="text-primary">{msgBody.data_text.title}</h3>}
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
                        </div>
                    </div>
                </div>

                {/* Additional Section for Message Footer or Other Content */}
                <div className="message-footer py-4 bg-secondary text-white text-center">
                    <p>Footer Content Here</p>
                </div>
            </div>
        </>
    );
};

export default Reply;
