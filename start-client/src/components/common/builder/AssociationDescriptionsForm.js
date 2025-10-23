import React, { useContext } from 'react'
import { Control, FieldInput } from './index'
import get from 'lodash/get'
import { InitializrContext } from '../../reducer/Initializr'
import { Button } from '../form'
import { BiTrash } from 'react-icons/bi'
import { FaArrowsTurnToDots } from 'react-icons/fa6'

function AssociationDescriptionsForm() {
  const { values, dispatch: dispatchInitializr } = useContext(InitializrContext)

  const handleAssociationChange = (index, field, value) => {
    dispatchInitializr({
      type: 'UPDATE_ASSOCIATION',
      payload: { index, field, value },
    })
  }

  const handleRemoveAssociation = index => {
    dispatchInitializr({
      type: 'REMOVE_ASSOCIATION',
      payload: { index },
    })
  }

  const handleAddAssociation = () => {
    dispatchInitializr({ type: 'ADD_ASSOCIATION' })
  }

  return (
    <Control text='Associations' icon={<FaArrowsTurnToDots />}>
      <div>
        {get(values, 'associationDescriptions', []).map(
          (association, index) => (
            <div key={`association-${index}`}>
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr auto',
                    alignItems: 'center',
                    columnGap: '20px',
                    rowGap: '8px',
                    marginBottom: '10px',
                    padding: '4px 0',
                  }}
                >
                  {/* First class select */}
                  <select
                    id={`select-firstClassName-${index}`}
                    value={association.firstClassName || ''}
                    style={{
                      width: '100%',
                      minWidth: '160px',
                      padding: '8px 12px',
                    }}
                    onChange={event =>
                      handleAssociationChange(
                        index,
                        'firstClassName',
                        event.target.value
                      )
                    }
                  >
                    <option value=''>Select class</option>
                    {get(values, 'domainClassDescriptions', []).map(
                      (desc, i) => (
                        <option key={i} value={desc.className}>
                          {desc.className}
                        </option>
                      )
                    )}
                  </select>

                  {/* Association type select */}
                  <select
                    name={`fieldType-${index}`}
                    style={{
                      width: '100%',
                      minWidth: '160px',
                      padding: '8px 12px',
                    }}
                    value={association.assotiationType || ''}
                    onChange={event =>
                      handleAssociationChange(
                        index,
                        'assotiationType',
                        event.target.value
                      )
                    }
                  >
                    <option value=''>Select type</option>
                    <option value='ONE_TO_ONE'>One to One</option>
                    <option value='ONE_TO_MANY'>One to Many</option>
                    <option value='MANY_TO_ONE'>Many to One</option>
                    <option value='MANY_TO_MANY'>Many to Many</option>
                  </select>

                  {/* Second class select */}
                  <select
                    id={`select-secondClassName-${index}`}
                    value={association.secondClassName || ''}
                    style={{
                      width: '100%',
                      minWidth: '160px',
                      padding: '8px 12px',
                    }}
                    onChange={event =>
                      handleAssociationChange(
                        index,
                        'secondClassName',
                        event.target.value
                      )
                    }
                  >
                    <option value=''>Select class</option>
                    {get(values, 'domainClassDescriptions', []).map(
                      (desc, i) => (
                        <option key={i} value={desc.className}>
                          {desc.className}
                        </option>
                      )
                    )}
                  </select>

                  {/* Remove button */}
                  <Button
                    type='button'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '40px',
                      width: '40px',
                      padding: 0,
                    }}
                    onClick={() => handleRemoveAssociation(index)}
                    title='Remove Association'
                  >
                    <BiTrash style={{ fontSize: '20px' }} />
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
        <Button
          id='add-association'
          variant='primary'
          onClick={handleAddAssociation}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <i className='bi bi-plus-circle' style={{ paddingRight: '10px' }} />
            New Association
          </span>
        </Button>
      </div>
    </Control>
  )
}

export default AssociationDescriptionsForm
