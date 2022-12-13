import React from 'react';
import './Headline.sass'

const Headline = ({
    title,
    description
}: {
    title: string,
    description: string
}) => {
    return (
        <div className="headline">
            <h1 className="title">{title}</h1>
            <span className="description">{description}</span>
        </div >
    )
}

export default Headline;