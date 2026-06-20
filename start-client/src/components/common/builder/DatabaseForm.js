import React, { useContext } from 'react'
import get from 'lodash/get'
import { SiMariadb, SiPostgresql, SiSqlite } from 'react-icons/si'
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
            icon: SiPostgresql({ size: 30, color: '#008bb9' }),
          },
          {
            key: 'mysql',
            text: 'MySQL',
            icon: GrMysql({ size: 30, color: '#00758F' }),
          },
          {
            key: 'mariadb',
            text: 'MariaDB',
            icon: SiMariadb({ size: 30, color: '#C0765A' }),
          },
          {
            key: 'oracle',
            text: 'Oracle',
            icon: GrOracle({ size: 30, color: '#f80000' }),
          },
          {
            key: 'sqlserver',
            text: 'SQL Server',
            icon: BiLogoMicrosoft({ size: 30, color: '#00a1f1' }),
          },
          {
            key: 'sqlite',
            text: 'SQLite',
            icon: SiSqlite({ size: 30, color: '#00a1f1' }),
          },
        ]}
      />
    </Control>
  )
}

export default DatabaseForm
