import React from 'react';
import Template, { ITemplate } from './Template';
import './Templates.sass';
import clipboardText from '../../data.json';

const Templates = () => {
    // create template context and have createYAML fn here
    return (
        <div className="templates">
            {clipboardText.templates.map(({ imgSrc, description, clipboardText }: ITemplate, i) => {
                return (
                    <Template
                        key={i}
                        imgSrc={imgSrc}
                        description={description}
                        clipboardText={clipboardText}
                    />
                )
            })}
        </div>
    )
}

export default Templates;