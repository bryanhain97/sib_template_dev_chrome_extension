import React, { useContext, useRef, useState, ChangeEvent, useCallback, useEffect } from 'react'
import { TemplatesContext } from '../Templates/Templates'
import InputField from './Field'
import './_GridNColumns.sass'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// import YAML from 'yaml'

export interface Input {
    title: string
    dist: string
}
const GridNColumns = () => {
    const templates = useContext(TemplatesContext)
    const objectRef = useRef('')
    const [columns, setColumns] = useState(1)
    const [input, setInput] = useState<Input>({ title: '', dist: '' })

    useEffect(() => {
        const newColumns = Array.from(input.dist).filter((char) => char === '-').length + 1
        setColumns(newColumns)
    }, [input.dist])

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }, [input])

    const PaddingFields = () => {
        return (
            <div className="paddings">
                {new Array(columns).fill(0).map((x, i) => (
                    <div className="field" key={i}>
                        <div className="padding-container padding-field-left">
                            <label htmlFor={`pl-${i}`} className="label">pL-{i}</label>
                            <input type="text" className="input" id={`pl-${i}`} />
                        </div>
                        <div className="padding-container padding-field-right">
                            <label htmlFor={`pr-${i}`} className="label">pR-{i}</label>
                            <input type="text" className="input" id={`pr-${i}`} />
                        </div>
                    </div >
                ))}
            </div>
        )
    }
    return (
        <div className="template gridNColumns">
            <div className="container image-container">
                <img className="image" src={templates[0].imgSrc} alt="no alt" />
            </div>
            <div className="container info-container">
                <h3>{templates[0].description}</h3>
                <div className="container input-container">
                    <InputField state={input} handleChange={handleChange}
                        id='title'
                        text='title'
                    />
                    <InputField state={input} handleChange={handleChange}
                        id='dist'
                        text='dist'
                    />
                    <PaddingFields />
                </div>
                <div className="buttons">
                    <button className="button apply">apply</button>
                    <CopyToClipboard text={objectRef.current}>
                        <button className="button">Copy to Clipboard</button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    )
}

export default GridNColumns
