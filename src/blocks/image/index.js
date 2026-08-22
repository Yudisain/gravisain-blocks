import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3" width="20" height="18" rx="3" fill="none" stroke="#4f46e5" strokeWidth="2"/><circle cx="7.5" cy="8.5" r="2.2" fill="#4f46e5"/><path d="M2.5 17.5l5.5-5.5 4 4 3.5-3.5 6 6" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
} );
