import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2.5" y="3.5" width="19" height="17" rx="3" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2"/><path d="M17 7.5l-3 3m0-3l3 3" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/><path d="M6.5 13h11M6.5 16.5h7" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
} );
