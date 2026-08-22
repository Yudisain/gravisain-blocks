import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { 
		showNameField, showPhoneField, showSubjectField, 
		submitButtonText, buttonAlign, buttonColor, buttonTextColor, fieldStyle, anchor 
	} = attributes;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: `gravisain-advanced-form style-${fieldStyle} align-btn-${buttonAlign}`,
		style: {
			'--af-btn-bg': buttonColor,
			'--af-btn-color': buttonTextColor,
		}
	} );

	return (
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />

			<div { ...blockProps }>
				<form className="gravisain-form-preview" onSubmit={ ( e ) => e.preventDefault() }>
					
					{ showNameField && (
						<div className="gravisain-form-group">
							<label>{ __( 'Name', 'gravisain-blocks' ) } *</label>
							<input type="text" placeholder={ __( 'Your Name', 'gravisain-blocks' ) } readOnly />
						</div>
					) }
					
					<div className="gravisain-form-group">
						<label>{ __( 'Email', 'gravisain-blocks' ) } *</label>
						<input type="email" placeholder={ __( 'Your Email', 'gravisain-blocks' ) } readOnly />
					</div>

					{ showPhoneField && (
						<div className="gravisain-form-group">
							<label>{ __( 'Phone', 'gravisain-blocks' ) }</label>
							<input type="tel" placeholder={ __( 'Your Phone Number', 'gravisain-blocks' ) } readOnly />
						</div>
					) }

					{ showSubjectField && (
						<div className="gravisain-form-group">
							<label>{ __( 'Subject', 'gravisain-blocks' ) }</label>
							<input type="text" placeholder={ __( 'Subject', 'gravisain-blocks' ) } readOnly />
						</div>
					) }

					<div className="gravisain-form-group">
						<label>{ __( 'Message', 'gravisain-blocks' ) } *</label>
						<textarea placeholder={ __( 'Your Message...', 'gravisain-blocks' ) } rows="5" readOnly></textarea>
					</div>

					<div className="gravisain-form-submit-wrap">
						<button type="button" className="gravisain-form-submit-btn">
							{ submitButtonText }
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
