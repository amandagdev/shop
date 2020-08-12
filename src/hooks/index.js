import React from 'react'
import PropTypes from 'prop-types'

import { CartProvider } from './useCart'

export default function AppProvider ({ children }) {
  return <CartProvider>{children}</CartProvider>
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired
}
