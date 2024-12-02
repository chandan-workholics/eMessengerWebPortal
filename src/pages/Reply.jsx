import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import callAPI, { interceptor } from "../Common_Method/api";

const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

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
                        <h6 className="text-1F2C37 fw-normal mb-0">
                            21102933 - Ram Yadav
                        </h6>
                    </div>
                </div>
                <div className="container my-3">
                    <div className="row">
                        {/* First Column */}
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="card px-3 py-4 bg-FAFAFA rounded-3 border-0">
                                {firstColumn?.map((msgBody, index) => (
                                    <div key={index} className="mb-4">
                                        <MessageCard msgBody={msgBody} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Second Column */}
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="card px-3 py-4 bg-FAFAFA rounded-3 border-0">
                                {secondColumn?.map((msgBody, index) => (
                                    <div key={index} className="mb-4">
                                        <MessageCard msgBody={msgBody} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reply;
