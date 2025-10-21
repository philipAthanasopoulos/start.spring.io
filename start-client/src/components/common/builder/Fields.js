import PropTypes from 'prop-types'
import get from 'lodash/get'
import React, { useContext } from 'react'

import Actions from './Actions'
import Control from './Control'
import FieldError from './FieldError'
import FieldInput from './FieldInput'
import FieldRadio from './FieldRadio'
import Warnings from './Warnings'
import useWindowsUtils from '../../utils/WindowsUtils'
import { AppContext } from '../../reducer/App'
import { Button, Radio } from '../form'
import { Dependency } from '../dependency'
import { InitializrContext } from '../../reducer/Initializr'
import DomainClassForm from './DomainClassForm'
import AssociationDescriptionsForm from './AssociationDescriptionsForm'
import { FaArrowsTurnToDots, FaDatabase, FaShapes } from 'react-icons/fa6'
import oracle from '../../../../static/images/oracle.png'
import { DiPostgresql } from 'react-icons/di'
import { SiMariadb, SiMysql, SiOracle, SiPostgresql } from 'react-icons/si'
import { BsMicrosoft } from 'react-icons/bs'
import { GrMysql } from 'react-icons/gr'
import Diagram from '../UmlGraph/Diagram'

function Fields({
  onSubmit,
  onExplore,
  onShare,
  refExplore,
  refSubmit,
  refDependency,
  generating,
}) {
  const windowsUtils = useWindowsUtils()
  const { config, dispatch, dependencies } = useContext(AppContext)
  const {
    values,
    dispatch: dispatchInitializr,
    errors,
  } = useContext(InitializrContext)
  const update = args => {
    dispatchInitializr({ type: 'UPDATE', payload: args })
  }
  const chart = `
  classDiagram
    Animal : +int age
        Animal : +String gender
        Animal: +isMammal()
        Animal: +mate()
        Tiger : +String stripePattern
        Tiger : +hunt()
        Elephant : +int trunkLength
        Elephant : +sprayWater()
        Giraffe : +int neckLength
        Giraffe : +eatLeaves()
        Wolf : +bool isPackLeader
        Wolf : +howl()
        Fox : +String tailType
        Fox : +hide()
        Deer : +int antlerSize
        Deer : +runFast()
        Rabbit : +bool isWild
        Rabbit : +hop()
        Deer <-- Rabbit
  `

  return (
    <>
      <div className='colset colset-main'>
        <div className='left'>
          <Warnings />
          <div className='col-sticky'>
            <div>
              <div className='left'>
                <Control text='Project'>
                  <Radio
                    name='project'
                    selected={get(values, 'project')}
                    options={get(config, 'lists.project')}
                    onChange={value => {
                      update({ project: value })
                    }}
                  />
                </Control>
              </div>

              <div className='right'>
                <Control text='Language'>
                  <Radio
                    name='language'
                    selected={get(values, 'language')}
                    options={get(config, 'lists.language')}
                    onChange={value => {
                      update({ language: value })
                    }}
                  />
                </Control>
              </div>
            </div>
            <Control text='Spring Boot'>
              <Radio
                name='boot'
                selected={get(values, 'boot')}
                error={get(errors, 'boot.value', '')}
                options={get(config, 'lists.boot')}
                onChange={value => {
                  dispatchInitializr({
                    type: 'UPDATE',
                    payload: { boot: value },
                    config: get(dependencies, 'list'),
                  })
                  dispatch({
                    type: 'UPDATE_DEPENDENCIES',
                    payload: { boot: value },
                  })
                }}
              />
              {get(errors, 'boot') && (
                <FieldError>
                  Spring Boot {get(errors, 'boot.value')} is not supported.
                  Please select a valid version.
                </FieldError>
              )}
            </Control>
            <Control text='Project Metadata'>
              <FieldInput
                id='input-group'
                value={get(values, 'meta.group')}
                text='Group'
                onChange={event => {
                  update({ meta: { group: event.target.value } })
                }}
              />
              <FieldInput
                id='input-artifact'
                value={get(values, 'meta.artifact')}
                text='Artifact'
                onChange={event => {
                  update({ meta: { artifact: event.target.value } })
                }}
              />
              <FieldInput
                id='input-name'
                value={get(values, 'meta.name')}
                text='Name'
                onChange={event => {
                  update({ meta: { name: event.target.value } })
                }}
              />
              <FieldInput
                id='input-description'
                value={get(values, 'meta.description')}
                text='Description'
                onChange={event => {
                  update({ meta: { description: event.target.value } })
                }}
              />
              <FieldInput
                id='input-packageName'
                value={get(values, 'meta.packageName')}
                text='Package name'
                onChange={event => {
                  update({ meta: { packageName: event.target.value } })
                }}
              />

              <FieldRadio
                id='input-packaging'
                value={get(values, 'meta.packaging')}
                text='Packaging'
                options={get(config, 'lists.meta.packaging')}
                onChange={value => {
                  update({ meta: { packaging: value } })
                }}
              />
              <FieldRadio
                id='input-java'
                value={get(values, 'meta.java')}
                text='Java'
                options={get(config, 'lists.meta.java')}
                onChange={value => {
                  update({ meta: { java: value } })
                }}
              />
            </Control>
            <Control text={'Database'} icon={<FaDatabase />}>
              <hr />
              <FieldRadio
                id='input-database'
                value={get(values, 'database')}
                options={[
                  { key: '', text: 'None' },
                  {
                    key: 'postgresql',
                    text: 'PostgreSQL',
                    icon: SiPostgresql({ size: 20 }),
                  },
                  { key: 'mysql', text: 'MySQL', icon: GrMysql({ size: 20 }) },
                  {
                    key: 'mariadb',
                    text: 'MariaDB',
                    icon: SiMariadb({ size: 20 }),
                  },
                  {
                    key: 'oracle',
                    text: 'Oracle',
                    icon: SiOracle({ size: 20 }),
                  },
                  {
                    key: 'sqlserver',
                    text: 'SQL Server',
                    icon: BsMicrosoft({ size: 20 }),
                  },
                ]}
                onChange={value => {
                  dispatchInitializr({
                    type: 'SELECT_DATABASE',
                    payload: { database: value },
                  })
                }}
              />
            </Control>
            <Control text='Entities' icon={<FaShapes />}>
              <DomainClassForm />
            </Control>
            <Control text='Associations' icon={<FaArrowsTurnToDots />}>
              <AssociationDescriptionsForm />
            </Control>
          </div>
        </div>
        <div className='right'>
          <Dependency refButton={refDependency} />
        </div>
      </div>
      <Actions>
        {generating ? (
          <span className='placeholder-button placeholder-button-submit placeholder-button-special'>
            Generating...
          </span>
        ) : (
          <Button
            id='generate-project'
            variant='primary'
            onClick={onSubmit}
            hotkey={`${windowsUtils.symb} + ⏎`}
            refButton={refSubmit}
            disabled={generating}
          >
            Generate
          </Button>
        )}
        <Button
          id='explore-project'
          onClick={onExplore}
          hotkey='Ctrl + Space'
          refButton={refExplore}
        >
          Explore
        </Button>
        <Button id='share-project' onClick={onShare}>
          Share...
        </Button>
      </Actions>
    </>
  )
}

Fields.propTypes = {
  generating: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onExplore: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  refExplore: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  refSubmit: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  refDependency: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
}

export default Fields
