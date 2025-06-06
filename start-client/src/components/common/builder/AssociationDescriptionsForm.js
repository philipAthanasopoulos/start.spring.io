import React, { useContext, useEffect, useState } from 'react'
import { FieldInput } from './index'
import get from 'lodash/get'
import { InitializrContext } from '../../reducer/Initializr'
import { Button } from '../form'

function AssociationDescriptionsForm() {
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
      {get(values, 'associationDescriptions', []).map((association, index) => (
        <div key={`association-${index}`}>
          <div>
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <FieldInput
                id={`input-fieldName-${index}`}
                value={association.firstClassName || ''}
                text=''
                onChange={event => {
                  const updatedDescriptions = [
                    ...get(values, 'associationDescriptions', []),
                  ]
                  updatedDescriptions[index].firstClassName = event.target.value
                  update({ associationDescriptions: updatedDescriptions })
                }}
              />
              <select
                name={`fieldType-${index}`}
                style={{ marginLeft: '10px' }}
                onChange={event => {
                  const updatedDescriptions = [
                    ...get(values, 'associationDescriptions', []),
                  ]
                  updatedDescriptions[index].assotiationType =
                    event.target.value
                  update({ associationDescriptions: updatedDescriptions })
                }}
              >
                <option selected></option>
                <option value='ONE_TO_ONE'>One to One</option>
                <option value='ONE_TO_MANY'>One to Many</option>
                <option value='MANY_TO_ONE'>Many to One</option>
                <option value='MANY_TO_MANY'>Many to One</option>
              </select>
              <FieldInput
                id={`input-fieldName-${index}`}
                value={association.secondClassName || ''}
                text=''
                onChange={event => {
                  const updatedDescriptions = [
                    ...get(values, 'associationDescriptions', []),
                  ]
                  updatedDescriptions[index].secondClassName =
                    event.target.value
                  update({ associationDescriptions: updatedDescriptions })
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        id={'add-association'}
        variant={'primary'}
        onClick={event => {
          const updatedDescriptions = [
            ...get(values, 'associationDescriptions', []),
            {
              firstClassName: '',
              associationType: '',
              secondClassName: '',
            },
          ]
          update({ associationDescriptions: updatedDescriptions })
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <i className={'bi bi-plus-circle'} style={{ paddingRight: '10px' }} />
          <i className={'bi bi-arrows'} style={{ paddingRight: '10px' }} />
          Add association
        </span>
      </Button>
    </div>
  )
}

export default AssociationDescriptionsForm
