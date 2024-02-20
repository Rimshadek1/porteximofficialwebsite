import React, { useState, useEffect, useCallback } from 'react';
import './depositpage.css';
import { postRequestAddMoney, verifyPayment } from '../../../services/Apis';
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom'
function DepositPage() {
    const [amount, setAmount] = useState('');
    const [Razorpay, isLoaded] = useRazorpay();
    const navigate = useNavigate()
    const handlePayment = useCallback(async () => {
        try {
            const data = {
                amount
            }
            const orders = await postRequestAddMoney(data);
            const order = orders.data
            if (!order) {
                console.error('Error: Order is undefined');
                return;
            }
            const options = {
                key: "rzp_test_u6AqTKt0lLlp8S",
                amount: order.amount,
                currency: order.currency,
                name: "PORTEXIM PVT LTD",
                description: "Test Transaction",
                image: "img/logoportvertical.png",
                order_id: order.id,
                handler: async (res) => {
                    const data = {
                        res, order
                    }
                    const response = await verifyPayment(data);
                    console.log(response);
                    if (response.status === 200) {
                        alert('Payment Success');
                        navigate('/wallet')
                    } else if (response.status === 400) {
                        alert('Payment failed: Invalid signature');
                    } else {
                        alert('Internal server error');
                    }


                },
                prefill: {
                    name: "Piyush Garg",
                    email: "youremail@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#ff3c00",
                },
            };

            // Create a new instance of Razorpay and open the payment dialog
            const rzpay = new Razorpay(options);
            rzpay.open();
        } catch (error) {
            console.error('Error in handlePayment:', error);
        }
    }, [Razorpay, amount]);

    useEffect(() => {
        if (isLoaded && amount) {
            handlePayment();
        }
    }, [isLoaded, handlePayment, amount]);

    return (
        <div className="deposit-container">
            <h4 className='text-center mt-5'>DEPOSIT PAGE</h4>
            <form className='text-center mt-5'>
                <label className='d-block'>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='minimum RS 1000 '
                    />
                </label>
                <button type="button" className='btn mt-5 depositreal' onClick={handlePayment}>
                    Deposit
                </button>
            </form>
        </div>
    );
}

export default DepositPage;
