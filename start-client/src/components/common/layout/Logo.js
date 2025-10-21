import PropTypes from 'prop-types'
import React from 'react'
import crane from '../../../images/picsvg_download.svg'
import { TbTool } from 'react-icons/tb'
import { BsGear } from 'react-icons/bs'


function Logo() {
  return (
    <div className={'logo-content'}>
      <img src={crane} alt='Bootcrane logo' height={100} />
      <h1>BOOTCRANE</h1>
      <small>
        The
        <span>
          <h2>
            SpringBoot
          </h2>
        </span>
        builder
      </small>
      {/*       <div> */}
      {/*         <pre style={{ margin: 0, lineHeight: 1 }}> */}
      {/* {`______ */}
      {/* (____  \\              _ */}
      {/*  ____)  ) ___   ___ _| |_ ____  ____ _____ ____  _____ */}
      {/* |  __  ( / _ \\ / _ (_   _) ___)/ ___|____ |  _ \\| ___ | */}
      {/* | |__)  ) |_| | |_| || |( (___| |   / ___ | | | | ____| */}
      {/* |______/ \\___/ \\___/  \\__)____)_|   \\_____|_| |_|_____)`} */}
      {/*         </pre> */}
      {/*       </div> */}
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
