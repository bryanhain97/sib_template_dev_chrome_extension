import React, { useState, useCallback, ChangeEvent, useRef, MouseEvent, useEffect } from 'react';
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
    paddings: string[]
}
const DEFAULT_INPUT: Input = { title: '', dist: '', paddings: [] }





const Template = ({
    imgSrc,
    description,
    clipboardText: DEFAULT_OBJECT
}: ITemplate
) => {
    const objectRef = useRef(DEFAULT_OBJECT);
    const [input, setInput] = useState<Input>({ ...DEFAULT_INPUT });
    const [columns, setColumns] = useState<number>(0);
    const [applied, setApplied] = useState<Boolean>(false);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setApplied(false);
        setInput({ ...input, [e.target.id]: e.target.value } as Input)
    }, [input]);

    const resetInput = () => {
        setInput({ ...DEFAULT_INPUT });
        setApplied(false);
    }
    useEffect(() => {
        const columnAmount = Array.from(input.dist).filter((x) => x === "-").length + 1;
        setColumns(columnAmount);
    }, [input.dist]);

    const createYAMLObject = (e: MouseEvent<HTMLButtonElement>) => {
        objectRef.current = DEFAULT_OBJECT;
        if (columns > 1) {
            const currentObject = objectRef.current[0];
            [currentObject.title, currentObject.dist] = [input.title, input.dist];
            for (let i = 0; i < columns; i++) {
                const left = 2 * i;
                const right = 2 * i + 1;
                currentObject.content[i].layout.default['padding-left'] = `${input.paddings[left]}px`
                currentObject.content[i].layout.default['padding-right'] = `${input.paddings[right]}px`
            }
        }
        objectRef.current = YAML.stringify(objectRef.current)
        setApplied(true);
    };
    const handleChangePaddings = (e: ChangeEvent<HTMLInputElement>, key: number) => {
        const prevPaddings = input.paddings;
        prevPaddings[key] = e.target.value;
        setInput({ ...input, paddings: [...prevPaddings] })
    }
    return (
        <div className="template">
            <img className="image" src={imgSrc} alt="copy to clipboard" />
            <div className="options">
                <h4 className="description">{description}</h4>
                <div className="field">
                    <label className="label" htmlFor="title">title</label>
                    <input type="text" onChange={handleChange} id="title" value={input.title} />
                </div>
                <div className="field">
                    <label className="label" htmlFor="title">dist</label>
                    <input type="text" onChange={handleChange} id="dist" value={input.dist} />
                </div>
                {columns > 1 &&
                    <div className="padding-fields">
                        {new Array(columns).fill(0).map((x, i) => {
                            const left = 2 * i;
                            const right = 2 * i + 1;
                            return (
                                <div className="padding-field" key={i}>
                                    <div className="left">
                                        <label className="label" htmlFor={`padding-left${i}`}>pL-{i}:</label>
                                        <input className="input" id={`padding-left${i}`} onChange={(e) => handleChangePaddings(e, left)} />
                                    </div>
                                    <div className="right">
                                        <label className="label" htmlFor={`padding-right${i}`}>pR-{i}:</label>
                                        <input className="input" id={`padding-right${i}`} onChange={(e) => handleChangePaddings(e, right)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                <div className="buttons">
                    <button onClick={resetInput} className="btn">reset</button>
                    <button className="btn" onClick={createYAMLObject}>create YAML</button>
                    <CopyToClipboard text={objectRef.current}>
                        <button className={applied ? 'btn btn-copy' : 'btn btn-copy disabled'}>copy</button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    )
}


export default Template;