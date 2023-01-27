import React, { ChangeEvent } from 'react'
import { Input } from '../GridNColumns/GridNColumns'

interface IInputField {
    state: Input['dist'] | Input['title']
    text: string
    id: string
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    invalid?: boolean
}
const InputField: React.FC<IInputField> = ({ text, id, handleInputChange, state, invalid }) => {
    return (
        <div className="field">
            <label className="label" htmlFor={id}>{text}</label>
            <input type="text" className="input" id={id} onChange={handleInputChange} value={state} />
            {id === 'dist' && invalid &&
                <span className="dist_error">invalid</span>
            }
        </div>
    )
}

export default InputField
