import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 3h18M3 21h18M12 6.5v11M8.5 9.5L12 6l3.5 3.5M8.5 14.5L12 18l3.5-3.5" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
} );
