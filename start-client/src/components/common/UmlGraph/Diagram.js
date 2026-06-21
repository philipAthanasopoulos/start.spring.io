import React, { useContext, useEffect, useState } from 'react'
import get from 'lodash/get'
import { zlibSync } from 'fflate'
import { InitializrContext } from '../../reducer/Initializr'
import { AppContext } from '../../reducer/App'

export default function Diagram() {
  const { values } = useContext(InitializrContext)
  const { theme } = useContext(AppContext)
  const [svgUrl, setSvgUrl] = useState(null)

  const isDark = theme === 'dark'

  // Colors from _variables.scss
  const colors = {
    primary: '#33ff66',
    background: isDark ? '#0d2f2b' : '#fff',
    text: isDark ? '#fff' : '#000',
    border: isDark ? '#4a5053' : '#dce8e8',
  }

  const classNames = get(values, 'domainClassDescriptions', []).map(d => ({
    name: d.className,
    fields: d.fields || [],
  }))

  const associations = get(values, 'associationDescriptions', [])
    .map(a => {
      if (!a || !a.firstClassName || !a.secondClassName || !a.assotiationType)
        return null
      let arrow = '->'
      let label = ''
      if (a.assotiationType === 'ONE_TO_ONE') {
        arrow = '--'
        label = '1 -- 1'
      } else if (a.assotiationType === 'ONE_TO_MANY') {
        arrow = '->'
        label = '1*'
      } else if (a.assotiationType === 'MANY_TO_ONE') {
        arrow = '<-'
        label = '*1'
      } else if (a.assotiationType === 'MANY_TO_MANY') {
        arrow = '--'
        label = '* -- *'
      } else {
        return null
      }
      const first = (a.firstClassName || 'Class').replace(/\s+/g, '_')
      const second = (a.secondClassName || 'Class').replace(/\s+/g, '_')
      return `${first} ${arrow} ${second}${label ? `: ${label}` : ''}`
    })
    .filter(Boolean)

  const d2Source =
    classNames.length > 0 || associations.length > 0
      ? [
          'direction: right',
          `vars: {
            d2-config: {
              theme-id: ${isDark ? 200 : 0}
              layout-engine: elk
              theme-overrides: {
                B1: "${colors.background}"
                B2: "${colors.background}"
                B3: "${colors.text}"
                B4: "${colors.border}"
                B5: "${colors.primary}"
                B6: "${colors.primary}"
              }
            }
          }`,
          `style: {
            fill: "${colors.background}"
            stroke: "${colors.border}"
          }`,
          ...classNames.map(({ name, fields }) => {
            const sanitizedName = (name || 'Class').replace(/\s+/g, '_')
            const fieldLines = fields.map(f => `-${f.fieldName}`).join('\n')
            return `${sanitizedName}: {
  shape: class
${fieldLines}
  style: {
    stroke: "${colors.primary}"
    fill: "${isDark ? '#1a4a44' : '#f0fff4'}"
    font-color: "${colors.text}"
  }
}`
          }),
          ...associations.map(a => `${a} { style: { stroke: "${colors.primary}"; font-color: "${colors.text}" } }`),
        ].join('\n')
      : null

  useEffect(() => {
    if (d2Source) {
      const data = new TextEncoder().encode(d2Source)
      const compressed = zlibSync(data, { level: 9 })
      const base64 = btoa(String.fromCharCode.apply(null, compressed))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
      setSvgUrl(`https://kroki.io/d2/svg/${base64}`)
    } else {
      setSvgUrl(null)
    }
  }, [d2Source])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        // maxHeight: 'calc(100vh - 200px)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {svgUrl ? (
        <img
          src={svgUrl}
          alt='UML Diagram'
          style={{
            maxWidth: '50%',
            maxHeight: '50%',
            objectFit: 'contain',
          }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentNode.innerHTML = '<em>Failed to render diagram</em>'
          }}
        />
      ) : (
        <em>No classes to display</em>
      )}
    </div>
  )
}
