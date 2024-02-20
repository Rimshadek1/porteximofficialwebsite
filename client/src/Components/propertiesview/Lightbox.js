import React from 'react';
import './Lightbox.css';

const Lightbox = ({ imageUrl, onClose }) => {
    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-container">
                <img src={imageUrl} alt="Large Preview" />
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Lightbox;
