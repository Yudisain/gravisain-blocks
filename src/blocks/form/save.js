import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		formTitle,
		showName,
		showEmail,
		showSubject,
		showMessage,
		submitButtonText,
		recipientEmail,
		successMessage,
		inputBackgroundColor,
		inputBorderColor,
		inputTextColor,
		inputBorderRadius,
		inputPadding,
		buttonColor,
		buttonTextColor,
		buttonBorderRadius,
		buttonFullWidth,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-form-block',
			buttonFullWidth ? 'has-full-btn' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-form-input-bg': inputBackgroundColor || '#ffffff',
			'--gravisain-form-input-border': inputBorderColor || '#cbd5e1',
			'--gravisain-form-input-color': inputTextColor || '#1e293b',
			'--gravisain-form-input-radius': `${ inputBorderRadius }px`,
			'--gravisain-form-input-padding': `${ inputPadding }px`,
			'--gravisain-form-btn-bg': buttonColor || '#007cba',
			'--gravisain-form-btn-color': buttonTextColor || '#ffffff',
			'--gravisain-form-btn-radius': `${ buttonBorderRadius }px`,
			...parseCustomCSS( customCSS ),
		},
		'data-recipient': recipientEmail || '',
		'data-success': successMessage || '',
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-form-inner">
				{ ! RichText.isEmpty( formTitle ) && (
					<RichText.Content tagName="h3" className="gravisain-form-title" value={ formTitle } />
				) }

				<form className="gravisain-contact-form" onSubmit={ ( e ) => e.preventDefault() }>
					{ showName && (
						<div className="gravisain-form-group">
							<label htmlFor="g-name">Your Name *</label>
							<input type="text" id="g-name" name="name" required />
						</div>
					) }

					{ showEmail && (
						<div className="gravisain-form-group">
							<label htmlFor="g-email">Your Email Address *</label>
							<input type="email" id="g-email" name="email" required />
						</div>
					) }

					{ showSubject && (
						<div className="gravisain-form-group">
							<label htmlFor="g-subject">Subject</label>
							<input type="text" id="g-subject" name="subject" />
						</div>
					) }

					{ showMessage && (
						<div className="gravisain-form-group">
							<label htmlFor="g-msg">Message *</label>
							<textarea id="g-msg" name="message" rows={ 4 } required />
						</div>
					) }

					<div className="gravisain-form-actions">
						<button type="submit" className="gravisain-form-submit">
							<RichText.Content tagName="span" value={ submitButtonText } />
						</button>
					</div>

					<div className="gravisain-form-alert gravisain-form-success" style={ { display: 'none' } }>
						{ successMessage }
					</div>
					<div className="gravisain-form-alert gravisain-form-error" style={ { display: 'none' } }>
						Please fill out all required fields.
					</div>
				</form>
			</div>
		</div>
	);
}
