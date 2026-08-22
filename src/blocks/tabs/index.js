import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

// Ensure child tab-pane block is registered when parent is imported
import '../tab-pane/index.js';

registerBlockType( metadata.name, {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M2 9h6V4.5a1.5 1.5 0 011.5-1.5h5A1.5 1.5 0 0116 4.5V9h6" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><rect x="2" y="9" width="20" height="12" rx="2" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2"/></svg>
	),
	edit: Edit,
	save,
} );
