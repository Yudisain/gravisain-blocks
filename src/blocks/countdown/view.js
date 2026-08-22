/**
 * Countdown Timer Frontend Script
 * Updates countdown numbers every second and handles expiry behavior.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const countdownBlocks = document.querySelectorAll( '.gravisain-countdown' );
	if ( ! countdownBlocks.length ) return;

	const formatNum = ( num ) => ( num < 10 ? `0${ num }` : num );

	countdownBlocks.forEach( ( block ) => {
		const targetAttr = block.getAttribute( 'data-target' );
		const tzBasis = block.getAttribute( 'data-timezone-basis' ) || 'site';
		const siteOffset = block.getAttribute( 'data-site-offset' ) || '+00:00';
		const expiryAction = block.getAttribute( 'data-expiry-action' ) || 'message';
		const itemsContainer = block.querySelector( '.gravisain-countdown-items' );
		const expiredMsg = block.querySelector( '.gravisain-countdown-expired-msg' );

		if ( ! targetAttr || ! itemsContainer ) return;

		const daysEl = block.querySelector( '[data-unit="days"] .gravisain-cd-number' );
		const hoursEl = block.querySelector( '[data-unit="hours"] .gravisain-cd-number' );
		const minsEl = block.querySelector( '[data-unit="minutes"] .gravisain-cd-number' );
		const secsEl = block.querySelector( '[data-unit="seconds"] .gravisain-cd-number' );

		const updateClock = () => {
			let target;
			if ( tzBasis === 'site' && siteOffset ) {
				target = new Date( `${ targetAttr }${ siteOffset }` ).getTime();
			} else {
				target = new Date( targetAttr ).getTime();
			}
			const now = new Date().getTime();
			const diff = target - now;

			if ( isNaN( diff ) || diff <= 0 ) {
				clearInterval( interval );
				if ( expiryAction === 'message' && expiredMsg ) {
					itemsContainer.style.display = 'none';
					expiredMsg.style.display = 'block';
				} else if ( expiryAction === 'hide' ) {
					block.style.display = 'none';
				} else {
					if ( daysEl ) daysEl.textContent = '00';
					if ( hoursEl ) hoursEl.textContent = '00';
					if ( minsEl ) minsEl.textContent = '00';
					if ( secsEl ) secsEl.textContent = '00';
				}
				return;
			}

			const days = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
			const hours = Math.floor( ( diff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
			const minutes = Math.floor( ( diff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
			const seconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 );

			if ( daysEl ) daysEl.textContent = formatNum( days );
			if ( hoursEl ) hoursEl.textContent = formatNum( hours );
			if ( minsEl ) minsEl.textContent = formatNum( minutes );
			if ( secsEl ) secsEl.textContent = formatNum( seconds );
		};

		updateClock();
		const interval = setInterval( updateClock, 1000 );
	} );
} );
