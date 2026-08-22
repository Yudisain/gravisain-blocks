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

		const updateIconClass = ( faqElement, isItemOpen ) => {
			const iconElement = faqElement.querySelector( '.gravisain-faq-item__icon' );
			if ( ! iconElement ) return;
			if ( faqElement.classList.contains( 'icon-plus' ) ) {
				if ( isItemOpen ) {
					iconElement.classList.remove( 'dashicons-plus' );
					iconElement.classList.add( 'dashicons-minus' );
				} else {
					iconElement.classList.remove( 'dashicons-minus' );
					iconElement.classList.add( 'dashicons-plus' );
				}
			}
		};

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
						updateIconClass( otherItem, false );
					}
				} );
			}

			// Toggle current item
			if ( isOpen ) {
				item.classList.remove( 'is-open' );
				header.setAttribute( 'aria-expanded', 'false' );
				content.setAttribute( 'aria-hidden', 'true' );
				updateIconClass( item, false );
			} else {
				item.classList.add( 'is-open' );
				header.setAttribute( 'aria-expanded', 'true' );
				content.setAttribute( 'aria-hidden', 'false' );
				updateIconClass( item, true );
			}
		} );
	} );
} );
