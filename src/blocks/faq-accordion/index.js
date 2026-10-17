import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import deprecated from './deprecated.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3" width="20" height="5.5" rx="1.5" fill="#4f46e5"/><rect x="2" y="10" width="20" height="5" rx="1.5" fill="#4f46e5" fillOpacity="0.2" stroke="#4f46e5" strokeWidth="1.5"/><rect x="2" y="16.5" width="20" height="5" rx="1.5" fill="#4f46e5" fillOpacity="0.2" stroke="#4f46e5" strokeWidth="1.5"/><path d="M17 5.5l1.5 1.5 1.5-1.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );

