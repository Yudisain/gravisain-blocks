import { useEffect, useRef } from '@wordpress/element';

/**
 * Hook to inject dynamic CSS into the Gutenberg editor canvas.
 *
 * Gutenberg renders the block editor inside an <iframe name="editor-canvas">
 * in modern WordPress (6.x+). A plain <style> tag in the block's JSX will be
 * appended to the **parent** document – not the iframe – so it never affects
 * what is displayed on the canvas.
 *
 * This hook creates (or updates) a <style> element inside whichever document
 * the block is actually rendering in, ensuring CSS custom properties and other
 * dynamic rules are applied correctly.
 *
 * @param {string} id  A unique identifier for the style tag (e.g. block clientId).
 * @param {string} css The CSS string to inject.
 */
export default function useEditorStyle( id, css ) {
	const styleRef = useRef( null );

	useEffect( () => {
		// Resolve the correct document: prefer the editor-canvas iframe.
		const iframe = document.querySelector( 'iframe[name="editor-canvas"]' );
		const doc = ( iframe && iframe.contentDocument ) ? iframe.contentDocument : document;

		if ( ! doc || ! doc.head ) return;

		const styleId = `gravisain-block-style-${ id }`;

		// Reuse existing tag or create a new one.
		let styleEl = doc.getElementById( styleId );
		if ( ! styleEl ) {
			styleEl = doc.createElement( 'style' );
			styleEl.id = styleId;
			doc.head.appendChild( styleEl );
		}

		styleEl.textContent = css;
		styleRef.current = styleEl;

		return () => {
			// Cleanup when block is removed or component unmounts.
			if ( styleRef.current && styleRef.current.parentNode ) {
				styleRef.current.parentNode.removeChild( styleRef.current );
				styleRef.current = null;
			}
		};
	}, [ id, css ] );
}
