import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 2.5"/><path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#4f46e5"/></svg>
	),
	edit: Edit,
	save,
} );
