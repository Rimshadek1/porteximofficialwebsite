import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getTradeDetailsProfit } from '../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import ProfitTradeCard from './cart/ProfitTradeCard';
function Exit() {
    const [profit, setProfit] = useState([]); const navigate = useNavigate();
    useEffect(() => {
        const fetchProfitData = async () => {
            try {
                const response = await getTradeDetailsProfit();
                if (response.status === 200) {
                    const tradesArray = Array.isArray(response.data.combinedData) ? response.data.combinedData : [response.data.combinedData];
                    setProfit(tradesArray);
                    navigate("/exiteded");
                } else {
                    toast.error(response.response.data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfitData();
    }, [navigate]);


    return (
        <div>
            {/* topimage */}
            <div className="container-fluid page-header py-5 mb-5">
                <div className="container py-5 text-center">
                    <h1 className="display-4 text-white mb-3 animated slideInDown">Items to Export</h1>
                    <p className="lead text-white mb-4 animated slideInDown mx-auto" style={{ fontSize: '1rem' }}>
                        You can start with a small investment amount and gradually grow your presence in the international trade landscape.
                    </p>
                </div>
            </div>
            {/* topimage */}
            {/*buttons */}
            <div className='exportstatus text-center'>
                <Link to='/booking' class="funded">Available</Link>
                <Link to='/funded' class="funded">Funded</Link>
                <Link to='/exited' class="available">Exited</Link>

            </div>
            {/*buttons */}

            {/* cards */}

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 portfolio-container">
                        {profit.length > 0 ? (
                            profit.map((tradeItem) => (
                                <ProfitTradeCard key={tradeItem._id} tradeItem={tradeItem} />
                            ))
                        ) : (
                            <div className="text-center">
                                <h3>No items present</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* cards */}
            <ToastContainer />

        </div >
    )
}

export default Exit