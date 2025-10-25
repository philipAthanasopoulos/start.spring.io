import PropTypes from 'prop-types'
import get from 'lodash/get'
import set from 'lodash/set'
import React, { useReducer } from 'react'

import { getShareUrl, parseParams } from '../utils/ApiUtils'

export const defaultInitializrContext = {
  values: {
    project: '',
    language: '',
    database: '',
    cache: '',
    apiTemplate: '',
    boot: '',
    domainClassDescriptions: [
      {
        className: '',
        fields: [
          {
            fieldName: '',
            classType: '',
          },
        ],
        generateRestController: false,
        generateFrontendController: false,
        useLombok: false,
      },
    ],
    associationDescriptions: [],
    meta: {
      name: '',
      group: '',
      artifact: '',
      description: '',
      packaging: '',
      packageName: '',
      java: '',
    },
    dependencies: [],
  },
  share: '',
  errors: {},
  warnings: {},
  database: '',
  useLombok: '',
}

const localStorage =
  typeof window !== 'undefined'
    ? window.localStorage
    : {
        getItem: () => {},
        setItem: () => {},
      }

const getPersistedOrDefault = json => {
  const values = {
    project:
      localStorage.getItem('project') || get(json, 'defaultValues').project,
    language:
      localStorage.getItem('language') || get(json, 'defaultValues').language,
    boot: get(json, 'defaultValues').boot,
    domainClassDescriptions:
      get(json, 'defaultValues').domainClassDescriptions || [],
    associationDescriptions:
      get(json, 'defaultValues').associationDescriptions || [],
    meta: {
      name: get(json, 'defaultValues.meta').name,
      group: get(json, 'defaultValues.meta').group,
      artifact: get(json, 'defaultValues.meta').artifact,
      description: get(json, 'defaultValues.meta').description,
      packageName: get(json, 'defaultValues.meta').packageName,
      packaging:
        localStorage.getItem('packaging') ||
        get(json, 'defaultValues.meta').packaging,
      java:
        localStorage.getItem('java') || get(json, 'defaultValues.meta').java,
    },
    dependencies: localStorage.getItem('database')
      ? [
          localStorage.getItem('database'),
          'data-jpa',
          `${localStorage.getItem('database')}`,
        ]
      : [],
    database: localStorage.getItem('database'),
    useLombok: localStorage.getItem('useLombok'),
  }
  const checks = ['project', 'language', 'meta.java', 'meta.packaging']
  checks.forEach(key => {
    const item = get(json, `lists.${key}`)?.find(
      it => it.key === get(values, key)
    )
    if (!item) {
      set(values, key, get(json, `defaultValues.${key}`))
    }
  })
  return values
}

const persist = changes => {
  if (get(changes, 'project')) {
    localStorage.setItem('project', get(changes, 'project'))
  }
  if (get(changes, 'language')) {
    localStorage.setItem('language', get(changes, 'language'))
  }
  if (get(changes, 'meta.packaging')) {
    localStorage.setItem('packaging', get(changes, 'meta.packaging'))
  }
  if (get(changes, 'meta.java')) {
    localStorage.setItem('java', get(changes, 'meta.java'))
  }
  if (get(changes, 'domainClassDescriptions')) {
    localStorage.setItem(
      'domainClassDescriptions',
      get(changes, 'domainClassDescriptions')
    )
  }
  if (get(changes, 'associationDescriptions')) {
    localStorage.setItem(
      'associationDescriptions',
      get(changes, 'associationDescriptions')
    )
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case 'COMPLETE': {
      const json = get(action, 'payload')
      const values = getPersistedOrDefault(json)
      return {
        values,
        share: getShareUrl(values),
        errors: {},
        warnings: {},
      }
    }
    case 'UPDATE': {
      const changes = get(action, 'payload')
      let errors = { ...state.errors }
      let meta = { ...get(state, 'values.meta') }
      if (get(changes, 'meta')) {
        meta = { ...meta, ...get(changes, 'meta') }
      }
      if (get(changes, 'boot')) {
        const { boot, ...err } = errors
        errors = err
      }
      if (get(changes, 'meta.group') !== undefined) {
        set(
          meta,
          'packageName',
          `${get(meta, 'group')}.${get(meta, 'artifact')}`
        )
      }
      if (get(changes, 'meta.artifact') !== undefined) {
        set(
          meta,
          'packageName',
          `${get(meta, 'group')}.${get(meta, 'artifact')}`
        )
        set(meta, 'name', `${get(meta, 'artifact')}`)
      }
      persist(changes)
      const values = {
        ...get(state, 'values'),
        ...changes,
        meta,
      }
      return { ...state, values, share: getShareUrl(values), errors }
    }
    case 'LOAD': {
      const params = get(action, 'payload.params')
      const lists = get(action, 'payload.lists')
      const { values, errors, warnings } = parseParams(
        state.values,
        params,
        lists
      )
      return { ...state, values, errors, warnings, share: getShareUrl(values) }
    }
    case 'ADD_DEPENDENCY': {
      const dependency = get(action, 'payload.id')
      const values = { ...get(state, 'values') }
      values.dependencies = [...get(values, 'dependencies'), dependency]
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'REMOVE_DEPENDENCY': {
      const dependency = get(action, 'payload.id')
      const values = { ...get(state, 'values') }
      values.dependencies = [
        ...get(values, 'dependencies').filter(dep => dep !== dependency),
      ]
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'CLEAR_WARNINGS': {
      return { ...state, warnings: {} }
    }
    case 'ADD_DOMAIN_CLASS': {
      const values = { ...get(state, 'values') }
      const newDomainClass = {
        className: '',
        fields: [
          {
            fieldName: 'id',
            classType: 'java.lang.Long',
          },
        ],
        generateRestController: false,
        generateFrontendController: false,
        useLombok: get(state, 'useLombok') === 'true',
      }
      values.domainClassDescriptions = [
        ...get(values, 'domainClassDescriptions', []),
        newDomainClass,
      ]
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'REMOVE_DOMAIN_CLASS': {
      const index = get(action, 'payload.index')
      const values = { ...get(state, 'values') }
      values.domainClassDescriptions = get(
        values,
        'domainClassDescriptions',
        []
      ).filter((_, i) => i !== index)
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'UPDATE_DOMAIN_CLASS': {
      const { index, field, value } = get(action, 'payload')
      const values = { ...get(state, 'values') }
      const updatedDescriptions = [
        ...get(values, 'domainClassDescriptions', []),
      ]
      updatedDescriptions[index] = {
        ...updatedDescriptions[index],
        [field]: value,
      }
      values.domainClassDescriptions = updatedDescriptions
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'ADD_FIELD': {
      const classIndex = get(action, 'payload.classIndex')
      const values = { ...get(state, 'values') }
      const updatedDescriptions = [
        ...get(values, 'domainClassDescriptions', []),
      ]
      const newField = { fieldName: '', classType: 'java.lang.String' }
      updatedDescriptions[classIndex] = {
        ...updatedDescriptions[classIndex],
        fields: [...updatedDescriptions[classIndex].fields, newField],
      }
      values.domainClassDescriptions = updatedDescriptions
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'REMOVE_FIELD': {
      const { classIndex, fieldIndex } = get(action, 'payload')
      const values = { ...get(state, 'values') }
      const updatedDescriptions = [
        ...get(values, 'domainClassDescriptions', []),
      ]
      updatedDescriptions[classIndex] = {
        ...updatedDescriptions[classIndex],
        fields: updatedDescriptions[classIndex].fields.filter(
          (_, i) => i !== fieldIndex
        ),
      }
      values.domainClassDescriptions = updatedDescriptions
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'UPDATE_FIELD': {
      const { classIndex, fieldIndex, field, value } = get(action, 'payload')
      const values = { ...get(state, 'values') }
      const updatedDescriptions = [
        ...get(values, 'domainClassDescriptions', []),
      ]
      updatedDescriptions[classIndex] = {
        ...updatedDescriptions[classIndex],
        fields: updatedDescriptions[classIndex].fields.map((f, i) =>
          i === fieldIndex ? { ...f, [field]: value } : f
        ),
      }
      values.domainClassDescriptions = updatedDescriptions
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'TOGGLE_LOMBOK': {
      const useLombok = get(action, 'payload.useLombok')
      const values = { ...get(state, 'values') }

      // Update all domain classes
      const updatedDescriptions = get(
        values,
        'domainClassDescriptions',
        []
      ).map(desc => {
        if (useLombok) {
          return { ...desc, useLombok: true }
        }
        const { useLombok: _, ...rest } = desc
        return rest
      })

      // Update dependencies
      let updatedDependencies = Array.isArray(values.dependencies)
        ? [...values.dependencies]
        : []
      const lombokId = 'lombok' // Use the correct dependency ID format
      if (useLombok) {
        if (!updatedDependencies.includes(lombokId)) {
          updatedDependencies.push(lombokId)
        }
      } else {
        updatedDependencies = updatedDependencies.filter(
          dep => dep !== lombokId
        )
      }

      values.domainClassDescriptions = updatedDescriptions
      values.dependencies = updatedDependencies
      values.useLombok = useLombok
      localStorage.setItem('useLombok', useLombok)
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'TOGGLE_REST_CONTROLLER': {
      const { index, value } = get(action, 'payload')
      const values = { ...get(state, 'values') }

      // Update the specific domain class
      const updatedDescriptions = [
        ...get(values, 'domainClassDescriptions', []),
      ]
      updatedDescriptions[index] = {
        ...updatedDescriptions[index],
        generateRestController: value,
      }

      // Manage Spring Web dependency
      let updatedDependencies = [...get(values, 'dependencies', [])]
      const webId = 'web'

      // Check if any domain class has REST controller enabled
      const hasRestController = updatedDescriptions.some(
        desc => desc.generateRestController
      )

      if (hasRestController) {
        // Add web dependency if not already present
        if (!updatedDependencies.includes(webId)) {
          updatedDependencies.push(webId)
        }
      } else {
        // Remove web dependency if no REST controllers are enabled
        updatedDependencies = updatedDependencies.filter(dep => dep !== webId)
      }

      values.domainClassDescriptions = updatedDescriptions
      values.dependencies = updatedDependencies
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'TOGGLE_FRONTEND_CONTROLLER': {
      const { index, value } = get(action, 'payload')
      const values = { ...get(state, 'values') }

      // Update the specific domain class
      const updatedDescriptions = [
        ...get(values, 'domainClassDescriptions', []),
      ]
      updatedDescriptions[index] = {
        ...updatedDescriptions[index],
        generateFrontendController: value,
      }

      // Manage Thymeleaf dependency
      let updatedDependencies = [...get(values, 'dependencies', [])]
      const thymeleafId = 'thymeleaf'

      // Check if any domain class has Frontend controller enabled
      const hasFrontendController = updatedDescriptions.some(
        desc => desc.generateFrontendController
      )

      if (hasFrontendController) {
        // Add thymeleaf dependency if not already present
        if (!updatedDependencies.includes(thymeleafId)) {
          updatedDependencies.push(thymeleafId)
        }
      } else {
        // Remove thymeleaf dependency if no Frontend controllers are enabled
        updatedDependencies = updatedDependencies.filter(
          dep => dep !== thymeleafId
        )
      }

      values.domainClassDescriptions = updatedDescriptions
      values.dependencies = updatedDependencies
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'ADD_ASSOCIATION': {
      const values = { ...get(state, 'values') }
      const newAssociation = {
        firstClassName: '',
        secondClassName: '',
        assotiationType: '',
      }
      values.associationDescriptions = [
        ...get(values, 'associationDescriptions', []),
        newAssociation,
      ]
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'REMOVE_ASSOCIATION': {
      const index = get(action, 'payload.index')
      const values = { ...get(state, 'values') }
      values.associationDescriptions = get(
        values,
        'associationDescriptions',
        []
      ).filter((_, i) => i !== index)
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'UPDATE_ASSOCIATION': {
      const { index, field, value } = get(action, 'payload')
      const values = { ...get(state, 'values') }
      const updatedAssociations = [
        ...get(values, 'associationDescriptions', []),
      ]
      updatedAssociations[index] = {
        ...updatedAssociations[index],
        [field]: value,
      }
      values.associationDescriptions = updatedAssociations
      return { ...state, values, share: getShareUrl(values) }
    }
    case 'SELECT_DATABASE': {
      const database = get(action, 'payload.database')
      const values = { ...get(state, 'values') }

      // Define all database dependency IDs
      const databaseIds = [
        'postgresql',
        'mysql',
        'mariadb',
        'oracle',
        'db2',
        'sqlserver',
      ]
      const jpaId = 'data-jpa'

      // Remove existing database dependencies
      let updatedDependencies = get(values, 'dependencies', []).filter(
        dep => !databaseIds.includes(dep)
      )

      // Add new database dependency and JPA if a database is selected
      if (database && database !== '') {
        updatedDependencies.push(database)
        // Add JPA dependency if not already present
        if (!updatedDependencies.includes(jpaId)) {
          updatedDependencies.push(jpaId)
        }
      } else {
        // Remove JPA dependency when no database is selected
        updatedDependencies = updatedDependencies.filter(dep => dep !== jpaId)
      }

      values.database = database
      values.dependencies = updatedDependencies
      localStorage.setItem('database', database)
      return { ...state, values, share: getShareUrl(values) }
    }
    default:
      return state
  }
}

export const InitializrContext = React.createContext({
  ...defaultInitializrContext,
})

export function InitializrProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { ...defaultInitializrContext })
  return (
    <InitializrContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InitializrContext.Provider>
  )
}

InitializrProvider.defaultProps = {
  children: null,
}

InitializrProvider.propTypes = {
  children: PropTypes.node,
}
