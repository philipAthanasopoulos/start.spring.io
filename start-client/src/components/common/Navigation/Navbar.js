import React from 'react'
import { Link } from 'react-router'
import { Header, Logo } from '../layout'

function Navbar() {
  return (
    <div className='navbar'>
      <ul>
        <li>
          <Logo />
          <h1>Bootcrane</h1>
        </li>
        <li>
          <Link to='/'>Project</Link>
        </li>
        <li>
          <Link to={'/database'}>Database</Link>
        </li>
        <li>
          <Link to='/entities'>Entities</Link>
        </li>
        <li>
          <Link to='/relationships'>Relationships</Link>
        </li>
        <li>
          <Link to='/diagram'>Diagram</Link>
        </li>
        <li>
          <Link to='/dependencies'>Dependencies</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
