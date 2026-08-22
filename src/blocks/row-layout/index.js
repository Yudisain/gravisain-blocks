import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';
import deprecated from './deprecated.js';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="1.5" y="3" width="9.5" height="18" rx="2.5" fill="#4f46e5"/><rect x="13" y="3" width="9.5" height="18" rx="2.5" fill="#4f46e5"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );
