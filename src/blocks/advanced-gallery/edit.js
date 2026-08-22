import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaPlaceholder, BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';

import GalleryInspector from './components/GalleryInspector';
import './editor.scss';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default function Edit( { attributes, setAttributes } ) {
	const { images, columns, gap, layout, imageRatio, imageRadius, anchor } = attributes;

	const blockProps = useBlockProps( {
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

	const onSelectImages = ( media ) => {
		const newImages = media.map( ( item ) => ( {
			id: item.id,
			url: item.url,
			alt: item.alt,
			caption: item.caption,
		} ) );
		setAttributes( { images: [ ...images, ...newImages ] } );
	};

	const onRemoveImage = ( index ) => {
		const newImages = [ ...images ];
		newImages.splice( index, 1 );
		setAttributes( { images: newImages } );
	};

	const onReplaceImage = ( media, index ) => {
		if ( ! media || ! media.url ) return;
		const newImages = [ ...images ];
		newImages[ index ] = {
			id: media.id,
			url: media.url,
			alt: media.alt,
			caption: media.caption,
		};
		setAttributes( { images: newImages } );
	};

	return (
		<>
			<GalleryInspector attributes={ attributes } setAttributes={ setAttributes } />

			<div { ...blockProps }>
				{ images.length > 0 && (
					<div className="gravisain-gallery-wrapper">
						{ images.map( ( img, index ) => (
							<div key={ img.id || index } className="gravisain-gallery-item">
								<BlockControls group="other">
									<MediaReplaceFlow
										mediaId={ img.id }
										mediaURL={ img.url }
										allowedTypes={ ALLOWED_MEDIA_TYPES }
										accept="image/*"
										onSelect={ ( media ) => onReplaceImage( media, index ) }
										name={ __( 'Replace Image', 'gravisain-blocks' ) }
									/>
									<ToolbarButton
										icon="trash"
										title={ __( 'Remove Image', 'gravisain-blocks' ) }
										onClick={ () => onRemoveImage( index ) }
									/>
								</BlockControls>
								<figure className="gravisain-gallery-figure">
									<img src={ img.url } alt={ img.alt } />
									{ img.caption && <figcaption>{ img.caption }</figcaption> }
								</figure>
							</div>
						) ) }
					</div>
				) }

				<div className="gravisain-gallery-uploader">
					<MediaPlaceholder
						icon="format-gallery"
						labels={ {
							title: __( 'Gallery', 'gravisain-blocks' ),
							instructions: __( 'Drag images, upload new ones or select files from your library.', 'gravisain-blocks' ),
						} }
						onSelect={ onSelectImages }
						accept="image/*"
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						multiple={ true }
						value={ images.length > 0 ? images : undefined }
					/>
				</div>
			</div>
		</>
	);
}
