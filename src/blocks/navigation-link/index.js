import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import deprecated from './deprecated';
import './style.scss';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9 15l-2.5 2.5a4 4 0 01-5.6-5.6l2.5-2.5a4 4 0 015.6 0M15 9l2.5-2.5a4 4 0 015.6 5.6l-2.5 2.5a4 4 0 01-5.6 0M8.5 15.5l7-7" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );
