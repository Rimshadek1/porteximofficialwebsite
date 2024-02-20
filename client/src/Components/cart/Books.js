import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { viewTrades } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import './Books.css'
import TradeCard from '../TradeCard';
function Books() {
    const [trade, setTrade] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await viewTrades();
                if (response.status === 200) {
                    const tradesArray = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                    setTrade(tradesArray);
                    navigate("/itemtoexport");
                } else {
                    toast.error(response.response.data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [navigate]);
    const filteredTrade = trade.filter(tradeItem => tradeItem.sharesavailable > 0);
    return (
        <div className='readytoshrink'>
            {/* topimage */}
            <div className="container-fluid  py-5">
                <h1 className="display-4 text-black animated slideInDown">Items to Export</h1>

            </div>
            {/* topimage */}
            {/*buttons */}
            <div className='exportstatus ready text-center text-start'>
                <Link class="available">Available</Link>
                <Link to='/fundeded' class="funded">Funded</Link>
                <Link to='/exiteded' class="exited">Exited</Link>
            </div>

            {/*buttons */}

            {/* cards */}

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 portfolio-container">
                        {filteredTrade.length > 0 ? (
                            filteredTrade.map((tradeItem) => (
                                <TradeCard key={tradeItem._id} tradeItem={tradeItem} />
                            ))
                        ) : (
                            <div className="text-center">
                                <h3>No trades available</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>




            {/* cards */}
            <ToastContainer />

        </div>
    )
}

export default Books