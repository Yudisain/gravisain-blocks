import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3.5" width="20" height="17" rx="3" fill="none" stroke="#4f46e5" strokeWidth="2"/><path d="M6 8.5h12M6 12.5h9" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
} );
