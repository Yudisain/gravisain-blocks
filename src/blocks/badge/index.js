import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
			<rect x="2" y="6" width="20" height="12" rx="6" fill="none" stroke="#4f46e5" strokeWidth="2" />
			<circle cx="7" cy="12" r="2.5" fill="#4f46e5" />
			<line x1="12" y1="12" x2="18" y2="12" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
		</svg>
	),
	edit: Edit,
	save,
} );
