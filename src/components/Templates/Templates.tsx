import React, { createContext } from 'react'
import dataJSON from '../../data.json'
import './_Templates.sass'
import GridNColumns from '../GridNColumns/GridNColumns'

const { templates } = dataJSON
export const TemplatesContext = createContext(templates)

const Templates = (): JSX.Element => {
    return (
        <div className="templates">
            <TemplatesContext.Provider value={templates}>
                <GridNColumns />
                {/* <GridNColumns /> */}
                {/* <GridNColumns /> */}
            </TemplatesContext.Provider>
        </div>
    )
}

export default Templates
