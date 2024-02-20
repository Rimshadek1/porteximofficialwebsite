import { createContext, useContext, useEffect, useState } from 'react';
import { userTransaction } from '../../../../services/Apis';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const response = await userTransaction();
        if (response.status === 200) {
            setBalance(response.data.balance)
        }
    }

    return (
        <WalletContext.Provider value={{ balance, setBalance }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};
