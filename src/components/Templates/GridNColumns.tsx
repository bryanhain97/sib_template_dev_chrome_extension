import React, { useState, useCallback, ChangeEvent, useRef, MouseEvent, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import YAML from 'yaml'
interface ITemplate {
	imgSrc: string
	description: string
	clipboardText: Record<string, any> | any
};
interface Input {
	title: string
	dist: string
	paddings: string[]
}
const DEFAULT_INPUT: Input = { title: '', dist: '', paddings: [] }

const Template = ({
	imgSrc,
	description,
	clipboardText: DEFAULT_OBJECT
}: ITemplate
) => {
	const objectRef = useRef<any>('')
	const [input, setInput] = useState<Input>(DEFAULT_INPUT)
	const [columns, setColumns] = useState<number>(0)
	const [copied, setCopied] = useState<Boolean>(false)
	const [applied, setApplied] = useState<Boolean>(false)

	useEffect(() => {
		const columns = Array.from(input.dist).filter((x) => x === '-').length + 1
		setColumns(columns)
	}, [input.dist])

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const newInput: Input = { ...input, [e.target.id]: e.target.value }
		setApplied(false)
		setInput(newInput)
	}, [input])

	const handleChangePaddings = (e: ChangeEvent<HTMLInputElement>, key: number): void => {
		setApplied(false)
		const prevPaddings = [...input.paddings]
		prevPaddings[key] = e.target.value
		const nextPaddings = prevPaddings.slice(0, columns * 2)
		setInput({ ...input, paddings: nextPaddings })
	}
	const resetInput = (): void => {
		objectRef.current = { ...DEFAULT_OBJECT }
		setInput(DEFAULT_INPUT)
		setCopied(false)
		setApplied(false)
	}
	const onCopy = (): void => {
		setCopied(true)
	}
	function createYAMLObject(e: MouseEvent<HTMLButtonElement>): void {
		const gridRow = { ...DEFAULT_OBJECT }
		console.log(gridRow)
		gridRow.title = input.title
		gridRow.dist = input.dist
		gridRow.content.length = columns
		for (let i = 0; i < columns; i++) {
			const left = 2 * i
			const right = 2 * i + 1
			gridRow.content[i].layout.default['paddings-left'] = input.paddings[left] ? `${input.paddings[left]}px` : '0px'
			gridRow.content[i].layout.default['paddings-right'] = input.paddings[right] ? `${input.paddings[right]}px` : '0px'
		}
		objectRef.current = gridRow
		setApplied(true)
	}
	return (
		<div className="template">
			<span className={copied ? 'copy-info' : 'copy-info hidden'}>copied</span>
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
							const left = 2 * i
							const right = 2 * i + 1
							return (
								<div className="padding-field" key={i}>
									<div className="left">
										<label className="label" htmlFor={`padding-left${i}`}>pL-{i + 1}:</label>
										<input className="input" id={`padding-left${i}`} onChange={(e) => handleChangePaddings(e, left)} />
									</div>
									<div className="right">
										<label className="label" htmlFor={`padding-right${i}`}>pR-{i + 1}:</label>
										<input className="input" id={`padding-right${i}`} onChange={(e) => handleChangePaddings(e, right)} />
									</div>
								</div>
							)
						})}
					</div>
				}
				<div className="buttons">
					<button onClick={resetInput} className="btn btn-reset">reset</button>
					<button className="btn btn-create" onClick={createYAMLObject}>create YAML</button>
					<CopyToClipboard text={YAML.stringify(objectRef.current)} onCopy={onCopy}>
						<button className={applied ? 'btn btn-copy' : 'btn btn-copy disabled'}>copy</button>
					</CopyToClipboard>
				</div>
			</div>
		</div>
	)
}

export default Template
