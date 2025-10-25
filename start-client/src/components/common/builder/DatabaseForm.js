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
            description:
              "The world's most advanced open source relational database.",
          },
          { key: 'mysql', text: 'MySQL', icon: GrMysql({ size: 30 }) },
          {
            key: 'mariadb',
            text: 'MariaDB',
            icon: SiMariadb({ size: 30 }),
            description:
              'A community-developed fork of MySQL intended to remain free and open-source.',
          },
          {
            key: 'oracle',
            text: 'Oracle',
            icon: GrOracle({ size: 30 }),
            description: "Oracle's relational database",
          },
          {
            key: 'sqlserver',
            text: 'SQL Server',
            icon: BiLogoMicrosoft({ size: 30 }),
            description: "Microsoft's relational database",
          },
        ]}
      />
    </Control>
  )
}

export default DatabaseForm
