import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

const v1 = {
	attributes: {
		id: { type: 'number', default: 0 },
		url: { type: 'string', default: '' },
		alt: { type: 'string', default: '' },
		title: { type: 'string', default: '' },
		caption: { type: 'string', default: '' },
		width: { type: 'number', default: 0 },
		height: { type: 'number', default: 0 },
		aspectRatio: { type: 'string', default: 'auto' },
		objectFit: { type: 'string', default: 'cover' },
		borderRadius: { type: 'number', default: 0 },
		borderWidth: { type: 'number', default: 0 },
		borderColor: { type: 'string', default: '#cccccc' },
		borderStyle: { type: 'string', default: 'solid' },
		boxShadow: { type: 'string', default: 'none' },
		overlayColor: { type: 'string', default: '' },
		overlayOpacity: { type: 'number', default: 0 },
		link: { type: 'string', default: '' },
		linkTarget: { type: 'string', default: '_self' },
		alignment: { type: 'string', default: 'center' },
		alignmentTablet: { type: 'string', default: '' },
		alignmentMobile: { type: 'string', default: '' },
		anchor: { type: 'string', default: '' },
		customClassName: { type: 'string', default: '' },
		customCSS: { type: 'string', default: '' }
	},
	save( { attributes } ) {
		const {
			url,
			alt,
			caption,
			aspectRatio,
			objectFit,
			borderRadius,
			borderWidth,
			borderColor,
			borderStyle,
			boxShadow,
			overlayColor,
			overlayOpacity,
			link,
			linkTarget,
			alignment,
			alignmentTablet,
			alignmentMobile,
			anchor,
			customClassName,
			customCSS,
		} = attributes;

		if ( ! url ) return null;

		const blockProps = useBlockProps.save( {
			id: anchor || undefined,
			className: [
				'gravisain-image',
				alignment ? `align-${ alignment }` : '',
				alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
				alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
				customClassName || '',
			].filter( Boolean ).join( ' ' ),
			style: {
				...parseCustomCSS( customCSS ),
			},
		} );

		const imgElement = (
			<img
				src={ url }
				alt={ alt }
				style={ {
					width: '100%',
					height: aspectRatio !== 'auto' ? '100%' : 'auto',
					objectFit: aspectRatio !== 'auto' ? objectFit : undefined,
					display: 'block',
					border: 'none',
				} }
			/>
		);

		return (
			<figure { ...blockProps }>
				<div
					className="gravisain-image-wrapper"
					style={ {
						aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
						borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
						border: borderWidth > 0 ? `${ borderWidth }px ${ borderStyle || 'solid' } ${ borderColor || '#cccccc' }` : 'none',
						boxShadow: boxShadow !== 'none' ? boxShadow : undefined,
						overflow: 'hidden',
						position: 'relative',
						width: '100%',
						maxWidth: '100%',
					} }
				>
					{ link ? (
						<a href={ link } target={ linkTarget } rel={ linkTarget === '_blank' ? 'noopener noreferrer' : undefined }>
							{ imgElement }
						</a>
					) : (
						imgElement
					) }

					{ overlayColor && overlayOpacity > 0 && (
						<div
							className="gravisain-image-overlay"
							style={ {
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								...( overlayColor ? (
									( overlayColor.includes( 'gradient' ) || overlayColor.includes( 'linear' ) || overlayColor.includes( 'radial' ) )
										? { backgroundImage: overlayColor }
										: { backgroundColor: overlayColor }
								) : {} ),
								opacity: overlayOpacity / 100,
								pointerEvents: 'none',
							} }
						/>
					) }
				</div>

				{ ! RichText.isEmpty( caption ) && (
					<RichText.Content tagName="figcaption" className="gravisain-image-caption" value={ caption } />
				) }
			</figure>
		);
	}
};

export default [ v1 ];
