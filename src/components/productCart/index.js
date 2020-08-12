import React from 'react'
import './styles.css'
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md'
import Button from '../button'
import PropTypes from 'prop-types'
import { useCart } from '../../hooks/useCart'

export default function ProductCart ({ item }) {
  const { addItems, removeItems } = useCart()
  return (
    <div className="productCart">
      <div className="productCart__image">
        <img src={item.picture} alt="imagem" />
      </div>
      <div className="productCart__infos">
        <p>{item.name}</p>
        <div className="productCart__count">
          <Button type="button" className="button__count">
            <MdRemoveCircleOutline
              size={20}
              color="var(--primary-color)"
              onClick={() => removeItems(item.id)}
            />
          </Button>
          <input type="text" value={item.quantity} readOnly />
          <Button
            type="button"
            className="button__count"
            onClick={() => addItems(item.id)}
          >
            <MdAddCircleOutline size={20} color="var(--primary-color)" />
          </Button>
        </div>
        <span>
          R$ {item.price.to.integers},{item.price.to.decimals}
        </span>
      </div>
    </div>
  )
}

ProductCart.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired
}
