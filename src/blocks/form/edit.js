import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		formTitle,
		showName,
		showEmail,
		showSubject,
		showMessage,
		submitButtonText,
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

	const blockProps = useBlockProps( {
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
	} );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div className="gravisain-form-inner">
					<RichText
						tagName="h3"
						className="gravisain-form-title"
						value={ formTitle }
						onChange={ ( val ) => setAttributes( { formTitle: val } ) }
						placeholder={ __( 'Form Title...', 'gravisain-blocks' ) }
					/>

					<div className="gravisain-form-fields">
						{ showName && (
							<div className="gravisain-form-group">
								<label>{ __( 'Your Name', 'gravisain-blocks' ) } *</label>
								<input type="text" placeholder={ __( 'John Doe', 'gravisain-blocks' ) } disabled />
							</div>
						) }

						{ showEmail && (
							<div className="gravisain-form-group">
								<label>{ __( 'Your Email Address', 'gravisain-blocks' ) } *</label>
								<input type="email" placeholder={ __( 'john@example.com', 'gravisain-blocks' ) } disabled />
							</div>
						) }

						{ showSubject && (
							<div className="gravisain-form-group">
								<label>{ __( 'Subject', 'gravisain-blocks' ) }</label>
								<input type="text" placeholder={ __( 'How can we help you?', 'gravisain-blocks' ) } disabled />
							</div>
						) }

						{ showMessage && (
							<div className="gravisain-form-group">
								<label>{ __( 'Message', 'gravisain-blocks' ) } *</label>
								<textarea rows={ 4 } placeholder={ __( 'Type your message here...', 'gravisain-blocks' ) } disabled />
							</div>
						) }

						<div className="gravisain-form-actions">
							<button type="button" className="gravisain-form-submit">
								<RichText
									tagName="span"
									value={ submitButtonText }
									onChange={ ( val ) => setAttributes( { submitButtonText: val } ) }
									placeholder={ __( 'Send Message...', 'gravisain-blocks' ) }
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
