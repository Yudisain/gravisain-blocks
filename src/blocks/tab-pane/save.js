import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'gravisain-tab-pane',
		'data-tab-title': title || '',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
