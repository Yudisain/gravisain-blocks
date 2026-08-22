import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { columns, gap, layout, anchor } = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-testimonials-wrapper layout-${layout}`.trim(),
		style: {
			'--testi-cols-desktop': columns.desktop,
			'--testi-cols-tablet': columns.tablet,
			'--testi-cols-mobile': columns.mobile,
			'--testi-gap-desktop': `${gap.desktop}px`,
			'--testi-gap-tablet': `${gap.tablet}px`,
			'--testi-gap-mobile': `${gap.mobile}px`,
		}
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
