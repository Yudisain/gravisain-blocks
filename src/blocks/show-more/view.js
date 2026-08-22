document.addEventListener( 'DOMContentLoaded', function() {
	const showMoreBlocks = document.querySelectorAll( '.gravisain-show-more' );

	showMoreBlocks.forEach( ( block ) => {
		const button = block.querySelector( '.gravisain-sm-button' );
		const inner = block.querySelector( '.gravisain-sm-inner' );
		const content = block.querySelector( '.gravisain-sm-content' );
		
		if ( ! button || ! inner || ! content ) return;

		const showMoreText = block.getAttribute( 'data-show-more' );
		const showLessText = block.getAttribute( 'data-show-less' );

		// Check if content is actually taller than preview height
		// If it's smaller, we don't need the button
		const previewHeight = parseInt( getComputedStyle( block ).getPropertyValue( '--sm-preview-height' ) );
		
		// Delay check slightly to ensure fonts/images are loaded (optional, but good practice)
		setTimeout( () => {
			if ( content.scrollHeight <= previewHeight ) {
				block.classList.add( 'is-fully-visible' );
			}
		}, 100 );

		button.addEventListener( 'click', function() {
			const isExpanded = button.getAttribute( 'aria-expanded' ) === 'true';

			if ( isExpanded ) {
				// Collapse
				block.classList.remove( 'is-expanded' );
				button.setAttribute( 'aria-expanded', 'false' );
				button.textContent = showMoreText;
			} else {
				// Expand
				block.classList.add( 'is-expanded' );
				
				if ( showLessText ) {
					button.setAttribute( 'aria-expanded', 'true' );
					button.textContent = showLessText;
				} else {
					// If no show less text, hide the button permanently
					block.classList.add( 'is-fully-expanded-no-toggle' );
				}
			}
		} );
	} );
} );
