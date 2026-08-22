import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="4" y="2.5" width="16" height="19" rx="2.5" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2"/><path d="M7.5 7.5h9M7.5 12h9M7.5 16.5h5" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
} );
