import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import './format-highlight.js';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';
import deprecated from './deprecated.js';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 4v16M20 4v16M4 12h16" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save,
	deprecated,
} );
