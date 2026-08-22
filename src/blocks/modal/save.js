import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
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

	const blockProps = useBlockProps.save( {
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
		<div { ...blockProps }>
			{ triggerType === 'button' ? (
				<button type="button" className="gravisain-modal-trigger-btn">
					<RichText.Content tagName="span" value={ triggerText } />
				</button>
			) : (
				<a href="#" className="gravisain-modal-trigger-link">
					<RichText.Content tagName="span" value={ triggerText } />
				</a>
			) }

			<div className="gravisain-modal-overlay" style={ { display: 'none' } } aria-hidden="true">
				<div className="gravisain-modal-box" role="dialog" aria-modal="true" aria-label={ modalTitle || 'Popup Modal' }>
					<div className="gravisain-modal-header">
						{ ! RichText.isEmpty( modalTitle ) && (
							<RichText.Content tagName="h4" className="gravisain-modal-title" value={ modalTitle } />
						) }
						<button type="button" className="gravisain-modal-close-btn" aria-label="Close modal">
							&times;
						</button>
					</div>
					<div className="gravisain-modal-body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
