import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Route from './routes'
import CartProvider from './hooks/index'

const App = () => (
  <>
    <BrowserRouter>
      <CartProvider>
        <Route />
      </CartProvider>
    </BrowserRouter>
  </>
)

export default App
