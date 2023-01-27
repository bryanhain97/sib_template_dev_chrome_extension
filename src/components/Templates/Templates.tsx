import './_Templates.sass'
import React, { createContext } from 'react'
import dataJSON from '../../data.json'
import GridNColumns from '../GridNColumns/GridNColumns'

const { templates } = dataJSON
export const TemplatesContext = createContext(templates)

const Templates = (): JSX.Element => {
    return (
        <div className="templates">
            <GridNColumns template={templates[0]} />
        </div>
    )
}

export default Templates
