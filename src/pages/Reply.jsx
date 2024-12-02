import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import callAPI, { interceptor } from "../Common_Method/api";

const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [responses, setResponses] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg_id, sended_msg_id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (!detail) return <div className="text-center">No data available.</div>;

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
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="card px-3 py-4 bg-FAFAFA rounded-3 border-0">
                                {detail?.data?.msg_body?.map((msgBody) => (
                                    <div key={msgBody.msg_body_id} className="mb-4">
                                        <h5 className="text-010A48 mb-2">{msgBody?.data_text?.title}</h5>
                                        {/* Render input fields based on message type */}
                                        {msgBody?.msg_type.includes("TEXTBOX") && (
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={msgBody?.data_text?.placeholder}
                                                onChange={(e) => handleInputChange(msgBody.msg_body_id, msgBody.msg_type, { text: e.target.value })}
                                            />
                                        )}
                                        {msgBody?.msg_type.includes("CHECKBOX") && (
                                            <div>
                                                {msgBody?.data_text?.options.map((option, index) => (
                                                    <div key={index}>
                                                        <input
                                                            type="checkbox"
                                                            id={`checkbox-${msgBody.msg_body_id}-${index}`}
                                                            onChange={(e) => handleInputChange(msgBody.msg_body_id, msgBody.msg_type, {
                                                                selected: { [index]: e.target.checked }
                                                            })}
                                                        />
                                                        <label htmlFor={`checkbox-${msgBody.msg_body_id}-${index}`} className="ml-2">{option.option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {/* Add other input types as needed */}
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
