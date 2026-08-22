import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3" width="9" height="18" rx="2" fill="#4f46e5"/><rect x="13" y="3" width="9" height="18" rx="2" fill="#4f46e5" fillOpacity="0.3"/></svg>
	),
	edit: Edit,
	save: () => null, // Server-side rendered
} );
