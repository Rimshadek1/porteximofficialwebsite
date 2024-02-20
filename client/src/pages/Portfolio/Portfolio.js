import React from 'react'
import Portfoliocart from '../../Components/CartSide/Portfoliocart'
import PortfolioItems from '../../Components/cart/portfolio/PortfolioItems'
import PortffolioCartUp from '../../Components/CartUp/PortffolioCartUp'

function Portfolio() {
    return (
        <div>
            <Portfoliocart />
            <PortffolioCartUp />
            <PortfolioItems />
        </div>
    )
}

export default Portfolio