import React, { useContext } from 'react'
import { TbCirclesRelation } from 'react-icons/tb'
import { BsDiagram2Fill } from 'react-icons/bs'
import { IoMdHammer } from 'react-icons/io'
import { FaDatabase, FaShapes } from 'react-icons/fa6'
import { LuLibraryBig, LuOrigami } from 'react-icons/lu'
import { Logo } from '../layout'
import { AppContext } from '../../reducer/App'
import Media from '../layout/Media'
import { toast } from 'react-toastify'
import { VscMcp } from 'react-icons/vsc'
import { GiCargoCrane } from 'react-icons/gi'

function Navbar() {
  const { dispatch, activeTab } = useContext(AppContext)

  return (
    <div className='navbar'>
      <div className='logo'>
        <Logo />
        <h1>Bootcrane</h1>
      </div>
      <ul>
        <li
          className={activeTab === 'project' ? 'selected' : ''}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'project' })}
        >
          <LuOrigami /> Project
        </li>
        <li
          className={activeTab === 'database' ? 'selected' : ''}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'database' })}
        >
          <FaDatabase /> Database
        </li>
        <li
          className={activeTab === 'entities' ? 'selected' : ''}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'entities' })}
        >
          <FaShapes /> Entities
        </li>
        <li
          className={activeTab === 'relationships' ? 'selected' : ''}
          onClick={() =>
            dispatch({ type: 'SET_TAB', payload: 'relationships' })
          }
        >
          <TbCirclesRelation /> Relationships
        </li>
        <li
          className={activeTab === 'diagram' ? 'selected' : ''}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'diagram' })}
          // onClick={() => toast.info('Coming soon')}
        >
          <BsDiagram2Fill /> Diagram
          <span className='badge'>NEW</span>
        </li>
        <li
          className={activeTab === 'dependencies' ? 'selected' : ''}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'dependencies' })}
        >
          <LuLibraryBig /> Dependencies
        </li>
        <li
          className={activeTab === 'mcp' ? 'selected' : ''}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'mcp' })}
        >
          <VscMcp /> MCP Server
          <span className='badge'>SOON</span>
        </li>
      </ul>
      <div>
        <Media />
      </div>
    </div>
  )
}

export default Navbar
