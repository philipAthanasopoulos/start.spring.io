import React from 'react'
import { BsGithub, BsLinkedin, BsTwitterX } from 'react-icons/bs'

function Media() {
  const size = 24
  return (
    <div className='media-container'>
      <a href='https://github.com/philipAthanasopoulos/initializr'>
        <BsGithub size={size} />
      </a>
      <a
        href='https://twitter.com/intent/tweet?text=Check%20out%20this%20page!&url=https%3A%2F%2Fbootcrane.dev'
        target='_blank'
        rel='noopener noreferrer'
      >
        <BsTwitterX size={size} />
      </a>
      <a
        href='https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fbootcrane.dev'
        target='_blank'
        rel='noopener noreferrer'
      >
        <BsLinkedin size={size} />
      </a>
    </div>
  )
}

export default Media
