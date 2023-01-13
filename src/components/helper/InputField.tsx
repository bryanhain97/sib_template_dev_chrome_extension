import React, { ChangeEvent } from 'react'
import { Input } from '../GridNColumns/GridNColumns'

interface IInputField {
    state: Input
    text: string
    id: string
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const InputField: React.FC<IInputField> = ({ text, id, handleInputChange }) => {
    return (
        <div className="field">
            <label className="label" htmlFor={id}>{text}</label>
            <input type="text" className="input" id={id} onChange={handleInputChange} />
        </div>
    )
}

export default InputField
