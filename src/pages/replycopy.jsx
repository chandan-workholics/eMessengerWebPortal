import React, { useEffect, useState } from "react";
import Header from '../components/Header'
import { Link } from 'react-router-dom'
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
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h6 className='text-1F2C37 fw-normal mb-0'>21102933 - Ram yadav</h6>
                    </div>
                </div>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="card px-3 py-3 bg-FAFAFA rounded-3 me-2 border-0 mb-lg-0 mb-2">
                                <h3 className="">{detail?.data?.msg_detail?.subject_text || "No Subject"}</h3>
                                <p><strong>Priority:</strong> {detail?.data?.msg_detail?.msg_priority || "N/A"}</p>
                            </div>
                            <div className="card px-3 py-3 bg-FAFAFA rounded-3 me-2 border-0 mb-lg-0 mb-2">
                                <h6 className='text-010A48 mb-0 fw-semibold'>Loraum ipsum</h6>
                                <p className='text-5F5F5F time'>Show Upto: 2024-09-30 11:45:00</p>
                                <img src="Images/Reply.png" alt="" className='mb-2' />
                                <Link to='' className='mb-2 fs-14'>https://www.google.com/search?sca_esv=ba9a00bd53z</Link>
                                <div className="image-btn d-flex">
                                    <button className='rounded-2 text-white bg-E79C1D px-lg-2 px-1 py-1  me-3 fs-14 Add-btn'>Add Image</button>
                                    <button className='rounded-2 text-white bg-4CD964 px-2 py-1  me-2 fs-14 Remove-btn'>Remove image</button>
                                </div>
                                <div className="card border-e0e0e0 px-2 py-2 my-4">
                                    <img src="Images/reply1.png" alt="" className='mb-1' />
                                    <p className='text-010A48 mb-0 fw-semibold check-name'>Lorem ipsum dolor sit amet,consectetur aliquip</p>
                                    <Link to='' className='text-decoration-none time'><i class="fa-brands fa-youtube text-FF0000 me-2"></i>View Youtube</Link>
                                </div>
                                <img src="Images/reply2.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="card px-3 py-4 bg-FAFAFA rounded-3 border-0">
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

            {/* Subject Section */}
            {/* <div className="message-header bg-info text-white p-4 rounded">
                    <h1 className="mb-2">{detail?.data?.msg_detail?.subject_text || "No Subject"}</h1>
                    <p><strong>Priority:</strong> {detail?.data?.msg_detail?.msg_priority || "N/A"}</p>
                </div> */}

            {/* Message Body Section */}
            <div className="message-body-section py-5">
                <div className="container">
                    <div className="row">
                        {detail?.data?.msg_body?.map((msgBody, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                                <div className="message-item bg-FAFAFA p-4 rounded shadow-sm bg-white">
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


        </>
    )
}

export default Reply