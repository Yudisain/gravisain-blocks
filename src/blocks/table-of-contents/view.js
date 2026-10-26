/**
 * Table of Contents Frontend Script
 * Auto-generates anchors and builds interactive navigation list.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const tocBlocks = document.querySelectorAll( '.gravisain-table-of-contents' );
	if ( ! tocBlocks.length ) return;

	// Find the main content area where headings reside
	const contentArea = document.querySelector( '.entry-content, .post-content, article, main' || document.body );
	if ( ! contentArea ) return;

	const allHeadings = contentArea.querySelectorAll( 'h1, h2, h3, h4, h5, h6' );
	if ( ! allHeadings.length ) return;

	const slugify = ( text ) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace( /[\s\W-]+/g, '-' )
			.replace( /^-+|-+$/g, '' );
	};

	tocBlocks.forEach( ( toc ) => {
		const contentContainer = toc.querySelector( '.gravisain-toc-content' );
		const toggleBtn = toc.querySelector( '.gravisain-toc-toggle' );
		if ( ! contentContainer ) return;

		let allowed = [ false, true, true, true, false, false ];
		try {
			const attrAllowed = JSON.parse( toc.getAttribute( 'data-allowed' ) );
			if ( Array.isArray( attrAllowed ) ) allowed = attrAllowed;
		} catch ( e ) {}

		const listStyle = toc.getAttribute( 'data-list-style' ) === 'ol' ? 'ol' : 'ul';
		const smooth = toc.getAttribute( 'data-smooth' ) !== 'false';

		const listElement = document.createElement( listStyle );
		listElement.className = 'gravisain-toc-list';

		let count = 0;

		allHeadings.forEach( ( heading, index ) => {
			// Ignore headings inside TOC block itself
			if ( toc.contains( heading ) ) return;

			const level = parseInt( heading.tagName.substring( 1 ), 10 );
			if ( ! allowed[ level - 1 ] ) return;

			count++;
			let id = heading.getAttribute( 'id' );
			if ( ! id ) {
				id = slugify( heading.textContent ) || `toc-heading-${ index }`;
				heading.setAttribute( 'id', id );
			}

			const li = document.createElement( 'li' );
			li.className = `gravisain-toc-item level-${ level }`;

			const link = document.createElement( 'a' );
			link.href = `#${ id }`;
			link.textContent = heading.textContent;

			if ( smooth ) {
				link.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					const targetEl = document.getElementById( id );
					if ( targetEl ) {
						targetEl.scrollIntoView( { behavior: 'smooth' } );
						window.history.pushState( null, null, `#${ id }` );
					}
				} );
			}

			li.appendChild( link );
			listElement.appendChild( li );
		} );

		if ( count === 0 ) {
			toc.style.display = 'none';
			return;
		}

		contentContainer.appendChild( listElement );

		// Toggle collapsible behavior
		if ( toggleBtn ) {
			toggleBtn.addEventListener( 'click', () => {
				const isCollapsed = toc.classList.contains( 'is-collapsed' );
				if ( isCollapsed ) {
					toc.classList.remove( 'is-collapsed' );
					toggleBtn.setAttribute( 'aria-expanded', 'true' );
				} else {
					toc.classList.add( 'is-collapsed' );
					toggleBtn.setAttribute( 'aria-expanded', 'false' );
				}
			} );
		}
	} );
} );
