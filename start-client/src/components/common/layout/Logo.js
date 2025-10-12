import PropTypes from 'prop-types'
import React from 'react'
import crane from '../../../images/picsvg_download.svg'

function Logo() {
  return (
    <div className={'logo-content'}>
      <img src={crane} alt='Bootcrane logo' height={100} />
      <h1>BOOTCRANE</h1>
    </div>
  )
}

Logo.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  className: PropTypes.string,
}

Logo.defaultProps = {
  className: '',
}

export default Logo
