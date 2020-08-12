import React, { useEffect, useState } from 'react'
import './styles.css'
import Header from '../../components/header'
import ProductCard from '../../components/productCard'
import Cart from '../../components/cart'
import useApi from '../../hooks/useApi'

export default function Home () {
  const { request, data } = useApi()
  const [show, setShow] = useState(false)

  useEffect(() => {
    request('products')
  }, [request])

  const cartToggle = () => {
    setShow((toggle) => !toggle)
  }

  const outOfCart = (e) => {
    if (e.target === e.currentTarget) cartToggle(e)
  }

  return (
    <>
      <Header onClick={cartToggle} />
      <Cart onClick={outOfCart} show={show} />
      <div className="home">
        <h2>Produtos</h2>
        <div className="home__products">
          {data.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}
