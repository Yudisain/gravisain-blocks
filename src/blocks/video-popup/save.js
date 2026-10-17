import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { videoUrl, videoType, thumbnailUrl, thumbnailFocalPoint, playIconStyle, playIconColor, overlayColor, aspectRatio, borderRadius, anchor } = attributes;

	if ( ! thumbnailUrl || ! videoUrl ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-video-popup aspect-${aspectRatio.replace('/', '-')}`,
		style: {
			'--vp-border-radius': `${borderRadius}px`,
			'--vp-play-color': playIconColor,
			'--vp-overlay-color': overlayColor,
		}
	} );

	return (
		<div { ...blockProps }>
			<a href={ videoUrl } className="gravisain-vp-link" data-lity data-video-type={ videoType }>
				<div className="gravisain-vp-thumbnail">
					<img
						src={ thumbnailUrl }
						alt=""
						style={ thumbnailFocalPoint && ( thumbnailFocalPoint.x !== 0.5 || thumbnailFocalPoint.y !== 0.5 ) ? {
							objectPosition: `${Math.round(thumbnailFocalPoint.x * 100)}% ${Math.round(thumbnailFocalPoint.y * 100)}%`,
						} : undefined }
					/>
					<div className="gravisain-vp-overlay"></div>
					<div className={ `gravisain-vp-play-btn style-${playIconStyle}` }>
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 5v14l11-7z" fill="currentColor"/>
						</svg>
					</div>
				</div>
			</a>
		</div>
	);
}
