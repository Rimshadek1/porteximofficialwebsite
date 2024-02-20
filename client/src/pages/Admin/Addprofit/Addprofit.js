import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tradeProfit, viewTradeProfit } from '../../../services/Apis';

function Addprofit() {
    const { id } = useParams();
    const [tradeProfits, setTradeProfit] = useState('');
    const [existingTradeProfit, setExistingTradeProfit] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await viewTradeProfit(id);
            if (response.status === 200) {
                setExistingTradeProfit(response.data.existingTradeProfit.tradeProfit);
            } else {
                alert('Failed to fetch trade profit');
            }
        } catch (error) {
            console.error('Error fetching trade profit:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            productId: id,
            tradeProfit: tradeProfits
        };
        try {
            const response = await tradeProfit(data);
            if (response.status === 200) {
                alert('Trade profit updated successfully');
                navigate('/admindash');
            } else {
                alert('Failed to update trade profit');
            }
        } catch (error) {
            console.error('Error updating trade profit:', error);
            alert('Failed to update trade profit');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                    <legend>Enter Profit</legend>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-4">
                            <label htmlFor="tradeprofit">Enter trade profit</label>
                            <input
                                type="number"
                                className="form-control"
                                name="tradeprofit"
                                id="tradeprofit"
                                placeholder={existingTradeProfit ? `You set your profit as ${existingTradeProfit}` : 'Set your profit'}
                                required
                                value={tradeProfits}
                                onChange={(e) => setTradeProfit(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addprofit;
