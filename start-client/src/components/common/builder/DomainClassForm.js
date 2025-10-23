import React, { useContext, useState } from 'react'
import { Control, FieldInput } from './index'
import get from 'lodash/get'
import { InitializrContext } from '../../reducer/Initializr'
import { Button } from '../form'
import options from './typeOptions.json'
import { GrClose } from 'react-icons/gr'
import { BiPlus } from 'react-icons/bi'
import { FaShapes } from 'react-icons/fa6'

function DomainClassForm() {
  const {
    values,
    dispatch: dispatchInitializr,
    errors,
  } = useContext(InitializrContext)
  const update = args => {
    dispatchInitializr({ type: 'UPDATE', payload: args })
  }
  const [useLombok, setUseLombok] = useState(
    () => get(values, 'domainClassDescriptions', [])[0]?.useLombok ?? false
  )

  const handleClassNameChange = (event, index) => {
    dispatchInitializr({
      type: 'UPDATE_DOMAIN_CLASS',
      payload: { index, field: 'className', value: event.target.value },
    })
  }

  const handleRemoveEntity = index => {
    dispatchInitializr({ type: 'REMOVE_DOMAIN_CLASS', payload: { index } })
  }

  const handleFieldNameChange = (event, classIndex, fieldIndex) => {
    dispatchInitializr({
      type: 'UPDATE_FIELD',
      payload: {
        classIndex,
        fieldIndex,
        field: 'fieldName',
        value: event.target.value,
      },
    })
  }

  const handleFieldTypeChange = (event, classIndex, fieldIndex) => {
    dispatchInitializr({
      type: 'UPDATE_FIELD',
      payload: {
        classIndex,
        fieldIndex,
        field: 'classType',
        value: event.target.value,
      },
    })
  }

  const handleRemoveField = (classIndex, fieldIndex) => {
    dispatchInitializr({
      type: 'REMOVE_FIELD',
      payload: { classIndex, fieldIndex },
    })
  }

  const handleAddField = classIndex => {
    dispatchInitializr({ type: 'ADD_FIELD', payload: { classIndex } })
  }

  const handleToggleRestController = (event, index) => {
    dispatchInitializr({
      type: 'TOGGLE_REST_CONTROLLER',
      payload: {
        index,
        value: event.target.checked,
      },
    })
  }

  const handleToggleFrontendController = (event, index) => {
    dispatchInitializr({
      type: 'TOGGLE_FRONTEND_CONTROLLER',
      payload: {
        index,
        value: event.target.checked,
      },
    })
  }

  const handleToggleLombok = event => {
    const { checked } = event.target
    setUseLombok(checked)
    dispatchInitializr({
      type: 'TOGGLE_LOMBOK',
      payload: { useLombok: checked },
    })
  }

  const handleAddDomainClass = () => {
    dispatchInitializr({ type: 'ADD_DOMAIN_CLASS' })
  }

  return (
    <Control text='Entities' icon={<FaShapes />}>
      <div>
        {get(values, 'domainClassDescriptions', []).map(
          (description, index) => (
            <div
              key={`description-${index}`}
              style={{
                border: 'solid 1px white',
                borderLeft: `solid 20px #33ff66`,
                padding: '10px',
                margin: '20px',
                borderRadius: '10px',
                overflow: 'hidden',
                transition:
                  'max-height 300ms ease, padding 200ms ease, margin 200ms ease',
                maxHeight: `${
                  200 +
                  (description.fields ? description.fields.length * 56 : 0)
                }px`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                }}
              >
                <FieldInput
                  id={`input-domainClassName-${index}`}
                  value={description.className || ''}
                  text='Name'
                  placeholder={'e.g User'}
                  onChange={event => handleClassNameChange(event, index)}
                />
                <Button
                  onClick={() => handleRemoveEntity(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  title='Remove Entity'
                  aria-label='Remove Entity'
                >
                  <GrClose />
                </Button>
              </div>
              <div>
                {description.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    <FieldInput
                      id={`input-fieldName-${fieldIndex}`}
                      value={field.fieldName || ''}
                      text='Field Name'
                      placeholder={'e.g firstName'}
                      onChange={event =>
                        handleFieldNameChange(event, index, fieldIndex)
                      }
                    />
                    <select
                      name={`fieldType-${fieldIndex}`}
                      value={field.classType || ''}
                      onChange={event =>
                        handleFieldTypeChange(event, index, fieldIndex)
                      }
                    >
                      {options.map(group => (
                        <optgroup key={group.type} label={group.type}>
                          {group.values.map(value => (
                            <option key={value.value} value={value.value}>
                              {value.label}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <a
                      href='/'
                      onClick={event => {
                        event.preventDefault()
                        handleRemoveField(index, fieldIndex)
                      }}
                      key={`remove-field-${index}-${fieldIndex}`}
                      style={{
                        padding: '2px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                      title='Remove Field'
                    >
                      <span>
                        <i className='bi bi-trash' />
                      </span>
                    </a>
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '16px',
                  }}
                >
                  <Button
                    id={`add-field-${index}`}
                    variant='primary'
                    onClick={() => handleAddField(index)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <BiPlus />
                    </span>
                  </Button>
                </div>
                <div>
                  <input
                    type='checkbox'
                    id={`generateRestController-${index}`}
                    className={'input-checkbox'}
                    checked={!!description.generateRestController}
                    onChange={event => handleToggleRestController(event, index)}
                  />
                  <label htmlFor={`generateRestController-${index}`}>
                    REST Controller
                  </label>
                </div>
                <div>
                  <input
                    type='checkbox'
                    id={`generateFrontendController-${index}`}
                    className={'input-checkbox'}
                    checked={!!description.generateFrontendController}
                    onChange={event =>
                      handleToggleFrontendController(event, index)
                    }
                  />
                  <label htmlFor={`generateFrontendController-${index}`}>
                    Web Controller
                  </label>
                </div>
              </div>
            </div>
          )
        )}
        {get(values, 'domainClassDescriptions', []).length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <input
              type='checkbox'
              id='use-lombok-checkbox'
              className='input-checkbox'
              checked={useLombok}
              onChange={handleToggleLombok}
            />
            <label htmlFor='use-lombok-checkbox'>Use Lombok</label>
          </div>
        )}

        <Button id={'add-domain-class'} onClick={handleAddDomainClass}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className={'bi bi-plus-circle'}
              style={{ paddingRight: '10px' }}
            />
            New Entity
          </span>
        </Button>
      </div>
    </Control>
  )
}

export default DomainClassForm
