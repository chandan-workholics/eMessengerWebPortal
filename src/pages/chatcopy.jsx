import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import sendMsgBtn from '../sendMsg-btn.png'

const Chat = () => {
    return (
        <>
            <Header />
            <div className="container-fluid p-0 chat-page">
                <div className="container">
                    <div className="row my-3">
                        <div className=" col-xl-9 col-lg-8 col-md-8 col-12">
                            <div className="card bg-FAFAFA mb-lg-0 mb-1 h-80vh position-relative border-0">
                                <div class="chatbox py-0 h-100">
                                    <div className="card-header bg-FAFAFA py-0" style={{ borderColor: '#EDEDED' }}>
                                        <div className="chatbox-header py-2 px-1">
                                            <p className='mb-0 fw-semibold text-010A48 chat-head'>88555888 - Piyush yadav</p>
                                        </div>
                                    </div>
                                    <div className="card-body py-1">
                                        <p className='text-010A48 fw-semibold mb-0 teach'>Information regarding group chat duration for biology subject</p>
                                        <div className="chatbox-messages">
                                            <div className="message outgoing mb-1">
                                                <p className='bg-E79C1D text-white mb-0 px-2 py-2 info'>Hello, how are you doing?</p>
                                            </div>
                                            <div className="message incoming mb-1 d-flex align-items-center align-self-start">
                                                <img src="Images/profile4.png" alt="" className='me-2' />
                                                <div className="message-name">
                                                    <p className='mb-0 text-010A48 info'>454545454 - Ram Yadav</p>
                                                    <p className='bg-F3F0FF text-0D082C px-2 py-2 mb-0 info'>I'm doing well, thank you! How can I help you today?</p>
                                                </div>
                                            </div>
                                            <div className="message outgoing mb-1">
                                                <p className='bg-E79C1D text-white mb-0 px-2 py-2 info'>I have a question about the return policy for a product I purchased.</p>
                                            </div>
                                            <div className="message incoming mb-1 d-flex align-items-center align-self-start">
                                                <img src="Images/profile5.png" alt="" className='me-2' />
                                                <div className="message-name">
                                                    <p className='mb-0 text-010A48 info'>454545454 - Rohit Sharma</p>
                                                    <p className='bg-F3F0FF text-0D082C px-2 py-2 info mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                </div>
                                            </div>
                                            <div className="message outgoing mb-1">
                                                <p className='bg-E79C1D text-white mb-0 px-2 py-2 info'>Lorem Ipsum is simply dum</p>
                                            </div>
                                            <div className="message incoming mb-1 d-flex align-items-center align-self-start">
                                                <img src="Images/profile2.png" alt="" className='me-2' />
                                                <div className="message-name">
                                                    <p className='mb-0 text-010A48 info'>446464688 - Mohan Kumar</p>
                                                    <p className='bg-F3F0FF px-2 py-2 info mb-0'>
                                                        <i class="fa-solid fa-circle me-1 text-C7DFFF"></i>
                                                        <i class="fa-solid fa-circle me-1 text-C7DFFF"></i>
                                                        <i class="fa-solid fa-circle text-C7DFFF"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chatbox-input d-flex align-items-center position-absolute w-100 bg-FAFAFA">
                                            <input type="text" placeholder="Reply..." className='me-3 p-2 rounded-3' />
                                            <Link> <i className="fa-solid fa-camera text-969599 me-3"></i></Link>
                                            <Link> <i className="fa-solid fa-image text-969599"></i></Link>
                                            <button className='bg-FF0000 rounded-circle px-2 py-2 d-flex justify-content-center align-items-center'>
                                                <img src={sendMsgBtn} alt="" className="ms-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                            <div className="card bg-FAFAFA" style={{ borderColor: '#F1F1F1' }}>
                                <div className="card-header bg-FAFAFA" style={{ borderColor: '#EDEDED' }}>
                                    <p className='mb-0 text-010A48 fw-semibold'><i className="fa-solid fa-circle me-2 text-4CD964"></i>Available Teacher</p>
                                </div>
                                <div className="card-body">
                                    <p className='mb-0 my-2 text-010A48 fw-normal teach'> <img src="Images/profile4.png" alt="" className='me-2' />454545454 - Ram Yadav</p>
                                    <p className='mb-0 my-2 text-010A48 fw-normal teach'><img src="Images/profile3.png" alt="" className='me-2' />454545454 - Rohit Sharma</p>
                                    <p className='mb-0 my-2 text-010A48 fw-normal teach'><img src="Images/profile5.png" alt="" className='me-2' />446464688 - Mohan Kumar</p>
                                    <p className='mb-0 my-2 text-010A48 fw-normal teach'><img src="Images/profile2.png" alt="" className='me-2' />454545454 - Ram Yadav</p>
                                    <p className='mb-0 my-2 text-010A48 fw-normal teach'><img src="Images/profile1.png" alt="" className='me-2' />446541115 - Sourabh Yadav</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat