import React, { useEffect, useState } from 'react';
import './Portfolioitems.css';
import { Table } from 'react-bootstrap';
import { portfolioValue } from '../../../services/Apis';

function PortfolioItems() {
    const [portFolio, setPortfolio] = useState();
    const [portFolioCount, setPortfolioCount] = useState();
    const [tradeInfo, setTradeInfo] = useState([]);
    const [profitInfo, setProfitInfo] = useState([]);


    useEffect(() => {
        fetchPortfolioData();
    }, []);

    const fetchPortfolioData = async () => {
        try {
            const response = await portfolioValue();
            if (response.status === 200) {
                setPortfolio(response.data.totalSpent);
                setPortfolioCount(response.data.countTotalPurchases);
                setTradeInfo(response.data.productsInfo || []);
                setProfitInfo(response.data.profitRecords || []);
            }
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
        }
    };
    const getAmountColor = (trade) => {
        switch (true) {
            case trade.returnProfitPercentage > 1:
                return 'orangered';
            case trade.returnProfitPercentage < 1:
                return 'red';
            default:
                return 'black';
        }
    };
    const getAmountColorProfit = (trade) => {
        switch (true) {
            case trade.returnProfitPercentage > 1:
                return 'green';
            case trade.returnProfitPercentage < 1:
                return 'red';
            default:
                return 'black';
        }
    };

    return (
        <div className='readytoshrinking'>
            <h5> Portfolio</h5>
            <div className="portfoliovalue">
                <div className="values">
                    <p>Portfolio value</p>
                    <h3> ₹  {portFolio}</h3>
                </div>
            </div>

            <div className="keyfinancials">
                <h6>Key financials</h6>
                <div className="total">
                    <div className="monthlyincome">
                        <div className="coins">

                            <i class="fa-solid fa-coins"></i>
                            <p>Montly income</p>
                        </div>
                        <div className="amountdate">
                            <h5>₹ <i className="fa-solid fa-lock"></i></h5>
                            <p>Nov2023</p>
                        </div>
                    </div>
                    <div className="totalincome">
                        <div className="coins">
                            <i class="fa-solid fa-money-bill"></i>
                            <p>Total income</p>
                        </div>
                        <div className="amountdate">
                            <h5>₹ <i className="fa-solid fa-lock"></i></h5>
                            <p>As of nov 2023</p>
                        </div>
                    </div>
                    <div className="capitalappreciation">
                        <div className="coins">
                            <i class="fa-solid fa-chart-line"></i>
                            <p>Appreciation</p>
                        </div>
                        <div className="amountdate">
                            <h5>₹ <i className="fa-solid fa-lock"></i></h5>
                            <p>As of nov 2023</p>
                        </div>
                    </div>
                </div>



            </div>
            <div className="keyfinancials">
                <h6>Quick insights</h6>
                <div className="total">
                    <div className="monthlyincome">
                        <div className="coins">

                            <i class="fa-solid fa-coins"></i>
                            <p>Number of trades</p>
                        </div>
                        <div className="amountdate percentage">
                            <h5>{portFolioCount}</h5>

                        </div>
                    </div>
                    <div className="totalincome">
                        <div className="coins">
                            <i class="fa-solid fa-money-bill"></i>
                            <p>Portfolio occupancy</p>
                        </div>
                        <div className="amountdate percentage">
                            <h5> <i className="fa-solid fa-lock"></i>%</h5>

                        </div>
                    </div>
                    <div className="capitalappreciation">
                        <div className="coins">
                            <i class="fa-solid fa-chart-line"></i>
                            <p>Annualised trade yield</p>
                        </div>
                        <div className="amountdate percentage">
                            <h5> <i className="fa-solid fa-lock"></i>%</h5>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mystakes">
                <h6>My Profits</h6>
                <div className="transactiontable portfolios">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="table-heading">Trade</th>
                                <th className="table-heading">Total trade profit</th>
                                <th className="table-heading">Purchased quantity</th>
                                <th className="table-heading">Total investment</th>
                                <th className="table-heading">Date</th>
                                <th className="table-heading">returns</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profitInfo.slice(0, 4).map((trade, index) => (
                                <tr key={index}>
                                    <td>{trade.trade}</td>
                                    <td
                                        style={{
                                            color: getAmountColorProfit(trade),
                                        }}>{trade.totalProfit}</td>
                                    <td>{trade.quantity}</td>
                                    <td>{trade.investmentAmount}</td>
                                    <td>{new Date(trade.createdAt).toLocaleDateString()}</td>
                                    <td style={{
                                        color: getAmountColor(trade),
                                    }}>{trade.returnProfitPercentage} %</td>
                                </tr>
                            ))}

                            {profitInfo.length === 0 && (
                                <tr className='tablebody'>
                                    <td colSpan="5" className="text-center">
                                        <i className="fa-regular fa-clock"></i>
                                        <h6>No investment found</h6>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <h6>My Trades</h6>
                <div className="transactiontable portfolios">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="table-heading">Trade</th>
                                <th className="table-heading">Total trade price</th>
                                <th className="table-heading">Purchased quantity</th>
                                <th className="table-heading">Total investment</th>
                                <th className="table-heading">Date of purchase</th>
                                <th className="table-heading">Expected returns</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tradeInfo.slice(0, 3).map((trade, index) => (
                                <tr key={index}>
                                    <td>{trade.productName}</td>
                                    <td>{trade.productPrice}</td>
                                    <td>{trade.quantity}</td>
                                    <td>{trade.investmentAmount}</td>
                                    <td>{new Date(trade.date).toLocaleDateString()}</td>
                                    <td>{trade.returnPercentage} %</td>
                                </tr>
                            ))}

                            {tradeInfo.length === 0 && (
                                <tr className='tablebody'>
                                    <td colSpan="5" className="text-center">
                                        <i className="fa-regular fa-clock"></i>
                                        <h6>No investment found</h6>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
export default PortfolioItems 