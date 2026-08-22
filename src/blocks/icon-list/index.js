import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M2.5 6l2.5 2.5 5-5M2.5 13l2.5 2.5 5-5M2.5 20l2.5 2.5 5-5" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 5.5h8.5M13 12.5h8.5M13 19.5h8.5" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
} );
