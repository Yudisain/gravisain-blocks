import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { 
		layout, alignment, 
		linkColor, linkHoverColor, linkHoverBackground, 
		fontSize, fontWeight, itemSpacing 
	} = attributes;

	const blockProps = useBlockProps.save( {
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
		<nav { ...blockProps }>
			<ul className="gravisain-navigation-list">
				<InnerBlocks.Content />
			</ul>
		</nav>
	);
}
