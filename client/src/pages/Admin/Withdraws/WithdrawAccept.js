import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { acceptWithdrawal, deleteWithdrawal, getWithdrwalRequest } from '../../../services/Apis';
function WithdrawAccept() {
    const [withdraw, setWithdraw] = useState()
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getWithdrwalRequest();
            if (response.status === 200) {
                const withdrawArray = Array.isArray(response.data?.data)
                    ? response.data.data
                    : [response.data?.data];
                setWithdraw(withdrawArray);
            } else {
                toast.error('Request failed');
            }
        } catch (error) {
            console.error('Error fetching withdrawal requests:', error);
            toast.error('An error occurred while fetching withdrawal requests');
        }
    };

    const handleAccept = async (trade) => {
        try {
            const data = {
                trade
            };
            const response = await acceptWithdrawal(data);

            if (response.status === 200) {
                toast.success('Withdrawal request processed successfully!');
                fetchData(); // Fetch withdrawal requests again after successful acceptance
            } else {
                toast.error('Acceptance failed');
            }
        } catch (error) {
            console.error('Error accepting withdrawal request:', error);
            toast.error('An error occurred while accepting withdrawal request');
        }
    };
    const handleDelete = async (trade) => {
        try {
            const data = {
                trade
            };
            const response = await deleteWithdrawal(data);

            if (response.status === 200) {
                toast.success('Withdrawal deleted successfully!');
                fetchData(); // Fetch withdrawal requests again after successful acceptance
            } else {
                toast.error('Acceptance failed');
            }
        } catch (error) {
            console.error('Error accepting withdrawal request:', error);
            toast.error('An error occurred while accepting withdrawal request');
        }
    };

    return (
        <div>
            <section>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <Link to="/addtrade" className="btn btn-primary ml-auto">
                                Add trade
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/admindash" className="btn btn-info ml-auto">
                                Admin dashboard
                            </Link>
                        </div>
                    </div>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Username</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Request</th>
                                <th scope="col">A/c Number</th>
                                <th scope="col">IFSC Code</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(withdraw) && withdraw.length > 0 ? (
                                withdraw.map((trade, index) => (
                                    <tr key={trade._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{trade.username}</td>
                                        <td>{trade.amount}</td>
                                        <td>{trade.request}</td>
                                        <td>{trade.bankAccountNumber}</td>
                                        <td>{trade.ifscCode}</td>

                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleAccept(trade)}>
                                                Accept
                                            </button>
                                            &nbsp;&nbsp;
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(trade)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No Wiithdrawal request available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <button className='btn btn-danger'>Logout</button>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default WithdrawAccept 