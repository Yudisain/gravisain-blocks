import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h2M3 12h2M3 19h2M8 5h13M8 12h13M8 19h9" stroke="#4f46e5" strokeWidth="2.4" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save,
} );
