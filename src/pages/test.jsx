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
        fetchData();  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg_id, sended_msg_id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!detail) {
        return <div className="text-center">No data available.</div>;
    }

    // Divide the msg_body into two equal arrays for rendering
    const midIndex = Math.ceil((detail?.data?.msg_body?.length || 0) / 2);
    const firstColumn = detail?.data?.msg_body?.slice(0, midIndex);
    const secondColumn = detail?.data?.msg_body?.slice(midIndex);

    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h6 className='text-1F2C37 fw-normal mb-0'>21102933 - Ram yadav</h6>
                    </div>
                </div>
                <div className="container my-3">
                    <div className="row">
                        {/ First Column /}
                        <div className="col-xl-6 col-lg-6 col-12">
                            {firstColumn?.map((msgBody, index) => (
                                <div key={index} className="card px-3 py-4 bg-FAFAFA rounded-3 border-0 mb-4">
                                    <div>
                                        {/ Dynamic content rendering /}
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
                                        {/ Conditional rendering for msg_type /}
                                        {msgBody?.msg_type === `CHECKBOX-${detail?.data?.msg_detail?.msg_chat_type}` && (
                                            <div className="mt-3">
                                                <h4>{msgBody.data_text.title}</h4>
                                                {msgBody.data_text.options.map((option, idx) => (
                                                    <div key={idx}>
                                                        <input type="checkbox" id={`option-${idx}`} />
                                                        <label htmlFor={`option-${idx}`} className="ml-2">{option.option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {msgBody?.msg_type === `YOUTUBE-${detail?.data?.msg_detail?.msg_chat_type}` && (
                                            (() => {
                                                const videoId = msgBody.data_text.link.split('v=')[1]?.split('&')[0];
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
                                        )}
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
                        {/ Second Column /}
                        <div className="col-xl-6 col-lg-6 col-12">
                            {secondColumn?.map((msgBody, index) => (
                                <div key={index} className="card px-3 py-4 bg-FAFAFA rounded-3 border-0 mb-4">
                                    <div>
                                        {/ Repeat dynamic rendering logic /}
                                        {msgBody?.data_text?.title &&
                                            <h5 className="text-010A48 mb-0">{msgBody.data_text.title}</h5>
                                        }
                                        {msgBody?.data_text?.text && <p>{msgBody.data_text.text}</p>}
                                        {msgBody?.data_text?.link && (
                                            <a href={msgBody.data_text.link} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                                {msgBody.data_text.link}
                                            </a>
                                        )}
                                        {/ Additional content as in the first column /}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reply;
