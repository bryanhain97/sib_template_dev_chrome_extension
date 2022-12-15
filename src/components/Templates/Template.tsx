import React, { ChangeEvent, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import YAML from 'yaml'
export interface ITemplate {
    imgSrc: string,
    description: string,
    clipboardText: { [key: string]: any } | any
};
type Input = {
    title: string,
    dist: string,
}

const Template = ({
    imgSrc,
    description,
    clipboardText
}: ITemplate
) => {
    const inputRef = useRef<Input>({ title: '', dist: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => inputRef.current = { ...inputRef.current, [e.target.id]: e.target.value }
    const yamlObject = YAML.stringify(clipboardText);
    return (
        <div className="template">
            <img className="image" src={imgSrc} alt="copy to clipboard" />
            <div className="options">
                <h4 className="description">{description}</h4>
                <div className="field">
                    <label className="label" htmlFor="title">title</label>
                    <input type="text" onChange={handleChange} id="title" />
                </div>
                <div className="field">
                    <label className="label" htmlFor="title">dist</label>
                    <input type="text" onChange={handleChange} id="dist" />
                </div>
                <CopyToClipboard text={yamlObject}>
                    <button className="btn">copy</button>
                </CopyToClipboard>
            </div>
        </div>
    )
}


export default Template;