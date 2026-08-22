import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="13" r="8.5" fill="none" stroke="#4f46e5" strokeWidth="2"/><path d="M12 8.5v4.5l3.5 2M9 2.5h6" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
} );
