import React from 'react'
import CartSide from '../../Components/CartSide/CartSide'
import Books from '../../Components/cart/Books'
import CartUptrades from '../../Components/CartUp/CartUptrades'

function Itemtoexport() {
    return (
        <div>
            <CartSide />
            <CartUptrades />
            <Books />
        </div>
    )
}

export default Itemtoexport