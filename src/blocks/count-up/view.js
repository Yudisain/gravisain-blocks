/**
 * Count Up Frontend Script
 * Uses IntersectionObserver to trigger smooth number animation when visible.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const counters = document.querySelectorAll( '.gravisain-count-up' );
	if ( ! counters.length ) return;

	const observer = new IntersectionObserver( ( entries, obs ) => {
		entries.forEach( ( entry ) => {
			if ( entry.isIntersecting ) {
				const block = entry.target;
				const valueElement = block.querySelector( '.gravisain-value' );
				if ( ! valueElement ) return;

				const start = parseFloat( block.getAttribute( 'data-start' ) ) || 0;
				const end = parseFloat( block.getAttribute( 'data-end' ) ) || 0;
				const duration = ( parseFloat( block.getAttribute( 'data-duration' ) ) || 2.5 ) * 1000;
				const decimals = parseInt( block.getAttribute( 'data-decimals' ), 10 ) || 0;

				let startTime = null;

				const animate = ( timestamp ) => {
					if ( ! startTime ) startTime = timestamp;
					const progress = Math.min( ( timestamp - startTime ) / duration, 1 );
					// Ease out quad
					const easeOut = progress * ( 2 - progress );
					const current = start + ( end - start ) * easeOut;

					valueElement.textContent = current.toFixed( decimals );

					if ( progress < 1 ) {
						window.requestAnimationFrame( animate );
					} else {
						valueElement.textContent = end.toFixed( decimals );
					}
				};

				window.requestAnimationFrame( animate );
				obs.unobserve( block );
			}
		} );
	}, { threshold: 0.25 } );

	counters.forEach( ( counter ) => observer.observe( counter ) );
} );
