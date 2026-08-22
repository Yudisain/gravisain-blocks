import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 17c3-7 7-12 9-12s6 12 9 6" fill="none" stroke="#4f46e5" strokeWidth="2.6" strokeLinecap="round"/><circle cx="12" cy="5" r="2.2" fill="#4f46e5"/><circle cx="3" cy="17" r="2.2" fill="#4f46e5"/><circle cx="21" cy="11" r="2.2" fill="#4f46e5"/></svg>
	),
	edit: Edit,
	save,
} );
