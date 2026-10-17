import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
			<circle cx="12" cy="12" r="10" fill="none" stroke="#4f46e5" strokeWidth="2"/>
			<circle cx="8.5" cy="8.5" r="1.5" fill="#4f46e5"/>
			<path d="M5.5 16.5l4-4 3 3 2.5-2.5 3.5 3.5" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	),
	edit: Edit,
	save: () => null, // Dynamic block rendered via PHP
} );
