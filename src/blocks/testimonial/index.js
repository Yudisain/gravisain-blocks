import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import deprecated from './deprecated.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 8a3 3 0 013-3v3a3 3 0 01-3 3H3M12 8a3 3 0 013-3v3a3 3 0 01-3 3h-1" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" fill="none"/><circle cx="6.5" cy="17.5" r="2.5" fill="#4f46e5"/><path d="M11.5 16h9M11.5 19h5.5" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );
