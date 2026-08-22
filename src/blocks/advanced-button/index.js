import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="5.5" width="20" height="13" rx="6.5" fill="#4f46e5"/><path d="M9 12h6M12.5 9l3 3-3 3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
} );
