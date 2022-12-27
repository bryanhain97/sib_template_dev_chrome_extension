import React from 'react'
import GridNColumns from './GridNColumns'
import './Templates.sass'
import dataJSON from '../../data.json'

const { templates } = dataJSON
const Templates = () => {
    return (
        <div className="templates">
            <GridNColumns
                imgSrc={templates[0].imgSrc}
                description={templates[0].description}
                clipboardText={templates[0].clipboardText}
            />
        </div>
    )
}

export default Templates
