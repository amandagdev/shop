import React from 'react'
import './styles.css'
import Cart from '../../images/cart.svg'
import Button from '../button'
import PropTypes from 'prop-types'
import { useCart } from '../../hooks/useCart'

const Header = ({ onClick }) => {
  const { products } = useCart()

  const qtyProducts = products.reduce((cont, current) => {
    const total = cont + current.quantity
    return total
  }, 0)
  return (
    <div className="header">
      <div>
        <h1>SHOP</h1>
      </div>
      <div className="header__cart">
        <Button type="button" className="button__transparent" onClick={onClick}>
          <img src={Cart} alt="Carrinho" />
        </Button>
        {products.length > 0 && (
          <div className="header__cart--items">
            <span>{qtyProducts}</span>
          </div>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  onClick: PropTypes.func
}

export default Header
