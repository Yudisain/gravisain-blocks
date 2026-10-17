/**
 * Gravisain Marquee Frontend Script
 * Automatically duplicates track items to guarantee a seamless, infinite loop
 * while strictly maintaining the configured gap between items.
 */

function initGravisainMarquees() {
	const marquees = document.querySelectorAll( '.wp-block-gravisain-marquee, .gravisain-marquee-block' );

	marquees.forEach( ( marquee ) => {
		if ( marquee.dataset.marqueeInitialized ) {
			return;
		}

		const originalTrack = marquee.querySelector( '.gravisain-marquee-track' );
		if ( ! originalTrack ) {
			return;
		}

		// Ensure container width never exceeds window width to prevent layout blowout
		const measuredWidth = marquee.getBoundingClientRect().width || marquee.offsetWidth || window.innerWidth;
		const containerWidth = Math.min( measuredWidth, window.innerWidth );

		// If the items in the original track do not fill the container width,
		// duplicate the child items inside the track so it fills the screen with the exact gap.
		if ( containerWidth > 0 ) {
			const originalItems = Array.from( originalTrack.children );
			if ( originalItems.length > 0 ) {
				let iterations = 0;
				while ( originalTrack.scrollWidth < containerWidth && iterations < 15 ) {
					iterations++;
					originalItems.forEach( ( item ) => {
						const cloneItem = item.cloneNode( true );
						cloneItem.setAttribute( 'aria-hidden', 'true' );
						originalTrack.appendChild( cloneItem );
					} );
				}
			}
		}

		// Clone the fully populated track once for seamless infinite looping
		if ( ! marquee.querySelector( '.gravisain-marquee-clone' ) ) {
			const clone = originalTrack.cloneNode( true );
			clone.classList.add( 'gravisain-marquee-clone' );
			clone.setAttribute( 'aria-hidden', 'true' );
			marquee.appendChild( clone );

			// Force synchronized animation start timestamp on both tracks
			originalTrack.style.animation = 'none';
			clone.style.animation = 'none';
			void originalTrack.offsetWidth; // Trigger reflow
			originalTrack.style.animation = '';
			clone.style.animation = '';
		}

		marquee.dataset.marqueeInitialized = 'true';
	} );
}

// Synchronize animations when user returns to the tab to eliminate any background throttling drift
document.addEventListener( 'visibilitychange', () => {
	if ( document.visibilityState === 'visible' ) {
		const marquees = document.querySelectorAll( '.wp-block-gravisain-marquee, .gravisain-marquee-block' );
		marquees.forEach( ( marquee ) => {
			const originalTrack = marquee.querySelector( '.gravisain-marquee-track:not(.gravisain-marquee-clone)' );
			const clone = marquee.querySelector( '.gravisain-marquee-clone' );
			if ( originalTrack && clone ) {
				const anim1 = originalTrack.getAnimations ? originalTrack.getAnimations()[ 0 ] : null;
				const anim2 = clone.getAnimations ? clone.getAnimations()[ 0 ] : null;
				if ( anim1 && anim2 && typeof anim1.currentTime === 'number' ) {
					anim2.currentTime = anim1.currentTime;
				}
			}
		} );
	}
} );

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initGravisainMarquees );
} else {
	initGravisainMarquees();
}
