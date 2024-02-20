import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { viewTradesFunded } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import TradeCard from '../TradeCard';
import './Books.css';

function Itemsfunded() {
    const [trade, setTrade] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await viewTradesFunded();
                if (response.status === 200) {
                    const tradesArray = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                    setTrade(tradesArray);
                    navigate("/fundeded");
                } else {
                    toast.error(response.response.data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [navigate]);

    const zeroSharesTrades = trade.filter(tradeItem => tradeItem.sharesavailable === 0);

    return (
        <div className='readytoshrink'>
            <div className="container-fluid py-5">
                <h1 className="display-4 text-black animated slideInDown">Items to Export</h1>
            </div>

            <div className='exportstatus text-center'>
                <Link to='/itemtoexport' className="funded">Available</Link>
                <Link className="available">Funded</Link>
                <Link to='/exiteded' className="exited">Exited</Link>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 portfolio-container">
                        {zeroSharesTrades.length > 0 ? (
                            zeroSharesTrades.map((tradeItem) => (
                                <TradeCard key={tradeItem._id} tradeItem={tradeItem} />
                            ))
                        ) : (
                            <div className="text-center">
                                <h3>No items present</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Itemsfunded;
