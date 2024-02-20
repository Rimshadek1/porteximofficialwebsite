import React, { useState } from 'react';
import './verification.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { sentVerification } from '../../services/Apis';

function Verificaton() {
    const [proofFront, setProofFront] = useState(null);
    const [proofBack, setProofBack] = useState(null);
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const navigate = useNavigate();

    const proofSizeLimitKB = 200;


    const handleFileChange = async (e, setProof) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = file.size;
            const fileSizeInKB = fileSize / 1024;

            if (fileSizeInKB <= proofSizeLimitKB) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProof(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('File size must be 200 KB or less. Please compress your image.');
                e.target.value = null;
            }
        }
    };

    const handleProofFrontChange = (e) => {
        handleFileChange(e, setProofFront);
    };

    const handleProofBackChange = (e) => {
        handleFileChange(e, setProofBack);
    };

    const submitVerification = async (e) => {
        e.preventDefault();
        if (!proofFront || !proofBack) {
            toast.error('Upload both Adhaar front and back images!');
        } else {
            const data = {
                proofFront: proofFront,
                proofBack: proofBack,
                bankAccountNumber: bankAccountNumber,
                ifscCode: ifscCode,
            };

            try {
                const response = await sentVerification(data);
                if (response.status === 200) {
                    toast.success('Verification submitted successfully!');
                    navigate('/home');
                } else {
                    toast.error(response.response.data.error);
                }
            } catch (error) {
                console.error('Error submitting verification:', error);
                toast.error('An error occurred while submitting verification.');
            }
        }
    };

    return (
        <div className="full">
            <div className="center">
                <img src="img/portexim.png" alt="logo" />
                <h2>Verification</h2>
                <div className="doc">
                    <p>Adhaar card front</p>
                    <input
                        type="file"
                        required
                        className="form-control"
                        id="proofFront"
                        autoComplete="off"
                        name="proofFront"
                        onChange={handleProofFrontChange}
                        accept=".jpg, .png"
                    />
                </div>
                <div className="doc">
                    <p>Adhaar card back</p>
                    <input
                        type="file"
                        required
                        className="form-control"
                        id="proofBack"
                        autoComplete="off"
                        name="proofBack"
                        onChange={handleProofBackChange}
                        accept=".jpg, .png"
                    />
                </div>
                <div className="doc">
                    <p>Bank account number</p>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="bank"
                        autoComplete="off"
                        name="bank"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                    />
                </div>

                <div className="doc">
                    <p>IFSC code</p>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="IFSC"
                        autoComplete="off"
                        name="IFSC"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        onInput={(e) => {
                            e.target.value = e.target.value.toUpperCase();
                        }}
                    />
                </div>


                <button className="btn" onClick={submitVerification}>
                    Submit
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Verificaton;
