import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="2" width="9" height="9" rx="2" fill="#4f46e5"/><rect x="13" y="2" width="9" height="9" rx="2" fill="#4f46e5" fillOpacity="0.35"/><rect x="2" y="13" width="9" height="9" rx="2" fill="#4f46e5" fillOpacity="0.35"/><rect x="13" y="13" width="9" height="9" rx="2" fill="#4f46e5"/></svg>
	),
	edit: Edit,
	save,
} );
