import React, { useState, useCallback, ChangeEvent, useRef, MouseEvent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import YAML from 'yaml'
export interface ITemplate {
    imgSrc: string,
    description: string,
    clipboardText: { [key: string]: any } | any
};
type Input = {
    title: string,
    columns: number,
    dist: string,
}

const Template = ({
    imgSrc,
    description,
    clipboardText
}: ITemplate
) => {
    const objectRef = useRef(clipboardText);
    const [input, setInput] = useState<Input>({ title: '', columns: 0, dist: '' })
    const [applied, setApplied] = useState<Boolean>(false);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setApplied(false);
        setInput({ ...input, [e.target.id]: e.target.value } as Input)
    }, [input]);

    const createYAMLObject = (e: MouseEvent<HTMLButtonElement>) => {
        objectRef.current = clipboardText;
        [objectRef.current.title, objectRef.current.dist] = [input.title, input.dist];
        for (let i = 0; i < input.columns; i++) {
            // change padding-right for each col except last
            // loop over classNames?
        }
        objectRef.current = YAML.stringify(objectRef.current)
        setApplied(true);
    };

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
                <div className="field">
                    <label className="label" htmlFor="columns">columns</label>
                    <input type="text" onChange={handleChange} id="columns" />
                </div>
                {input.columns > 1 &&
                    <div className="padding-fields">
                        {
                            new Array(input.columns - 1).fill(0).map((x, i) => {
                                return (
                                    <div className="padding-field" key={i}>
                                        <label className="label" htmlFor={`padding-${i + 1}`}>pr col-{i + 1}</label>
                                        <input className="input" id={`padding-${i + 1}`} />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <div className="buttons">
                    <button className="btn" onClick={createYAMLObject}>create YAML</button>
                    <CopyToClipboard text={objectRef.current}>
                        <button className={applied ? 'btn btn_copy' : 'btn btn-copy disabled'}>copy</button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    )
}


export default Template;