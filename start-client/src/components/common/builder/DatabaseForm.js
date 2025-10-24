import React, { useContext } from 'react'
import get from 'lodash/get'
import { SiMariadb, SiPostgresql } from 'react-icons/si'
import { GrMysql, GrOracle } from 'react-icons/gr'
import { BiLogoMicrosoft } from 'react-icons/bi'
import FieldRadio from './FieldRadio'
import { InitializrContext } from '../../reducer/Initializr'
import { FaDatabase } from 'react-icons/fa6'
import { Control } from './index'
import BoxOptions from '../form/BoxOptions'

function DatabaseForm() {
  const { values, dispatch: dispatchInitializr } = useContext(InitializrContext)
  return (
    <Control text={'Database'} icon={<FaDatabase />}>
      <BoxOptions
        options={[
          { key: '', text: 'None' },
          {
            key: 'postgresql',
            text: 'PostgreSQL',
            icon: SiPostgresql({ size: 30 }),
          },
          { key: 'mysql', text: 'MySQL', icon: GrMysql({ size: 30 }) },
          {
            key: 'mariadb',
            text: 'MariaDB',
            icon: SiMariadb({ size: 30 }),
          },
          {
            key: 'oracle',
            text: 'Oracle',
            icon: GrOracle({ size: 30 }),
          },
          {
            key: 'sqlserver',
            text: 'SQL Server',
            icon: BiLogoMicrosoft({ size: 30 }),
          },
        ]}
      />
      {/* <FieldRadio */}
      {/*   id='input-database' */}
      {/*   value={get(values, 'database')} */}
      {/*   options={[ */}
      {/*     { key: '', text: 'None' }, */}
      {/*     { */}
      {/*       key: 'postgresql', */}
      {/*       text: 'PostgreSQL', */}
      {/*       icon: SiPostgresql({ size: 30 }), */}
      {/*     }, */}
      {/*     { key: 'mysql', text: 'MySQL', icon: GrMysql({ size: 30 }) }, */}
      {/*     { */}
      {/*       key: 'mariadb', */}
      {/*       text: 'MariaDB', */}
      {/*       icon: SiMariadb({ size: 30 }), */}
      {/*     }, */}
      {/*     { */}
      {/*       key: 'oracle', */}
      {/*       text: 'Oracle', */}
      {/*       icon: GrOracle({ size: 30 }), */}
      {/*     }, */}
      {/*     { */}
      {/*       key: 'sqlserver', */}
      {/*       text: 'SQL Server', */}
      {/*       icon: BiLogoMicrosoft({ size: 30 }), */}
      {/*     }, */}
      {/*   ]} */}
      {/*   onChange={value => { */}
      {/*     dispatchInitializr({ */}
      {/*       type: 'SELECT_DATABASE', */}
      {/*       payload: { database: value }, */}
      {/*     }) */}
      {/*   }} */}
      {/* /> */}
    </Control>
  )
}

export default DatabaseForm
