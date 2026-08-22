/**
 * Modal Frontend Script
 * Handles opening, closing, ESC key, and backdrop click for popups.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const modals = document.querySelectorAll( '.gravisain-modal' );
	if ( ! modals.length ) return;

	modals.forEach( ( block ) => {
		const triggerBtn = block.querySelector( '.gravisain-modal-trigger-btn' );
		const triggerLink = block.querySelector( '.gravisain-modal-trigger-link' );
		const overlay = block.querySelector( '.gravisain-modal-overlay' );
		const closeBtn = block.querySelector( '.gravisain-modal-close-btn' );

		if ( ! overlay ) return;

		const openModal = ( e ) => {
			if ( e ) e.preventDefault();
			overlay.style.display = 'flex';
			overlay.setAttribute( 'aria-hidden', 'false' );
			document.body.style.overflow = 'hidden';
		};

		const closeModal = () => {
			overlay.style.display = 'none';
			overlay.setAttribute( 'aria-hidden', 'true' );
			document.body.style.overflow = '';
		};

		if ( triggerBtn ) triggerBtn.addEventListener( 'click', openModal );
		if ( triggerLink ) triggerLink.addEventListener( 'click', openModal );
		if ( closeBtn ) closeBtn.addEventListener( 'click', closeModal );

		overlay.addEventListener( 'click', ( e ) => {
			if ( e.target === overlay ) {
				closeModal();
			}
		} );

		document.addEventListener( 'keydown', ( e ) => {
			if ( e.key === 'Escape' && overlay.style.display === 'flex' ) {
				closeModal();
			}
		} );
	} );
} );
