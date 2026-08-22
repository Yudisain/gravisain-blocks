import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/navigation-link' ];

const TEMPLATE = [
	[ 'gravisain/navigation-link', { label: 'Home', url: '#' } ],
	[ 'gravisain/navigation-link', { label: 'About', url: '#' } ],
	[ 'gravisain/navigation-link', { label: 'Services', url: '#' } ],
	[ 'gravisain/navigation-link', { label: 'Contact', url: '#' } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { 
		layout, alignment, 
		linkColor, linkHoverColor, linkHoverBackground, 
		fontSize, fontWeight, itemSpacing 
	} = attributes;

	const blockProps = useBlockProps( {
		className: `gravisain-navigation-wrapper layout-${layout} align-${alignment}`,
		style: {
			'--gravisain-nav-gap': `${itemSpacing}px`,
			'--gravisain-nav-color': linkColor,
			'--gravisain-nav-hover-color': linkHoverColor,
			'--gravisain-nav-hover-bg': linkHoverBackground,
			'--gravisain-nav-fs': `${fontSize}px`,
			'--gravisain-nav-fw': fontWeight,
		}
	} );

	return (
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...blockProps }>
				<ul className="gravisain-navigation-list">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						orientation={ layout === 'horizontal' ? 'horizontal' : 'vertical' }
					/>
				</ul>
			</div>
		</>
	);
}
