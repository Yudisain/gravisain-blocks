import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3.5" width="20" height="7.5" rx="3.75" fill="#4f46e5"/><rect x="2" y="13" width="20" height="7.5" rx="3.75" fill="none" stroke="#4f46e5" strokeWidth="2"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );
