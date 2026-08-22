import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="8" width="20" height="8" rx="4" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2"/><rect x="3.5" y="9.5" width="11" height="5" rx="2.5" fill="#4f46e5"/></svg>
	),
	edit: Edit,
	save,
} );
