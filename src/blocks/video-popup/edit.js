import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaPlaceholder, BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { thumbnailUrl, thumbnailId, thumbnailFocalPoint, playIconStyle, playIconColor, overlayColor, aspectRatio, borderRadius, anchor } = attributes;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: `gravisain-video-popup aspect-${aspectRatio.replace('/', '-')}`,
		style: {
			'--vp-border-radius': `${borderRadius}px`,
			'--vp-play-color': playIconColor,
			'--vp-overlay-color': overlayColor,
		}
	} );

	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) return;
		setAttributes( { thumbnailUrl: media.url, thumbnailId: media.id } );
	};

	const onRemoveImage = () => {
		setAttributes( { thumbnailUrl: '', thumbnailId: 0 } );
	};

	return (
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />

			<div { ...blockProps }>
				{ thumbnailUrl ? (
					<>
						<BlockControls group="other">
							<MediaReplaceFlow
								mediaId={ thumbnailId }
								mediaURL={ thumbnailUrl }
								allowedTypes={ [ 'image' ] }
								accept="image/*"
								onSelect={ onSelectImage }
								name={ __( 'Replace Image', 'gravisain-blocks' ) }
							/>
							<ToolbarButton
								icon="trash"
								title={ __( 'Remove Image', 'gravisain-blocks' ) }
								onClick={ onRemoveImage }
							/>
						</BlockControls>
						<div className="gravisain-vp-thumbnail">
							<img
								src={ thumbnailUrl }
								alt={ __( 'Video Thumbnail', 'gravisain-blocks' ) }
								style={ {
									objectFit: 'cover',
									objectPosition: thumbnailFocalPoint ? `${Math.round(thumbnailFocalPoint.x * 100)}% ${Math.round(thumbnailFocalPoint.y * 100)}%` : undefined,
								} }
							/>
							<div className="gravisain-vp-overlay"></div>
							<div className={ `gravisain-vp-play-btn style-${playIconStyle}` }>
								<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M8 5v14l11-7z" fill="currentColor"/>
								</svg>
							</div>
						</div>
					</>
				) : (
					<MediaPlaceholder
						icon="format-video"
						labels={ {
							title: __( 'Video Thumbnail', 'gravisain-blocks' ),
							instructions: __( 'Upload an image to serve as the video thumbnail.', 'gravisain-blocks' ),
						} }
						onSelect={ onSelectImage }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				) }
			</div>
		</>
	);
}
