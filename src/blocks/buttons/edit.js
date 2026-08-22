import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import ButtonsInspector from './components/ButtonsInspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/advanced-button' ];

export default function Edit( { attributes, setAttributes } ) {
	const { layout, justifyContent, gap, anchor, customClassName, customCSS } = attributes;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: `gravisain-buttons-wrapper is-layout-${layout} ${customClassName || ''}`.trim(),
		style: {
			justifyContent: justifyContent,
			gap: `${gap}px`,
			...parseCustomCSS( customCSS )
		}
	} );

	return (
		<>
			<ButtonsInspector attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					orientation={ layout }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
					template={ [ [ 'gravisain/advanced-button' ] ] }
				/>
			</div>
		</>
	);
}
