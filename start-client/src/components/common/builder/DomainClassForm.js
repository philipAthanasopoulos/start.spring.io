import React, { useContext, useState } from 'react'
import { FieldInput } from './index'
import get from 'lodash/get'
import { InitializrContext } from '../../reducer/Initializr'
import { Button } from '../form'
import { IconRemove } from '../icons'

function DomainClassForm() {
  const {
    values,
    dispatch: dispatchInitializr,
    errors,
  } = useContext(InitializrContext)
  const update = args => {
    dispatchInitializr({ type: 'UPDATE', payload: args })
  }
  const [useLombok, setUseLombok] = useState(false)

  // Handler for changing class name
  const handleClassNameChange = (event, index) => {
    dispatchInitializr({
      type: 'UPDATE_DOMAIN_CLASS',
      payload: { index, field: 'className', value: event.target.value },
    })
  }

  // Handler for removing entity
  const handleRemoveEntity = index => {
    dispatchInitializr({ type: 'REMOVE_DOMAIN_CLASS', payload: { index } })
  }

  // Handler for changing field name
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

  // Handler for changing field type
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

  // Handler for removing field
  const handleRemoveField = (classIndex, fieldIndex) => {
    dispatchInitializr({
      type: 'REMOVE_FIELD',
      payload: { classIndex, fieldIndex },
    })
  }

  // Handler for adding field
  const handleAddField = classIndex => {
    dispatchInitializr({ type: 'ADD_FIELD', payload: { classIndex } })
  }

  // Handler for toggling REST controller
  const handleToggleRestController = (event, index) => {
    dispatchInitializr({
      type: 'TOGGLE_REST_CONTROLLER',
      payload: {
        index,
        value: event.target.checked,
      },
    })
  }

  // Handler for toggling Frontend controller
  const handleToggleFrontendController = (event, index) => {
    dispatchInitializr({
      type: 'TOGGLE_FRONTEND_CONTROLLER',
      payload: {
        index,
        value: event.target.checked,
      },
    })
  }

  // Handler for toggling Lombok
  const handleToggleLombok = event => {
    const checked = event.target.checked
    setUseLombok(checked)
    dispatchInitializr({
      type: 'TOGGLE_LOMBOK',
      payload: { useLombok: checked },
    })
  }

  // Handler for adding domain class
  const handleAddDomainClass = () => {
    dispatchInitializr({ type: 'ADD_DOMAIN_CLASS' })
  }

  return (
    <div>
      <hr />
      {get(values, 'domainClassDescriptions', []).map((description, index) => (
        <div key={`description-${index}`}>
          {index > 0 && <hr />}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FieldInput
              id={`input-domainClassName-${index}`}
              value={description.className || ''}
              text='Name'
              onChange={event => handleClassNameChange(event, index)}
            />
            <a
              href='/'
              onClick={event => {
                event.preventDefault()
                handleRemoveEntity(index)
              }}
              key={`remove-entity-${index}`}
              className='icon'
              style={{
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
              title='Remove Entity'
            >
              <span className='a-content' tabIndex='-1'>
                <IconRemove />
              </span>
            </a>
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
                  <option value='java.lang.String'>string</option>
                  <option value='java.lang.Long'>long</option>
                  <option value='java.lang.int'>int</option>
                  <option value='java.lang.double'>double</option>
                  <option value='java.lang.boolean'>boolean</option>
                  <option value='java.util.Date'>date</option>
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
                    color: 'red',
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
                  <i className={'bi bi-plus-circle'}></i>
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
                Generate REST Controller
              </label>
            </div>
            <div>
              <input
                type='checkbox'
                id={`generateFrontendController-${index}`}
                className={'input-checkbox'}
                checked={!!description.generateFrontendController}
                onChange={event => handleToggleFrontendController(event, index)}
              />
              <label htmlFor={`generateFrontendController-${index}`}>
                Generate Frontend Controller
              </label>
            </div>
          </div>
        </div>
      ))}
      {/* Single Use Lombok checkbox at the end */}
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
      {/* Add domain class button */}
      <div
        style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          id={'add-domain-class'}
          variant={'primary'}
          onClick={handleAddDomainClass}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className={'bi bi-plus-circle'}
              style={{ paddingRight: '10px' }}
            />
            New Entity
          </span>
        </Button>
      </div>
    </div>
  )
}

export default DomainClassForm
