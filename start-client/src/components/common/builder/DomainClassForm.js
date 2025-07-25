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
          <hr />
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
                  value={field.classType || ''}
                  onChange={event => {
                    const updatedDescriptions = [
                      ...get(values, 'domainClassDescriptions', []),
                    ]
                    updatedDescriptions[index].fields[fieldIndex].classType =
                      event.target.value
                    update({ domainClassDescriptions: updatedDescriptions })
                  }}
                >
                  <option value='java.lang.String'>string</option>
                  <option value='java.lang.Long'>long</option>
                  <option value='java.lang.int'>int</option>
                  <option value='java.lang.double'>double</option>
                  <option value='java.lang.boolean'>boolean</option>
                  <option value='java.util.Date'>date</option>
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
                  classType: 'java.lang.String',
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
            <div>
              <input
                type='checkbox'
                id={`generateRestController-${index}`}
                className={'input-checkbox'}
                checked={!!description.generateRestController}
                onChange={event => {
                  const updatedDescriptions = [
                    ...get(values, 'domainClassDescriptions', []),
                  ]
                  updatedDescriptions[index].generateRestController =
                    event.target.checked
                  update({ domainClassDescriptions: updatedDescriptions })
                  console.log(get(values, 'domainClassDescriptions', []))
                }}
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
                onChange={event => {
                  const updatedDescriptions = [
                    ...get(values, 'domainClassDescriptions', []),
                  ]
                  updatedDescriptions[index].generateFrontendController =
                    event.target.checked
                  update({ domainClassDescriptions: updatedDescriptions })
                  console.log(get(values, 'domainClassDescriptions', []))
                }}
              />
              <label htmlFor={`generateFrontendController-${index}`}>
                Generate Frontend Controller
              </label>
            </div>
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
              fields: [
                {
                  fieldName: 'id',
                  classType: 'java.lang.Long',
                },
              ],
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
      <div>
        <input
          type='checkbox'
          id={`use-lombok-checkbox`}
          className={'input-checkbox'}
          checked={get(values, 'domainClassDescriptions', []).every(
            desc => desc.useLombok
          )}
          onChange={event => {
            const updatedDescriptions = [
              ...get(values, 'domainClassDescriptions', []),
            ]
            updatedDescriptions.forEach(desc => {
              desc.useLombok = event.target.checked
            })
            update({ domainClassDescriptions: updatedDescriptions })
            console.log(get(values, 'domainClassDescriptions', []))
          }}
        />
        <label htmlFor={`use-lombok`}>Use Lombok</label>
      </div>
    </div>
  )
}

export default DomainClassForm
