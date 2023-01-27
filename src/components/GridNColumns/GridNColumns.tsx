import './_GridNColumns.sass'
import React, {
    useRef,
    useState,
    ChangeEvent,
    useEffect,
    MouseEvent
} from 'react'
import InputField from '../helper/InputField'
import PaddingField from '../helper/PaddingField'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import YAML from 'yaml'

interface Padding {
    pL: string
    pR: string
}
export interface Input {
    title: string
    dist: string
    paddings: Padding[]
}

const INITIAL_STATE: {
    INPUT: Input
    COLUMNS: number
    APPLIED: boolean
    COPIED: boolean
} = {
    INPUT: { title: '', dist: '', paddings: [{ pL: '', pR: '' }] },
    COLUMNS: 1,
    APPLIED: false,
    COPIED: false
}

const GridNColumns = ({ template }: any) => {
    const _thisTemplate = template
    const objectRef = useRef('')

    const [columns, setColumns] = useState<number>(INITIAL_STATE.COLUMNS)
    const [input, setInput] = useState<Input>(INITIAL_STATE.INPUT)
    const [copied, setCopied] = useState<boolean>(INITIAL_STATE.COPIED)
    const [applied, setApplied] = useState<boolean>(INITIAL_STATE.APPLIED)

    useEffect(() => {
        setApplied(false)
        setCopied(false)
        objectRef.current = ''
        const newColumns = Array.from(input.dist).filter((char) => char === '-').length + 1
        if (newColumns === columns) {
            return
        }
        if (newColumns > columns) {
            setInput({ ...input, paddings: [...input.paddings, { pL: '', pR: '' }] })
        }
        if (newColumns < columns) {
            setInput({ ...input, paddings: input.paddings.filter((_, i) => i < newColumns) })
        }
        setColumns(newColumns)
    }, [input])

    return (
        <div className="template gridNColumns">
            <div className="msg-container">
                <span className={`info-message ${applied ? 'applied' : 'not-applied'}`}>
                    applied
                </span>
                <span className={`info-message ${copied ? 'copied' : 'not-copied'}`}>
                    copied
                </span>
            </div>
            <div className="container image-container">
                <img className="image" src={_thisTemplate.imgSrc} alt="no alt" />
            </div>
            <div className="container info-container">
                <h3>{_thisTemplate.description}</h3>
                <div className="container input-container">
                    <div className="input-fields">
                        <InputField state={input.title} handleInputChange={handleInputChange}
                            id='title'
                            text='title'
                        />
                        <InputField state={input.dist} handleInputChange={handleInputChange}
                            id='dist'
                            text='dist'
                        />
                    </div>
                    <div className="padding-fields">
                        {new Array(columns).fill(0).map((_, idx) => {
                            return (<PaddingField key={idx} index={idx} handlePaddings={handlePaddings} state={input} />)
                        })}
                    </div>
                </div>
                <div className="buttons">
                    <button className="btn-reset" onClick={resetInput}>Reset</button>
                    <button className="btn-apply" onClick={applyChanges}>Apply</button>
                    <CopyToClipboard text={objectRef.current} onCopy={() => setCopied(true)}>
                        <button className={`btn-copy ${applied ? 'enabled' : 'disabled'}`}>Copy</button>
                    </CopyToClipboard>
                </div>
            </div>
        </div >
    )

    function resetInput(e: MouseEvent<HTMLButtonElement>) {
        setApplied(INITIAL_STATE.APPLIED)
        setCopied(INITIAL_STATE.COPIED)
        setColumns(INITIAL_STATE.COLUMNS)
        setInput(INITIAL_STATE.INPUT)
    }
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    function handlePaddings(e: ChangeEvent<HTMLInputElement>, idx: number, side: 'left' | 'right') {
        const nextPadding = { ...input.paddings[idx] }
        if (side === 'left') {
            nextPadding.pL = e.target.value
        }
        if (side === 'right') {
            nextPadding.pR = e.target.value
        }
        const newPaddings = [...input.paddings].map((padding: Padding, index: number) => {
            if (idx === index) {
                return nextPadding
            } else {
                return padding
            }
        })
        setInput({ ...input, paddings: newPaddings })
    }
    function applyChanges(e: MouseEvent<HTMLButtonElement>) {
        const { clipboardText } = _thisTemplate
        const _clipboardText = { ...clipboardText }
        _clipboardText.title = input.title || `Stil-${columns}`
        _clipboardText.dist = input.dist || '12'
        for (let i = 0; i < columns; i++) {
            _clipboardText.content[i].layout!.default['padding-left'] = input.paddings[i].pL || '0px'
            _clipboardText.content[i].layout!.default['padding-right'] = input.paddings[i].pR || '0px'
        }
        _clipboardText.content = _clipboardText.content!.filter((_: unknown, idx: number) => idx < columns)
        objectRef.current = YAML.stringify(_clipboardText)
        setApplied(true)
    }
}

export default GridNColumns
