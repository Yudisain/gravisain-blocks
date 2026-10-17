import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
			<rect x="2.5" y="5.5" width="19" height="13" rx="3" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2" />
			<path d="M7 12h10M13 8.5l3.5 3.5-3.5 3.5" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	edit: Edit,
	save,
} );
