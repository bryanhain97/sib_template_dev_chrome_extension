import './_GridNColumns.sass'
import React, {
    useContext,
    useRef,
    useState,
    ChangeEvent,
    useEffect
} from 'react'
import { TemplatesContext } from '../Templates/Templates'
import InputField from '../helper/Field'
import PaddingField from '../helper/PaddingField'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// import YAML from 'yaml'

interface Padding {
    pL: string
    pR: string
}
export interface Input {
    title: string
    dist: string
    paddings: Padding[]
}

const initialPaddings: Padding[] = [{ pL: '0', pR: '0' }]

const GridNColumns = () => {
    const templates = useContext(TemplatesContext)
    const objectRef = useRef('')
    const [columns, setColumns] = useState(1)
    const [input, setInput] = useState<Input>({ title: '', dist: '', paddings: initialPaddings })

    useEffect(() => {
        const newColumns = Array.from(input.dist).filter((char) => char === '-').length + 1
        if (newColumns === columns) {
            return
        }
        if (newColumns > columns) {
            setInput({ ...input, paddings: [...input.paddings, { pL: '0', pR: '0' }] })
        }
        if (newColumns < columns) {
            setInput({ ...input, paddings: input.paddings.filter((_, i) => i < newColumns) })
        }
        setColumns(newColumns)
    }, [input.dist])
    return (
        <div className="template gridNColumns">
            <div className="container image-container">
                <img className="image" src={templates[0].imgSrc} alt="no alt" />
            </div>
            <div className="container info-container">
                <h3>{templates[0].description}</h3>
                <div className="container input-container">
                    <InputField state={input} handleChange={handleInputChange}
                        id='title'
                        text='title'
                    />
                    <InputField state={input} handleChange={handleInputChange}
                        id='dist'
                        text='dist'
                    />
                    {new Array(columns).fill(0).map((_, idx) => {
                        return (<PaddingField key={idx} index={idx} handlePaddings={handlePaddings} />)
                    })}
                </div>
                <div className="buttons">
                    <button className="button apply">apply</button>
                    <button onClick={() => console.log(input)}>log</button>
                    <CopyToClipboard text={objectRef.current}>
                        <button className="button">Copy to Clipboard</button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    )

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    function handlePaddings(e: ChangeEvent<HTMLInputElement>, idx: number, side: 'left' | 'right') {
        const nextPadding = { ...input.paddings[idx] }
        if (side === 'left') {
            nextPadding.pL = e.target.value || '0'
        }
        if (side === 'right') {
            nextPadding.pR = e.target.value || '0'
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
}

export default GridNColumns
