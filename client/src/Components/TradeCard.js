import React from 'react';
import ProgressBar from './Progressbar';
import { Link } from 'react-router-dom';

const TradeCard = ({ tradeItem }) => {
    // Calculate the percentage based on shares and sharesavailable
    const percentage = tradeItem.shares !== 0 ? ((tradeItem.shares - tradeItem.sharesavailable) / tradeItem.shares) * 100 : 0;
    return (
        <div className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp rounded" data-wow-delay="0.1s">
            <Link to={`/propertiesview/${tradeItem._id}`}>
                <div className="rounded overflow-hidden">
                    <div className="position-relative overflow-hidden">
                        <img
                            className="img-fluid w-100"
                            src={`data:image;base64,${tradeItem.image1.toString('base64')}`}
                            alt="firstimage"
                            style={{ width: '200px', height: '300px' }} // Adjust the dimensions as needed
                        />
                    </div>

                    <div className="bg-white border-light border-top-0 p-4 rounded">
                        <h5 className="lh-base mb-2">{tradeItem.trade}</h5>
                        <h5 className="lh-base mb-4 text-primary">RS {tradeItem.price}</h5>
                        <ProgressBar bgcolor="#ff3c00" progress={percentage} height="5px" />
                        {/* Additional information */}
                        <div className='shipmentdetails mt-4'>
                            <p className="mb-2">Expected Return:<strong >{tradeItem.returnPercentage}%</strong></p>
                            <p className="mb-2">Expected Shipping Date: <strong >{tradeItem.shippingDate}</strong></p>
                            <p className="mb-2">Expected Reaching Date: <strong >{tradeItem.reaching}</strong></p>
                            <p className="mb-2">Expected Returns Date: <strong >{tradeItem.returnsDate}</strong></p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TradeCard;
