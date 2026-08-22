import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3.5" width="20" height="17" rx="2.5" fill="none" stroke="#4f46e5" strokeWidth="2"/><path d="M2 9.5h20M9 9.5v11M15 9.5v11" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
} );
