import React from 'react'
import { HashRouter } from 'react-router-dom'
import Route from './routes'
import CartProvider from './hooks/index'

const App = () => (
  <>
    <HashRouter>
      <CartProvider>
        <Route />
      </CartProvider>
    </HashRouter>
  </>
)

export default App
