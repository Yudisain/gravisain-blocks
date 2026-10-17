import { useEffect } from '@wordpress/element';

const systemFonts = [
	'inherit',
	'system-stack',
	'arial',
	'helvetica',
	'times new roman',
	'times',
	'courier new',
	'courier',
	'verdana',
	'georgia',
	'palatino',
	'garamond',
	'bookman',
	'tahoma',
	'trebuchet ms',
	'impact',
	'sans-serif',
	'serif',
	'monospace',
	'cursive',
	'system-ui'
];

export default function useGoogleFont(fontFamily) {
	useEffect(() => {
		if (!fontFamily || typeof fontFamily !== 'string') return;
		
		const cleanName = fontFamily.split(',')[0].replace(/['"]/g, '').trim();
		if (!cleanName || systemFonts.includes(cleanName.toLowerCase())) return;

		// Wait a tick to ensure iframe is fully initialized if just mounted
		const timeoutId = setTimeout(() => {
			// Gutenberg uses an iframe named "editor-canvas" for the block editor in recent WP versions
			const iframe = document.querySelector('iframe[name="editor-canvas"]');
			const doc = iframe ? iframe.contentDocument : document;
			
			if (!doc || !doc.head) return;

			const fontId = `gravisain-google-font-${cleanName.replace(/\s+/g, '-').toLowerCase()}`;
			
			// If already loaded in this document, skip
			if (doc.getElementById(fontId)) return;
			
			const link = doc.createElement('link');
			link.id = fontId;
			link.rel = 'stylesheet';
			link.href = `https://fonts.googleapis.com/css2?family=${cleanName.replace(/ /g, '+')}&display=swap`;
			
			doc.head.appendChild(link);
		}, 100);

		return () => clearTimeout(timeoutId);
	}, [fontFamily]);
}
