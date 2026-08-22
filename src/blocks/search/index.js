import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="10.5" cy="10.5" r="7" fill="none" stroke="#4f46e5" strokeWidth="2.5"/><path d="M15.5 15.5l5.5 5.5" stroke="#4f46e5" strokeWidth="2.8" strokeLinecap="round"/></svg>
	),
	edit: Edit,
	save: () => null, // Rendered via PHP
} );
