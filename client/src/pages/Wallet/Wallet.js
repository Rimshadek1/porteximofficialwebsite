import React from 'react'
import Walletcart from '../../Components/CartSide/Walletcart'
import Walletitems from '../../Components/cart/wallet/Walletitems'
import WalletCartUp from '../../Components/CartUp/WalletCartUp'

function Wallet() {
    return (
        <div>
            <Walletcart />
            <WalletCartUp />
            <Walletitems />
        </div>
    )
}

export default Wallet