import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3" width="20" height="18" rx="3" fill="none" stroke="#4f46e5" strokeWidth="2"/><path d="M6 7.5h12M6 12h12" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/><rect x="6" y="15" width="7" height="3" rx="1" fill="#4f46e5"/></svg>
	),
	edit: Edit,
	save,
} );
