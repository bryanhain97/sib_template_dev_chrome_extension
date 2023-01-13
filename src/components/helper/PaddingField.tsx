import React, { ChangeEvent } from 'react'

interface IPaddingField {
    handlePaddings: (e: ChangeEvent<HTMLInputElement>, idx: number, side: 'left' | 'right') => void
    index: number
}

const PaddingField: React.FC<IPaddingField> = ({ handlePaddings, index }) => {
    return (
        <div className="padding-field">
            <div className="padding-field-left">
                <label className="label" htmlFor={`padding-field-left padding-field-left-${index}`}>{`pL-${index + 1}`}</label>
                <input
                    type="text"
                    onChange={(e) => handlePaddings(e, index, 'left')}
                    id={`padding-field-left-${index}`}
                    required
                />
            </div>
            <div className="padding-field-right">
                <label className="label" htmlFor={`padding-field-left padding-field-left-${index}`}>{`pR-${index + 1}`}</label>
                <input
                    type="text"
                    onChange={(e) => handlePaddings(e, index, 'right')}
                    id={`padding-field-left-${index}`}
                    required
                />
            </div>
        </div>
    )
}

export default PaddingField