/**
 * Lottie Animation Frontend Script
 * Bundles local dotlottie-player and binds triggers.
 */

import './dotlottie-player.js';

document.addEventListener( 'DOMContentLoaded', () => {
	const lottieBlocks = document.querySelectorAll( '.gravisain-lottie' );
	if ( ! lottieBlocks.length ) return;

	lottieBlocks.forEach( ( block ) => {
		const container = block.querySelector( '.gravisain-lottie-container' );
		const url = block.getAttribute( 'data-url' );
		if ( ! container || ! url ) return;

		const trigger = block.getAttribute( 'data-trigger' ) || 'autoplay';
		const loop = block.getAttribute( 'data-loop' ) === 'true';
		const speed = parseFloat( block.getAttribute( 'data-speed' ) ) || 1;

		const player = document.createElement( 'dotlottie-player' );
		player.setAttribute( 'src', url );
		player.setAttribute( 'speed', speed );
		if ( loop ) player.setAttribute( 'loop', '' );
		if ( trigger === 'autoplay' ) player.setAttribute( 'autoplay', '' );
		if ( trigger === 'hover' ) player.setAttribute( 'hover', '' );

		if ( trigger === 'click' ) {
			player.addEventListener( 'click', () => {
				if ( player.currentState === 'playing' ) {
					player.pause();
				} else {
					player.play();
				}
			} );
		}

		player.style.width = '100%';
		player.style.height = '100%';
		container.appendChild( player );

		if ( trigger === 'scroll' ) {
			const observer = new IntersectionObserver( ( entries ) => {
				entries.forEach( ( entry ) => {
					if ( entry.isIntersecting ) {
						player.play();
					} else {
						player.pause();
					}
				} );
			}, { threshold: 0.25 } );
			observer.observe( block );
		}
	} );
} );
