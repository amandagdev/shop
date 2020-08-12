import React from 'react'
import './styles.css'
import Button from '../button'
import PropTypes from 'prop-types'
import { useCart } from '../../hooks/useCart'

export default function Card ({ item }) {
  const { addCart } = useCart()
  return (
    <>
      <div className="productCard">
        <div className="productCard__image">
          {item.tag && (
            <div className="productCard__image__exclusivity">
              <p>{item.tag.label}</p>
            </div>
          )}
          <img src={item.picture} alt="imagem" />
          {item.offer && (
            <div className="productCard__image__promotion">
              {item.offer.label} <span>-{item.offer.value}%</span>
            </div>
          )}
        </div>
        <div className="productCard__description">
          <p>{item.name}</p>
        </div>
        <div className="productCard__button">
          <Button
            type="button"
            className="button__primary"
            onClick={() => addCart(item)}
          >
            Adicionar ao carrinho
          </Button>
        </div>
        {item.price.from ? (
          <div className="productCard__price--promotion">
            <span className="price__promotion">
              R$ {item.price.to.integers},{item.price.to.decimals}
              <span className="product__price--once"> {item.unit}</span>
            </span>
            <span>
              R$ {item.price.from.integers},{item.price.from.decimals}{' '}
            </span>
            {item.installments && (
              <span>
                <strong>{item.installments.amount}x</strong> de{' '}
                <strong>R$ {item.installments.value}</strong> s/juros
              </span>
            )}
          </div>
        ) : (
          <div className="productCard__price">
            <span>
              R$ {item.price.to.integers},{item.price.to.decimals}{' '}
              <span className="product__price--once">{item.unit}</span>
            </span>
            {item.installments && (
              <span>
                {item.installments.amount}x de R$ {item.installments.value}{' '}
                s/juros
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )
}

Card.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired
}
