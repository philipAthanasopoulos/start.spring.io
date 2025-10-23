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
        arrow = `"1"--"1"`
      } else if (a.assotiationType === 'ONE_TO_MANY') {
        arrow = `"1"-->"*"`
      } else if (a.assotiationType === 'MANY_TO_ONE') {
        arrow = `"*"<--"1"`
      } else if (a.assotiationType === 'MANY_TO_MANY') {
        arrow = `"*"<-->"*"`
      } else {
        return null
      }
      return ` ${a.firstClassName} ${arrow} ${a.secondClassName}\n`
    })
    .filter(Boolean)

  const chart =
    classNames.length > 0 || associations.length > 0
      ? [
          'classDiagram',
          ...classNames.map(
            ({ name, fields }) =>
              `class ${name || 'Class'} {\n${fields
                .map(f => ` -${f.fieldName}`)
                .join('\n')}\n}`
          ),
          ...associations,
        ].join('\n')
      : null

  const ref = useRef(null)
  useEffect(() => {
    let cancelled = false
    if (ref.current && chart) {
      mermaid
        .render('theGraph', chart)
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
