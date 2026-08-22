import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const { layout, justifyContent, gap, anchor, customClassName, customCSS } = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-buttons-wrapper is-layout-${layout} ${customClassName || ''}`.trim(),
		style: {
			justifyContent: justifyContent,
			gap: `${gap}px`,
			...parseCustomCSS( customCSS )
		}
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
