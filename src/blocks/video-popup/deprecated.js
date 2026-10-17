import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

const v1 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const { videoUrl, videoType, thumbnailUrl, playIconStyle, playIconColor, overlayColor, aspectRatio, borderRadius, anchor } = attributes;

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
						<img src={ thumbnailUrl } alt="" />
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
	},
};

export default [ v1 ];
