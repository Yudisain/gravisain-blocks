import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3.5" width="20" height="17" rx="3.5" fill="#4f46e5"/><path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#ffffff" stroke="#ffffff" strokeWidth="1" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );
