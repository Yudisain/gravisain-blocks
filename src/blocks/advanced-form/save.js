import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { 
		formActionUrl, showNameField, showPhoneField, showSubjectField, 
		submitButtonText, buttonAlign, buttonColor, buttonTextColor, fieldStyle, anchor 
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-advanced-form style-${fieldStyle} align-btn-${buttonAlign}`,
		style: {
			'--af-btn-bg': buttonColor,
			'--af-btn-color': buttonTextColor,
		}
	} );

	return (
		<div { ...blockProps }>
			<form action={ formActionUrl } method="POST" className="gravisain-front-form">
				
				{ showNameField && (
					<div className="gravisain-form-group">
						<label htmlFor="af-name">Name *</label>
						<input type="text" id="af-name" name="af_name" placeholder="Your Name" required />
					</div>
				) }
				
				<div className="gravisain-form-group">
					<label htmlFor="af-email">Email *</label>
					<input type="email" id="af-email" name="af_email" placeholder="Your Email" required />
				</div>

				{ showPhoneField && (
					<div className="gravisain-form-group">
						<label htmlFor="af-phone">Phone</label>
						<input type="tel" id="af-phone" name="af_phone" placeholder="Your Phone Number" />
					</div>
				) }

				{ showSubjectField && (
					<div className="gravisain-form-group">
						<label htmlFor="af-subject">Subject</label>
						<input type="text" id="af-subject" name="af_subject" placeholder="Subject" />
					</div>
				) }

				<div className="gravisain-form-group">
					<label htmlFor="af-message">Message *</label>
					<textarea id="af-message" name="af_message" placeholder="Your Message..." rows="5" required></textarea>
				</div>

				<div className="gravisain-form-submit-wrap">
					<button type="submit" className="gravisain-form-submit-btn">
						{ submitButtonText }
					</button>
				</div>
			</form>
		</div>
	);
}
