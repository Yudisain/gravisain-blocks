import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="1.5" y="2.5" width="21" height="19" rx="3" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 2"/><rect x="4.5" y="5.5" width="15" height="13" rx="2" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="1.8"/></svg>
	),
	edit: Edit,
	save,
} );
