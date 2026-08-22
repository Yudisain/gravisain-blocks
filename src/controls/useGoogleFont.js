import { useEffect } from '@wordpress/element';

export default function useGoogleFont(fontFamily) {
	useEffect(() => {
		if (!fontFamily) return;
		
		// Wait a tick to ensure iframe is fully initialized if just mounted
		const timeoutId = setTimeout(() => {
			// Gutenberg uses an iframe named "editor-canvas" for the block editor in recent WP versions
			const iframe = document.querySelector('iframe[name="editor-canvas"]');
			const doc = iframe ? iframe.contentDocument : document;
			
			if (!doc || !doc.head) return;

			const fontId = `gravisain-google-font-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`;
			
			// If already loaded in this document, skip
			if (doc.getElementById(fontId)) return;
			
			const link = doc.createElement('link');
			link.id = fontId;
			link.rel = 'stylesheet';
			link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
			
			doc.head.appendChild(link);
		}, 100);

		return () => clearTimeout(timeoutId);
	}, [fontFamily]);
}
