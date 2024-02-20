import React from 'react'
import ProgressBar from '../Progressbar'
import { Link } from 'react-router-dom'

function ProfitTradeCard({ tradeItem }) {
    const percentage = tradeItem.trade.shares !== 0 ? ((tradeItem.trade.shares - tradeItem.trade.sharesavailable) / tradeItem.trade.shares) * 100 : 0;
    const profit = (tradeItem.profit.tradeProfit / tradeItem.trade.price) * 100

    return (
        <div className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp rounded" data-wow-delay="0.1s">
            <Link to={`/propertiesview/${tradeItem.trade._id}`}>
                <div className="rounded overflow-hidden">
                    <div className="position-relative overflow-hidden">
                        <img
                            className="img-fluid w-100"
                            src={`data:image;base64,${tradeItem.trade.image1.toString('base64')}`}
                            alt="firstimage"
                            style={{ width: '200px', height: '300px' }}
                        />
                    </div>

                    <div className="bg-white border-light border-top-0 p-4 rounded">
                        <h5 className="lh-base mb-2">{tradeItem.trade.trade}</h5>
                        <h5 className="lh-base mb-4 text-primary">RS {tradeItem.trade.price}</h5>
                        <ProgressBar bgcolor="#ff3c00" progress={percentage} height="5px" />
                        <div className='shipmentdetails mt-4'>
                            <p className="mb-2">Returns profit percentage:<strong >{profit}%</strong></p>
                            <p className="mb-2">Total profit earned: <strong >{tradeItem.profit.tradeProfit}</strong></p>
                            {/* <p className="mb-2">Expected Reaching Date: <strong >{tradeItem.trade.reaching}</strong></p> */}
                            <p className="mb-2">Expected Returns Date: <strong >{tradeItem.trade.returnsDate}</strong></p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProfitTradeCard