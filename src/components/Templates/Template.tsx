import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export interface ITemplate {
    imgSrc: string,
    description: string,
    clipboardText: string
};

const Template = ({
    imgSrc,
    description,
    clipboardText
}: ITemplate
) => {
    return (
        <CopyToClipboard text={clipboardText}>
            <div className="template">
                <img className="image" src={imgSrc} alt="copy to clipboard" />
                <span className="description">{description}</span>
            </div>
        </CopyToClipboard>
    )
}


export default Template;