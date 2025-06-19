import React, { useContext, useEffect, useState } from 'react'
import { FieldInput } from './index'
import get from 'lodash/get'
import { InitializrContext } from '../../reducer/Initializr'
import { Button } from '../form'

function DomainClassForm() {
  const {
    values,
    dispatch: dispatchInitializr,
    errors,
  } = useContext(InitializrContext)
  const update = args => {
    dispatchInitializr({ type: 'UPDATE', payload: args })
  }

  return (
    <div>
      {get(values, 'domainClassDescriptions', []).map((description, index) => (
        <div key={`description-${index}`}>
          <FieldInput
            id={`input-domainClassName-${index}`}
            value={description.className || ''}
            text='Class Name'
            onChange={event => {
              const updatedDescriptions = [
                ...get(values, 'domainClassDescriptions', []),
              ]
              updatedDescriptions[index].className = event.target.value
              update({ domainClassDescriptions: updatedDescriptions })
            }}
          />
          <div style={{ paddingLeft: '30px' }}>
            <h3>Fields</h3>
            {description.fields.map((field, fieldIndex) => (
              <div
                key={fieldIndex}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <FieldInput
                  id={`input-fieldName-${fieldIndex}`}
                  value={field.fieldName || ''}
                  text='Field Name'
                  onChange={event => {
                    const updatedDescriptions = [
                      ...get(values, 'domainClassDescriptions', []),
                    ]
                    updatedDescriptions[index].fields[fieldIndex].fieldName =
                      event.target.value
                    update({ domainClassDescriptions: updatedDescriptions })
                  }}
                />
                <select
                  name={`fieldType-${fieldIndex}`}
                  style={{ marginLeft: '10px' }}
                  onChange={event => {
                    const updatedDescriptions = [
                      ...get(values, 'domainClassDescriptions', []),
                    ]
                    updatedDescriptions[index].fields[fieldIndex].classType =
                      event.target.value
                    update({ domainClassDescriptions: updatedDescriptions })
                  }}
                >
                  <option selected></option>
                  <option value='java.lang.String'>string</option>
                  <option value='java.lang.Long'>long</option>
                  <option value='java.lang.int'>int</option>
                  <option value='java.lang.double'>double</option>
                  <option value='java.lang.boolean'>boolean</option>
                  <option value='java.lang.Date'>date</option>
                </select>
              </div>
            ))}
            <Button
              id={`add-field-${index}`}
              variant='primary'
              onClick={event => {
                const updatedDescriptions = [
                  ...get(values, 'domainClassDescriptions', []),
                ]
                updatedDescriptions[index].fields.push({
                  fieldName: '',
                  classType: '',
                })
                update({ domainClassDescriptions: updatedDescriptions })
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className={'bi bi-node-plus'}
                  style={{ paddingRight: '10px' }}
                />
                Add Field
              </span>
            </Button>
          </div>
        </div>
      ))}
      <Button
        id={'add-domain-class'}
        variant={'primary'}
        onClick={event => {
          const updatedDescriptions = [
            ...get(values, 'domainClassDescriptions', []),
            {
              className: '',
              fields: [],
            },
          ]
          update({ domainClassDescriptions: updatedDescriptions })
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <i className={'bi bi-plus-circle'} style={{ paddingRight: '10px' }} />
          Add Class
        </span>
      </Button>
    </div>
  )
}

export default DomainClassForm
