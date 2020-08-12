import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Context = createContext()

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    function getProducts () {
      const response = JSON.parse(window.localStorage.getItem('cart'))
      if (response) {
        setProducts(response)
      }
    }
    getProducts()
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(products))
  }, [products])

  const addItems = async (id) => {
    const productIndex = products.findIndex((item) => item.id === id)
    products[productIndex].quantity += 1
    setProducts([...products])
  }

  const addCart = async (product) => {
    const index = products.findIndex((item) => item.id === product.id)
    if (index >= 0) {
      products[index].quantity += 1
      setProducts([...products])
      return
    }
    const item = {
      ...product,
      quantity: 1
    }

    setProducts([...products, item])
  }

  const removeItems = async (id) => {
    const productIndex = products.findIndex((item) => item.id === id)
    const filteredProducts = products.filter((item) => item.id !== id)

    if (products[productIndex].quantity <= 1) {
      setProducts(filteredProducts)
      return
    }

    products[productIndex].quantity -= 1
    setProducts([...products])
  }

  return (
    <Context.Provider value={{ addCart, addItems, removeItems, products, setProducts }}>
      {children}
    </Context.Provider>
  )
}

const useCart = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useCart must be used within an CartProvider')
  }
  return context
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired
}

export { CartProvider, useCart }
