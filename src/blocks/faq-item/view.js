/**
 * FAQ Item Frontend Script
 * Handles the accordion toggle logic and icon switching.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const faqItems = document.querySelectorAll( '.gravisain-faq-item' );

	faqItems.forEach( item => {
		const header = item.querySelector( '.gravisain-faq-item__header' );
		const content = item.querySelector( '.gravisain-faq-item__content' );

		if ( ! header || ! content ) return;

		// Hydrate legacy items that were saved with Dashicons without SVG
		const iconElement = item.querySelector( '.gravisain-faq-item__icon' );
		if ( iconElement && ! iconElement.querySelector( 'svg' ) ) {
			if ( item.classList.contains( 'icon-plus' ) ) {
				iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line class="gravisain-faq-icon--vertical" x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
			} else if ( item.classList.contains( 'icon-arrow-down' ) ) {
				iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';
			} else {
				iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>';
			}
		}

		header.addEventListener( 'click', () => {
			const isOpen = item.classList.contains( 'is-open' );
			const parentAccordion = item.closest( '.gravisain-faq-accordion' );
			const allowMultiple = parentAccordion ? parentAccordion.getAttribute( 'data-allow-multiple' ) !== 'false' : true;

			// Close siblings if allowMultiple is false
			if ( ! allowMultiple && ! isOpen && parentAccordion ) {
				const siblingItems = parentAccordion.querySelectorAll( '.gravisain-faq-item' );
				siblingItems.forEach( otherItem => {
					if ( otherItem !== item && otherItem.classList.contains( 'is-open' ) ) {
						otherItem.classList.remove( 'is-open' );
						const otherHeader = otherItem.querySelector( '.gravisain-faq-item__header' );
						const otherContent = otherItem.querySelector( '.gravisain-faq-item__content' );
						if ( otherHeader ) otherHeader.setAttribute( 'aria-expanded', 'false' );
						if ( otherContent ) otherContent.setAttribute( 'aria-hidden', 'true' );
					}
				} );
			}

			// Toggle current item
			if ( isOpen ) {
				item.classList.remove( 'is-open' );
				header.setAttribute( 'aria-expanded', 'false' );
				content.setAttribute( 'aria-hidden', 'true' );
			} else {
				item.classList.add( 'is-open' );
				header.setAttribute( 'aria-expanded', 'true' );
				content.setAttribute( 'aria-hidden', 'false' );
			}
		} );
	} );
} );
