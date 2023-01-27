import React, { ChangeEvent } from 'react'
import { Input } from '../GridNColumns/GridNColumns'

interface IInputField {
    state: Input['dist'] | Input['title']
    text: string
    id: string
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const InputField: React.FC<IInputField> = ({ text, id, handleInputChange, state }) => {
    return (
        <div className="field">
            <label className="label" htmlFor={id}>{text}</label>
            <input type="text" className="input" id={id} onChange={handleInputChange} value={state} />
        </div>
    )
}

export default InputField
