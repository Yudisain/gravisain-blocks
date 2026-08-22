import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2l3.1 6.3 7 .9-5.1 4.9 1.2 7L12 17.8 5.8 21.1l1.2-7L1.9 9.2l7-.9L12 2z" fill="#4f46e5" stroke="#4f46e5" strokeWidth="1" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
} );
