import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import callAPI from "../Common_Method/api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import axios from "axios";

const Reply = () => {
    const { msg_id, sended_msg_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);
    const [replyBodies, setReplyBodies] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [filePreview, setFilePreview] = useState(null); // Store the file preview URL
    const [uploadedFile, setUploadedFile] = useState(null); // Store the uploaded file link

    const [imagePreview, setImagePreview] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
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
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg_id, sended_msg_id]);


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

    const parseReplyText = (text) => {
        try {
            return text ? JSON.parse(text) : {};
        } catch (error) {
            return {};
        }
    };

    const renderInputField = (msgBody) => {
        const { msg_type, data_text, msg_body_id, is_reply_required } = msgBody;

        // Handle OPTION type (radio buttons)
        if (msg_type?.startsWith("OPTION")) {
            const handleOptionChange = (selectedValue) => {
                const updatedData = { selected: { 0: selectedValue } };
                handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                data_text.data_reply_text = JSON.stringify(updatedData);
            };

            return (
                <div>
                    <label className="fw-bolder">{data_text.title} {is_reply_required === 1 ? <span className="text-danger">*</span> : ''}</label>
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

        // Handle CHECKBOX type (checkbox selection)
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
                    <label className="fw-bolder">{data_text.title}{is_reply_required === 1 ? <span className="text-danger">*</span> : ''}</label>
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

        // if (msg_type?.startsWith("CHECKBOX")) {
        //     const parsedText = parseReplyText(data_text.data_reply_text);
        
        //     const handleCheckboxChange = (idx, optionValue, isChecked) => {
        //         let updatedSelected = { ...parsedText.selected };
        
        //         if (isChecked) {
        //             // Add the value if the checkbox is checked
        //             updatedSelected[idx] = optionValue;
        //         } else {
        //             // Remove the value if the checkbox is unchecked
        //             delete updatedSelected[idx];
        //         }
        
        //         const updatedData = { selected: updatedSelected };
        //         handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
        //         data_text.data_reply_text = JSON.stringify(updatedData);
        //     };
        
        //     return (
        //         <div>
        //             <label className="fw-bolder">
        //                 {data_text.title}
        //                 {is_reply_required === 1 ? <span className="text-danger">*</span> : ''}
        //             </label>
        //             {data_text.options.map((option, idx) => {
        //                 const isChecked = parsedText.selected?.[idx] !== undefined;
        //                 return (
        //                     <div key={idx}>
        //                         <input
        //                             type="checkbox"
        //                             id={`option-${idx}`}
        //                             checked={isChecked}
        //                             onChange={e => handleCheckboxChange(idx, option.option, e.target.checked)}
        //                         />
        //                         <label htmlFor={`option-${idx}`} className="ms-2">
        //                             {option.option}
        //                         </label>
        //                     </div>
        //                 );
        //             })}
        //         </div>
        //     );
        // }
        

        // Handle TEXTBOX type (single-line input)
        if (msg_type?.startsWith("TEXTBOX")) {
            const parsedText = parseReplyText(data_text.data_reply_text);

            const handleTextboxChange = (e) => {
                const updatedData = { text: e.target.value };
                handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                data_text.data_reply_text = JSON.stringify(updatedData);
            };

            return (
                <div>
                    <label className="fw-bolder">{data_text.title}{is_reply_required === 1 ? <span className="text-danger">*</span> : ''}</label>
                    <input
                        type="text"
                        className="form-control"
                        value={parsedText.text || ""}
                        onChange={handleTextboxChange}
                    />
                </div>
            );
        }

        // Handle TEXTAREA type (multi-line input)
        if (msg_type?.startsWith("TEXTAREA")) {
            const parsedText = parseReplyText(data_text.data_reply_text);

            const handleTextareaChange = (e) => {
                const updatedData = { text: e.target.value };
                handleInputChange(msg_body_id, msg_type, JSON.stringify(updatedData));
                data_text.data_reply_text = JSON.stringify(updatedData);
            };

            return (
                <div>
                    <label className="fw-bolder">{data_text.title}{is_reply_required === 1 ? <span className="text-danger">*</span> : ''}</label>
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
                        // Set the preview of the image immediately
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);

                        // Prepare the form data for the image upload
                        const formData = new FormData();
                        formData.append("file", file);

                        const response = await axios.post(
                            "http://206.189.130.102:3550/api/v1/admin/imageUpload_Use/imageUpload",
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );

                        const imageLink = response?.data?.url;
                        console.log(imageLink);

                        // Save the uploaded image link to state
                        setImageURL(imageLink);

                        handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: imageLink }));
                    } catch (error) {
                        console.error("Error uploading file:", error);
                        alert("Failed to upload the file. Please try again.");
                    }
                }
            };

            const handleRemoveImage = () => {
                setImagePreview(null);
                setImageURL(null);
                handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: null }));
            };

            return (
                <div className="mt-3">
                    <label className="fw-bolder">
                        {data_text.title || "Camera Input"}
                        {is_reply_required === 1 ? <span className="text-danger">*</span> : ''}
                    </label>
                    <div className="form-control p-3">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col text-end">
                                <button className="btn bg-FF0000 position-relative rounded-3 mb-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        capture="camera"
                                        className="form-control"
                                        onChange={handleCameraChange}
                                    />
                                    <span className="text-white">
                                        <i className="fa-solid fa-camera me-2"></i>
                                        Add Image
                                    </span>
                                </button>

                                {/* Preview the image if available */}
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    </div>
                                )}

                                {/* Remove Image Button */}
                                {imagePreview && (
                                    <button
                                        className="btn bg-FF0000 position-relative rounded-3 mt-2"
                                        onClick={handleRemoveImage}
                                    >
                                        <span className="text-white">
                                            <i className="fa-solid fa-trash me-2"></i>
                                            Remove Image
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        // Handling FILE type (file upload)
        if (msg_type?.startsWith("FILE")) {
            const getFileIcon = (fileName) => {
                const extension = fileName.split('.').pop().toLowerCase();
                switch (extension) {
                    case 'pdf':
                        return 'fa-file-pdf'; // PDF icon
                    case 'doc':
                    case 'docx':
                        return 'fa-file-word'; // Word icon
                    case 'xls':
                    case 'xlsx':
                        return 'fa-file-excel'; // Excel icon
                    default:
                        return 'fa-file'; // Default file icon for unknown file types
                }
            };

            const handleFileChange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        // Set the file preview URL (or icon based on the file type)
                        setFilePreview(URL.createObjectURL(file));

                        const formData = new FormData();
                        formData.append("file", file); // The key "file" should match the API's expected field name

                        const response = await axios.post(
                            "http://206.189.130.102:3550/api/v1/admin/pdfUpload_Use/pdfUpload",
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );

                        const fileLink = response?.data?.url; // Assuming API returns the link in `data.url`
                        console.log(fileLink);
                        setUploadedFile(fileLink); // Store the uploaded file URL
                        handleInputChange(msg_body_id, msg_type, JSON.stringify({ imageURIsave: fileLink }));
                    } catch (error) {
                        console.error("Error uploading file:", error);
                        alert("Failed to upload the file. Please try again.");
                    }
                }
            };

            const handleRemoveFile = () => {
                setFilePreview(null); // Remove the file preview
                setUploadedFile(null); // Reset the uploaded file link
            };

            return (
                <div className="mt-3">
                    <label className="fw-bolder">Upload File{is_reply_required === 1 ? <span className="text-danger">*</span> : ''}</label>
                    <div className="form-control p-3">
                        <div className="row">
                            <div className="col-6">
                                {/* File preview: Show an icon or text based on file type */}
                                {filePreview && (
                                    <div className="file-preview text-center">
                                        {filePreview && !filePreview.startsWith("data:image") ? (
                                            <i className={`fa ${getFileIcon(filePreview)} fa-5x`}></i> // Document icon
                                        ) : (
                                            <img src={filePreview} alt="File preview" className="img-fluid" /> // Image preview
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="col-6 text-end">
                                <button className="btn bg-FF0000 position-relative rounded-3 mb-2">
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                    />
                                    <span className="text-white">
                                        <i className="fa-solid fa-paperclip me-2"></i>
                                        Add File
                                    </span>
                                </button>
                                <br />
                                {uploadedFile && (
                                    <button
                                        className="btn bg-FF0000 position-relative rounded-3 mt-2"
                                        onClick={handleRemoveFile}
                                    >
                                        <span className="text-white">
                                            <i className="fa-solid fa-trash me-2"></i>
                                            Remove File
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
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
                    <>
                        {data_text?.title && <label className="fw-bolder">{data_text.title}</label>}
                        <iframe
                            src={embedUrl}
                            title="YouTube Video"
                            width="100%"
                            height="300"
                            style={{ border: "none" }}
                            allowFullScreen
                        ></iframe>
                    </>

                );
            } catch (error) {
                // If the link is not a valid URL
                return <p className="text-muted">Invalid YouTube link format.</p>;
            }
        }


        if (msg_type?.startsWith("IMAGE")) {
            return (
                <>
                    {data_text?.title && <label className="fw-bolder">{data_text.title}</label>}
                    <img
                        src={data_text.link}
                        alt="Message Content"
                        className="img-fluid rounded-3 w-100"
                    />
                </>

            );
        }

        return (
            <>
                {data_text?.title && <label className="fw-bolder">{data_text.title}</label>}
                {data_text?.text && <p dangerouslySetInnerHTML={{ __html: data_text.text }}></p>}
                {data_text?.link && (
                    <div className="">

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

    const handleReply = async () => {
        const payload = {
            msg_id: parseInt(msg_id),
            mobile_no: parseInt(user?.mobile_no),
            student_main_id: parseInt(user?.scholar_no),
            sended_msg_id: parseInt(sended_msg_id),
            student_number: user?.scholar_no,
            replyBodies: replyBodies,
        };

        try {
            const response = await callAPI.post(
                "http://206.189.130.102:3550/api/msg/insertRepliedMessageAndBodies",
                payload
            );
            if (response.data) {
                toast.success("Reply sent successfully!");
                fetchData();
            }
        } catch (error) {
            console.error("Error sending reply:", error.message);
            toast.error("Failed to send reply.");
        }
    };


console.log(imageURL)
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
                            Show Up to : {format(new Date(detail?.data?.msg_detail?.show_upto), "dd-MMM-yyyy  hh:mm a")}
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
                                        {renderInputField(msgBody)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Second Column */}
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="card px-3 py-4 rounded-4 border-0 mb-xl-0 mb-4">
                                {secondColumn?.map((msgBody, index) => (
                                    <div key={index} className="mb-3">
                                        {renderInputField(msgBody)}
                                    </div>
                                ))}

                                {detail?.data?.msg_detail?.is_reply_required_any === 1 ?
                                    <button
                                        className={`btn border-0 text-white rounded-5 ${detail?.data?.is_reply_done === 1 ? 'bg-secondary' : 'bg-FF0000'
                                            }`}
                                        onClick={handleReply}
                                        // disabled={detail?.data?.is_reply_done === 1}

                                    >
                                        {detail?.data?.is_reply_done === 1 ? "Send Reply" : "Send Reply"}
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