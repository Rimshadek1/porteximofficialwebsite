import React, { useState } from 'react';
import { withdrawRequest } from '../../../services/Apis';
import { useNavigate } from 'react-router-dom';
import { useWallet } from './walletContext/WalletContext';

function WithdrawPage() {
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
    const { balance } = useWallet();
    const handlePayment = async () => {
        const isConfirmed = window.confirm(
            'Withdrawal request: It may take 2 working days for verification. Do you want to proceed?'
        );
        if (isConfirmed) {
            if (parseFloat(amount) <= parseFloat(balance)) {
                const response = await withdrawRequest({ amount });

                if (response.status === 200) {
                    alert('Withdrawal request accepted. Please wait for the transaction.');
                    navigate('/wallet');
                } else {
                    alert('Withdrawal request failed. Try again after some time.');
                }
            } else {
                alert('Insufficient funds in your account.');
            }
        }
    };


    return (
        <div className="deposit-container">
            <h4 className='text-center mt-5'>WITHDRAW PAGE</h4>
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
                    WITHDRAW
                </button>
            </form>
        </div>
    );
}

export default WithdrawPage;
