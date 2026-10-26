import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		triggerType,
		triggerText,
		modalTitle,
		modalWidth,
		buttonColor,
		buttonTextColor,
		modalBackgroundColor,
		overlayColor,
		closeButtonColor,
		borderRadius,
		contentPadding,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const [ isPreviewOpen, setIsPreviewOpen ] = useState( true );

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [ 'gravisain-modal', customClassName || '' ].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-modal-btn-bg': buttonColor || '#007cba',
			'--gravisain-modal-btn-color': buttonTextColor || '#ffffff',
			'--gravisain-modal-box-bg': modalBackgroundColor || '#ffffff',
			'--gravisain-modal-overlay-bg': overlayColor || 'rgba(0, 0, 0, 0.6)',
			'--gravisain-modal-close-color': closeButtonColor || '#333333',
			'--gravisain-modal-radius': `${ borderRadius }px`,
			'--gravisain-modal-padding': `${ contentPadding }px`,
			'--gravisain-modal-width': `${ modalWidth }px`,
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div className="gravisain-modal-trigger-wrapper">
					{ triggerType === 'button' ? (
						<button type="button" className="gravisain-modal-trigger-button" onClick={ () => setIsPreviewOpen( ! isPreviewOpen ) }>
							<RichText
								tagName="span"
								value={ triggerText }
								onChange={ ( val ) => setAttributes( { triggerText: val } ) }
								placeholder={ __( 'Button text...', 'gravisain-blocks' ) }
							/>
						</button>
					) : (
						<a href="#preview" className="gravisain-modal-trigger-text" onClick={ ( e ) => { e.preventDefault(); setIsPreviewOpen( ! isPreviewOpen ); } }>
							<RichText
								tagName="span"
								value={ triggerText }
								onChange={ ( val ) => setAttributes( { triggerText: val } ) }
								placeholder={ __( 'Link text...', 'gravisain-blocks' ) }
							/>
						</a>
					) }

					<Button
						variant="secondary"
						isSmall
						className="gravisain-toggle-modal-editor-btn"
						onClick={ () => setIsPreviewOpen( ! isPreviewOpen ) }
						icon={ isPreviewOpen ? 'visibility' : 'hidden' }
					>
						{ isPreviewOpen ? __( 'Hide Modal Content', 'gravisain-blocks' ) : __( 'Edit Modal Content', 'gravisain-blocks' ) }
					</Button>
				</div>

				{ isPreviewOpen && (
					<div className="gravisain-modal-editor-preview">
						<div className="gravisain-modal-editor-header">
							<RichText
								tagName="h4"
								className="gravisain-modal-title"
								value={ modalTitle }
								onChange={ ( val ) => setAttributes( { modalTitle: val } ) }
								placeholder={ __( 'Modal Title...', 'gravisain-blocks' ) }
							/>
							<span className="gravisain-modal-close-preview dashicons dashicons-no-alt" />
						</div>
						<div className="gravisain-modal-editor-body">
							<InnerBlocks
								template={ [ [ 'core/paragraph', { placeholder: 'Add modal popup content here...' } ] ] }
							/>
						</div>
					</div>
				) }
			</div>
		</>
	);
}
