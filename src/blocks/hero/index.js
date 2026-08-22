import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.jsx';
import save from './save.jsx';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="1.5" y="2.5" width="21" height="19" rx="3" fill="none" stroke="#4f46e5" strokeWidth="2"/><path d="M5 6.5h14M5 10.5h10" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round"/><rect x="5" y="14" width="9" height="4.5" rx="2" fill="#4f46e5"/></svg>
	),
	edit: Edit,
	save,
} );
