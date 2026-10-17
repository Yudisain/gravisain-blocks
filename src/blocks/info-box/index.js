import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import deprecated from './deprecated.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="1.5" y="2.5" width="21" height="19" rx="3" fill="none" stroke="#4f46e5" strokeWidth="2"/><circle cx="12" cy="8" r="3" fill="#4f46e5"/><path d="M5.5 14.5h13M7.5 17.5h9" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );
