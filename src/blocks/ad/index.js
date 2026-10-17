import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 11l13-5.5v13L3 13v-2z" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 12v5.2a1 1 0 001 1h1.2a1 1 0 001-1V12" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 9.2c1.4.7 2 1.6 2 2.8s-.6 2.1-2 2.8" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
	),
	edit: Edit,
	save: () => null, // Server-side rendered block.
} );
