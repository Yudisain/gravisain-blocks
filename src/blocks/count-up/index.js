import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			stroke="#4f46e5"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{/* Angka 1 */}
			<path d="M2.5 8L4.5 6v12" />

			{/* Angka 0 (Transparan Tanpa Hitam) */}
			<rect x="7" y="6" width="5.5" height="12" rx="2.75" fill="none" />

			{/* Angka 0 (Transparan Tanpa Hitam) */}
			<rect x="14" y="6" width="5.5" height="12" rx="2.75" fill="none" />

			{/* Tanda Plus */}
			<path d="M21 7v4" />
			<path d="M19 9h4" />

			{/* Panah Count Up Naik */}
			<path d="M20 18l2.5-2.5" />
			<path d="M20.5 15.5H22.5V17.5" />
		</svg>
	),
	edit: Edit,
	save,
} );
