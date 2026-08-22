import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { images, columns, gap, layout, imageRatio, imageRadius, anchor, enableLightbox } = attributes;

	if ( images.length === 0 ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-advanced-gallery layout-${layout} ratio-${imageRatio}`.trim(),
		style: {
			'--gallery-cols-desktop': columns.desktop,
			'--gallery-cols-tablet': columns.tablet,
			'--gallery-cols-mobile': columns.mobile,
			'--gallery-gap-desktop': `${gap.desktop}px`,
			'--gallery-gap-tablet': `${gap.tablet}px`,
			'--gallery-gap-mobile': `${gap.mobile}px`,
			'--gallery-radius': `${imageRadius}px`,
		}
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-gallery-wrapper">
				{ images.map( ( img, index ) => {
					const figureClass = `gravisain-gallery-figure ${enableLightbox ? 'has-lightbox' : ''}`.trim();
					
					return (
						<div key={ img.id || index } className="gravisain-gallery-item">
							<figure className={ figureClass }>
								{ enableLightbox ? (
									<a href={ img.url } data-lightbox="gravisain-gallery">
										<img src={ img.url } alt={ img.alt } />
									</a>
								) : (
									<img src={ img.url } alt={ img.alt } />
								) }
								{ img.caption && <figcaption>{ img.caption }</figcaption> }
							</figure>
						</div>
					);
				} ) }
			</div>
		</div>
	);
}
