import React, { useContext, useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import get from 'lodash/get'
import { InitializrContext } from '../../reducer/Initializr'

mermaid.initialize({ startOnLoad: false, theme: 'dark' })

export default function Diagram() {
  const { values } = useContext(InitializrContext)

  const classNames = get(values, 'domainClassDescriptions', []).map(d => ({
    name: d.className,
    fields: d.fields || [],
  }))

  const associations = get(values, 'associationDescriptions', [])
    .map(a => {
      if (!a || !a.firstClassName || !a.secondClassName || !a.assotiationType)
        return null
      let arrow = '--'
      if (a.assotiationType === 'ONE_TO_ONE') {
        arrow = '"1" -- "1"'
      } else if (a.assotiationType === 'ONE_TO_MANY') {
        arrow = '"1" --> "*"'
      } else if (a.assotiationType === 'MANY_TO_ONE') {
        arrow = '"*" <-- "1"'
      } else if (a.assotiationType === 'MANY_TO_MANY') {
        arrow = '"*" -- "*"'
      } else {
        return null
      }
      const first = (a.firstClassName || 'Class').replace(/\s+/g, '_')
      const second = (a.secondClassName || 'Class').replace(/\s+/g, '_')
      return `${first} ${arrow} ${second}`
    })
    .filter(Boolean)

  const chart =
    classNames.length > 0 || associations.length > 0
      ? [
          'classDiagram',
          ...classNames.map(({ name, fields }) => {
            const sanitizedName = (name || 'Class').replace(/\s+/g, '_')
            const fieldLines = fields.map(f => `  -${f.fieldName}`).join('\n')
            return `class ${sanitizedName} {\n${fieldLines}\n}`
          }),
          ...associations,
        ].join('\n')
      : null

  const ref = useRef(null)
  useEffect(() => {
    let cancelled = false
    mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'dark' })
    if (ref.current && chart) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (!cancelled && ref.current) {
            ref.current.innerHTML = svg
          }
        })
        .catch(() => {
          if (!cancelled && ref.current) {
            ref.current.innerHTML = '<em>Failed to render diagram</em>'
          }
        })
    } else if (ref.current) {
      ref.current.innerHTML = '<em>No classes to display</em>'
    }
    return () => {
      cancelled = true
    }
  }, [chart])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        overflow: 'auto',
        paddingBottom: '100px',
        maxWidth: '100%',
        boxSizing: 'border-box',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    />
  )
}
