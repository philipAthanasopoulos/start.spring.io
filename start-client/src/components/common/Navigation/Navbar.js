import React from 'react'
import { Link, useLocation } from 'react-router'
import { Header, Logo } from '../layout'
import { TbCirclesRelation, TbTool } from 'react-icons/tb'
import { BsDiagram2Fill, BsHammer } from 'react-icons/bs'
import { IoMdHammer } from 'react-icons/io'
import { FaDatabase, FaShapes } from 'react-icons/fa6'
import { LuLibraryBig } from 'react-icons/lu'

function Navbar() {
  const location = useLocation()
  return (
    <div className='navbar'>
      <div className='logo'>
        <Logo />
        <h1>Bootcrane</h1>
      </div>
      <ul>
        <Link to='/' className={location.pathname === '/' ? 'selected' : ''}>
          <IoMdHammer /> Project
        </Link>
        <Link
          to='/database'
          className={location.pathname === '/database' ? 'selected' : ''}
        >
          <FaDatabase /> Database
        </Link>
        <Link
          to='/entities'
          className={location.pathname === '/entities' ? 'selected' : ''}
        >
          <FaShapes /> Entities
        </Link>
        <Link
          to='/relationships'
          className={location.pathname === '/relationships' ? 'selected' : ''}
        >
          <TbCirclesRelation /> Relationships
        </Link>
        <Link
          to='/diagram'
          className={location.pathname === '/diagram' ? 'selected' : ''}
        >
          <BsDiagram2Fill /> Diagram
        </Link>
        <Link
          to='/dependencies'
          className={location.pathname === '/dependencies' ? 'selected' : ''}
        >
          <LuLibraryBig /> Dependencies
        </Link>
      </ul>
      <div></div>
      <div></div>
    </div>
  )
}

export default Navbar
