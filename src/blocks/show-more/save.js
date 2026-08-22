import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { previewHeight, showMoreText, showLessText, enableShowLess, buttonAlign, fadeColor, anchor } = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-show-more align-btn-${buttonAlign}`,
		style: {
			'--sm-preview-height': `${previewHeight}px`,
			'--sm-fade-color': fadeColor,
		},
		'data-show-more': showMoreText,
		'data-show-less': enableShowLess ? showLessText : '',
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-sm-inner">
				<div className="gravisain-sm-content">
					<InnerBlocks.Content />
				</div>
				<div className="gravisain-sm-fade"></div>
			</div>
			<div className="gravisain-sm-button-wrap">
				<button type="button" className="gravisain-sm-button" aria-expanded="false">
					{ showMoreText }
				</button>
			</div>
		</div>
	);
}
