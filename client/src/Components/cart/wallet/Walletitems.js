import React, { useState, useEffect } from 'react';
import './Walletitem.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userTransaction } from '../../../services/Apis'
import { useWallet } from './walletContext/WalletContext';
function Walletitems() {
    const [isHovered, setIsHovered] = useState(false);
    const [transaction, setTransaction] = useState(false);
    const { balance, setBalance } = useWallet();

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await userTransaction();
            if (response.status === 200) {
                setTransaction(response.data.transactions)
                setBalance(response.data.balance)
            }

        } catch (error) {
            toast.error('An error occurred while fetching requests');
        }
    }
    const getAmountColor = (trans) => {
        switch (trans.status || trans.request) {
            case 'placed':
                return 'green';
            case 'pending':
                return 'yellow';
            case 'rejected':
                return 'red';
            case 'accepted':
                return 'blue';
            case "done":
                return 'orangered';
            default:
                return 'black';
        }
    };
    const getFontSize = (trans) => {
        switch (trans.status || trans.request) {
            case 'done':
                return '1.2em'; // Example font size for 'done' status
            default:
                return '1em'; // Default font size
        }
    };


    const getDecor = (trans) => {
        switch (trans.status || trans.request) {
            case 'placed':
            case 'pending':
            case 'accepted':
                return 'none';
            case 'rejected':
                return 'line-through';
            default:
                return 'none';
        }
    }


    return (
        <div className='readytoshrinks'>
            <h5 className='h5wallet'>Wallet</h5>
            <div className="cashreward">
                <div className="cash">
                    <div className='cashfull'>
                        <p>Cash balance</p>
                        <h3>₹{balance} </h3>
                        <div className='button-container'>
                            <Link to='/deposit' className='depbutton' >Deposit</Link>
                            <Link to='/withdraw' className='withbutton'>Withdraw</Link>
                        </div>
                    </div>
                </div>

                <div className="reward">
                    <div className='cashfull'>
                        <p>Reward balance</p>
                        <h3><i className="fa-solid fa-lock"></i> </h3>
                    </div>
                    <div className='text-primary star'>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
            </div>
            <div className="transaction">
                <h6>Transactions</h6>
                <div className="transactiontable move">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="table-heading">Type</th>
                                <th className="table-heading">Status</th>
                                <th className="table-heading">Date</th>
                                <th className="table-heading">Time</th>
                                <th className="table-heading">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction.length > 0 ? (
                                transaction
                                    .slice(-6)
                                    .reverse()
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((trans, index) => (
                                        <tr key={index}>
                                            <td>{trans.type}</td>
                                            <td>{trans.status || trans.request}</td>
                                            <td>{new Date(trans.date).toLocaleDateString()}</td>
                                            <td>{new Date(trans.date).toLocaleTimeString()}</td>
                                            <td style={{
                                                color: getAmountColor(trans),
                                                textDecoration: getDecor(trans),
                                                fontSize: getFontSize(trans),
                                                fontWeight: trans.status === 'done' ? 'bold' : 'normal',
                                            }}>{trans.amount || trans.totalPrice}</td>
                                        </tr>
                                    ))
                            ) : (
                                <tr className='tablebody'>
                                    <td colSpan="5" className="text-center">
                                        <i className="fa-regular fa-clock"></i>
                                        <h6>No transactions yet</h6>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>



                </div>

            </div>

            <div className="cardsandbanks">
                <div className="cardss">
                    <h6>Cards</h6>
                    <div className="divcard">
                        <span><i class="fa-regular fa-credit-card"></i>Add a card to enjoy instant deposits
                            from anywhere in the world</span>
                        <button
                            className={isHovered ? 'hovered' : ''}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? (
                                <i className="fa-solid fa-lock"></i>
                            ) : (
                                <>
                                    <i className="fa-solid fa-plus"></i>
                                    <p>Add new card</p>
                                </>
                            )}
                        </button>

                    </div>
                </div>
                <div className="banks">
                    <h6>Banks</h6>
                    <div className="divcard">
                        <span><i class="fa-solid fa-building-columns"></i>Add a bank account to deposit from anywhere in the world</span>
                        <button
                            className={isHovered ? 'hovered' : ''}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? (
                                <i className="fa-solid fa-lock"></i>
                            ) : (
                                <>
                                    <i className="fa-solid fa-plus"></i>
                                    <p>Add new bank</p>
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    );
}

export default Walletitems;
