import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 6h18M3 11h18" stroke="#4f46e5" strokeWidth="2.4" strokeLinecap="round"/><path d="M8 16l4 4 4-4" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
} );
