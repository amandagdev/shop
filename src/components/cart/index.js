import React, { useState } from 'react'
import './styles.css'
import ProductCart from '../productCart'
import Button from '../button'
import PropTypes from 'prop-types'
import { useCart } from '../../hooks/useCart'
import useApi from '../../hooks/useApi'

export default function Cart ({ show, onClick }) {
  const { products, setProducts } = useCart()
  const { request, data } = useApi()
  const [error, setError] = useState(false)
  const [buy, setBuy] = useState(false)

  const getFreight = (value) => {
    if (validationFreight(value)) {
      request(`freight/${value}`)
      setError(false)
      return
    }
    setError(true)
  }

  const validationFreight = (value) => {
    const regex = /^\d{5}-?\d{3}$/
    const validation = regex.test(value)
    return validation
  }

  const formatedNumber = (number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number)
  }

  const totalQty = (item) => {
    let value = 0
    const { to } = item.price
    const { quantity } = item
    const toFormated = to.integers.replace('.', '')
    value = +`${toFormated}.${to.decimals}`
    const valueQty = value * quantity
    return valueQty
  }

  const totalPriceItems = products.reduce((total, item) => {
    const tot = total + totalQty(item)
    return tot
  }, 0)

  const TotalPrice = data.freight
    ? formatedNumber(+data.freight + totalPriceItems)
    : formatedNumber(totalPriceItems)

  const finish = () => {
    setBuy(true)
    setProducts([])
  }
  return (
    <>
      {show ? (
        <div className="cart__container" onClick={onClick}>
          <div className="cart">
            {buy ? (
              <div className="cart__finish">
                <p>Compra realizada com sucesso!</p>
              </div>
            ) : (
              <>
                <div className="cart__block">
                  <div className="block__products">Meus Produtos</div>
                  <div className="block__freight">
                    <div className="block__freight--calc">
                      <p>Calcular Frete</p>
                      <input
                        type="text"
                        placeholder="00000-000"
                        required
                        maxLength="8"
                        onBlur={(e) => getFreight(e.target.value)}
                      />
                    </div>
                    {error && <div className="block__freight--error"><p>Insira um cep válido</p></div>}
                  </div>
                </div>
                {products.length > 0 ? (
                  <div className="cart__products">
                    {products.map((item) => {
                      return <ProductCart key={item.id} item={item} />
                    })}
                  </div>
                ) : (
                  <div className="cart__products--not">
                    <p>Carrinho vazio ):</p>
                  </div>
                )}
                <div className="block__amount">
                  <div>
                    <p>Frete:</p>
                    <span>
                      {data.freight
                        ? formatedNumber(data.freight)
                        : formatedNumber(0)}
                    </span>
                  </div>
                  <div>
                    <p>Subtotal:</p>
                    <span>{TotalPrice}</span>
                  </div>
                  <Button type="button" className="button__cart" onClick={finish}>
                    Comprar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}

Cart.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool
}
