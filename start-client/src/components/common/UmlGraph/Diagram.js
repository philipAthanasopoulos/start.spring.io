import React, { useContext, useMemo } from 'react'
import get from 'lodash/get'
import Mermaid from 'react-x-mermaid'
import { InitializrContext } from '../../reducer/Initializr'
import RenderMermaidExport from 'react-x-mermaid'

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
      if (a.assotiationType === 'ONE_TO_ONE') arrow = `"1"--"1"`
      else if (a.assotiationType === 'ONE_TO_MANY') arrow = `"1"-->"*"`
      else if (a.assotiationType === 'MANY_TO_ONE') arrow = `"*"<--"1"`
      else if (a.assotiationType === 'MANY_TO_MANY') arrow = `"*"<-->"*"`
      else return null
      return ` ${a.firstClassName} ${arrow} ${a.secondClassName}\n`
    })
    .filter(Boolean)

  const chart = useMemo(
    () =>
      classNames.length > 0 || associations.length > 0
        ? [
            'classDiagram\n',
            ...classNames.map(
              ({ name, fields }) =>
                `class ${name || 'Class'} {\n${fields
                  .map(f => ` -${f.fieldName}`)
                  .join('\n')}\n}`
            ),
            ...associations,
          ].join('\n')
        : 'classDiagram\nclass Empty',
    [classNames, associations]
  )

  return (
    <div
      style={{
        display: 'flex',
        overflow: 'auto',
        paddingBottom: '100px',
        maxWidth: '100%',
        boxSizing: 'border-box',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <RenderMermaidExport
        mermaidCode={chart}
        mermaidConfig={{ theme: 'forest' }}
      />
    </div>
  )
}
