import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { previewHeight, showMoreText, buttonAlign, fadeColor, anchor } = attributes;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: `gravisain-show-more align-btn-${buttonAlign}`,
		style: {
			'--sm-preview-height': `${previewHeight}px`,
			'--sm-fade-color': fadeColor,
		}
	} );

	return (
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />

			<div { ...blockProps }>
				<div className="gravisain-sm-content">
					<InnerBlocks />
				</div>
				<div className="gravisain-sm-fade"></div>
				<div className="gravisain-sm-button-wrap">
					<span className="gravisain-sm-button">
						{ showMoreText }
					</span>
				</div>
			</div>
		</>
	);
}
