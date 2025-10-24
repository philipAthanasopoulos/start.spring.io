import React, { useContext, useState } from 'react'
import { InitializrContext } from '../../reducer/Initializr'
import get from 'lodash/get'

// eslint-disable-next-line react/prop-types
function BoxOptions({ options }) {
  const { values, dispatch: dispatchInitializr } = useContext(InitializrContext)
  const [selected, setSelected] = useState(get(values, 'database'))

  return (
    <div className='box-options'>
      {options.map((option, index) => (
        <button
          className={`box-option ${selected === option.key ? 'selected' : ''}`}
          id={index}
          onClick={event => {
            event.preventDefault()
            dispatchInitializr({
              type: 'SELECT_DATABASE',
              payload: { database: option.key },
            })
            setSelected(option.key)
          }}
        >
          {option.text}
          {option.icon}
        </button>
      ))}
    </div>
  )
}

export default BoxOptions
