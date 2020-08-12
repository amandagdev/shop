import React from 'react'
import './styles.css'
import PropTypes from 'prop-types'

export default function Button ({ type, onClick, children, className }) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

Button.defaultProps = {
  onClick: () => {}
}
