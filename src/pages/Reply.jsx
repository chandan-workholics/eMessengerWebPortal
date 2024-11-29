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


                                <form>
                                    <div className="mb-3">
                                        <label for="exampleInputText" className="form-label text-010A48 check-name">Input 1</label>
                                        <input type="text" className="form-control" id="exampleInputText" aria-describedby="emailHelp" />                                    </div>
                                </form>
                                <form>
                                    <div className="mb-3">
                                        <label for="exampleInputText" className="form-label text-010A48 check-name">Input 2</label>
                                        <input type="text" className="form-control" id="exampleInputText" aria-describedby="emailHelp" />                                    </div>
                                </form>
                                <p className='text-010A48 fw-normal mb-0 check-name'>Lorum ipsum</p>
                                <div className="form-check">
                                    <input className="form-check-input active" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios1">
                                        Jacob Jones
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios2">
                                        Courtney Henry
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option2" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios3">
                                        Darlene Robertson
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option2" />
                                    <label className="form-check-label text-5F5F5F fs-14" for="exampleRadios4">
                                        Theresa Webb
                                    </label>
                                </div>
                                <p className='text-010A48 fw-normal mb-0 check-name'>Lorum ipsum</p>
                                <p className='text-5F5F5F fs-14'>Information regarding rakshabandhan celebration notice</p>
                                <button className='border-0 bg-FF0000 text-white rounded-5 py-1 check-name Send-btn'>Send Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reply;
