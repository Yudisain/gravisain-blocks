import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="1.5" y="4" width="21" height="16" rx="3" fill="none" stroke="#4f46e5" strokeWidth="2"/><path d="M5.5 9a2 2 0 012-2v2a2 2 0 01-2 2H5M10.5 9a2 2 0 012-2v2a2 2 0 01-2 2h-0.5" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" fill="none"/><circle cx="7" cy="15.5" r="1.8" fill="#4f46e5"/><path d="M11 15.5h7" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
} );
