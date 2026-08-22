/**
 * Tabs Frontend Interactive Script
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const tabsBlocks = document.querySelectorAll( '.gravisain-tabs' );

	tabsBlocks.forEach( ( tabsBlock ) => {
		const navButtons = tabsBlock.querySelectorAll( '.gravisain-tabs-nav .gravisain-tab-button' );
		const tabPanes = tabsBlock.querySelectorAll( '.gravisain-tabs-content-area > .gravisain-tab-pane, .gravisain-tabs-content-area > .block-editor-inner-blocks > .block-editor-block-list__layout > .gravisain-tab-pane' );

		// Ensure initial state shows active tab pane and hides others
		let initialIndex = 0;
		navButtons.forEach( ( btn, idx ) => {
			if ( btn.classList.contains( 'is-active' ) ) {
				initialIndex = idx;
			}
		} );

		const updatePanes = ( activeIdx ) => {
			const allPanes = tabsBlock.querySelectorAll( '.gravisain-tab-pane' );
			allPanes.forEach( ( pane, idx ) => {
				if ( idx === activeIdx ) {
					pane.classList.add( 'is-active' );
					pane.style.display = 'block';
				} else {
					pane.classList.remove( 'is-active' );
					pane.style.display = 'none';
				}
			} );
		};

		updatePanes( initialIndex );

		navButtons.forEach( ( btn, index ) => {
			btn.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				
				navButtons.forEach( ( b ) => {
					b.classList.remove( 'is-active' );
					b.setAttribute( 'aria-selected', 'false' );
				} );

				btn.classList.add( 'is-active' );
				btn.setAttribute( 'aria-selected', 'true' );

				updatePanes( index );
			} );
		} );
	} );
} );
