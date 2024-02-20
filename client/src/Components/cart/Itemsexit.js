import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTradeDetailsProfit } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import './Books.css';
import ProfitTradeCard from './ProfitTradeCard';

function Itemsexit() {
    const [profit, setProfit] = useState([]);
    const navigate = useNavigate();

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
        <div className='readytoshrink'>
            <div className="container-fluid py-5">
                <h1 className="display-4 text-black animated slideInDown">Items to Export</h1>
            </div>

            <div className='exportstatus text-center'>
                <Link to='/itemtoexport' className="funded">Available</Link>
                <Link to='/fundeded' className="funded">Funded</Link>
                <Link to='/exiteded' className="available">Exited</Link>
            </div>

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

            <ToastContainer />
        </div>
    );
}

export default Itemsexit;
