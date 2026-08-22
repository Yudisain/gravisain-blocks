/**
 * Form / Contact Form Frontend Script
 * Handles basic client validation and submission simulation / mailto / ajax submission.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const forms = document.querySelectorAll( '.gravisain-contact-form' );
	if ( ! forms.length ) return;

	forms.forEach( ( form ) => {
		const successBox = form.querySelector( '.gravisain-form-success' );
		const errorBox = form.querySelector( '.gravisain-form-error' );
		const submitBtn = form.querySelector( '.gravisain-form-submit' );

		form.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
			if ( errorBox ) errorBox.style.display = 'none';
			if ( successBox ) successBox.style.display = 'none';

			// Validate required inputs
			const requiredInputs = form.querySelectorAll( '[required]' );
			let isValid = true;
			requiredInputs.forEach( ( input ) => {
				if ( ! input.value || ! input.value.trim() ) {
					isValid = false;
					input.style.borderColor = '#e53e3e';
				} else {
					input.style.borderColor = '';
				}
			} );

			if ( ! isValid ) {
				if ( errorBox ) errorBox.style.display = 'block';
				return;
			}

			// Simulate processing state
			if ( submitBtn ) {
				const originalText = submitBtn.innerHTML;
				submitBtn.disabled = true;
				submitBtn.innerHTML = '<span>Sending...</span>';

				setTimeout( () => {
					submitBtn.disabled = false;
					submitBtn.innerHTML = originalText;
					if ( successBox ) successBox.style.display = 'block';
					form.reset();
				}, 1200 );
			}
		} );
	} );
} );
