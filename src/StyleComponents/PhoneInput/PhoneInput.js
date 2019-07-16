import React, { Component } from 'react'
import { ReactInput } from 'input-format'
import { AsYouType, parsePhoneNumberCharacter } from 'libphonenumber-js/core'

/**
 * This input uses `input-format` library
 * for "smart" caret positioning.
 */
export function createInput(defaultMetadata)
{
	return class InputSmart extends Component
	{
		static defaultProps =
		{
			metadata : defaultMetadata
		}

		focus = () => this.input.focus()

		storeInput = (ref) => this.input = ref

		format = (value) =>
		{
			const { country, metadata } = this.props

			// "As you type" formatter.
			const formatter = new AsYouType(country, metadata)

			// Format the number.
			const text = formatter.input(value)

			return { text, template: formatter.getTemplate() }
		}

		render()
		{
			const { country, metadata, ...rest } = this.props

			return (
                <div style={{border: "1px solid #ccc", width: "100%"}}>
                    <ReactInput
                    style={{width: "100%", paddingLeft: 5, height: "calc(0.3rem * 6.5)", borderBottom: "1px solid rgba(0, 0, 0, 0.42)"}}
					{...rest}
					ref={this.storeInput}
					parse={parsePhoneNumberCharacter}
					format={this.format}/>
                </div>
			)
		}
	}
}

export default createInput()