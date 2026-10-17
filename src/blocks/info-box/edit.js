import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import { getIconMarkup } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		icon,
		iconType,
		mediaType,
		dashicon,
		imageUrl,
		imageFocalPoint,
		imageWidth,
		imageHeight,
		imageAspectRatio,
		imageObjectFit,
		imageBorderRadius,
		iconSize,
		iconBoxSize,
		iconRadius,
		iconColor,
		iconBackgroundColor,
		textAlign,
		eyebrow,
		showEyebrow,
		eyebrowColor,
		title,
		titleColor,
		titleFontSize,
		description,
		descriptionColor,
		descriptionFontSize,
		linkText,
		showLink,
		linkColor,
		cardBackgroundColor,
		cardBorderColor,
		cardBorderWidth,
		cardBorderRadius,
		cardPaddingTop,
		cardPaddingBottom,
		cardPaddingLeft,
		cardPaddingRight,
		hoverEffect,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const isIconCleared = mediaType === 'none' || icon === 'none';
	const iconVal = isIconCleared
		? ''
		: ( icon || ( mediaType === 'image' && imageUrl ? imageUrl : ( dashicon || iconType || 'star' ) ) );
	const iconData = iconVal ? getIconMarkup( iconVal, 'star' ) : null;
	const isImg = ( iconData && iconData.type === 'image' ) || ( mediaType === 'image' && imageUrl && ! icon );
	const imgSrc = iconData?.src || imageUrl;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-info-box-card',
			`align-${ textAlign || 'left' }`,
			hoverEffect && hoverEffect !== 'none' ? `hover-${ hoverEffect }` : '',
			customClassName || '',
		]
			.filter( Boolean )
			.join( ' ' ),
		style: {
			'--info-box-bg': cardBackgroundColor || '#ffffff',
			'--info-box-border': cardBorderColor || 'rgba(0, 0, 0, 0.08)',
			'--info-box-border-width': `${ cardBorderWidth ?? 1 }px`,
			'--info-box-radius': `${ cardBorderRadius ?? 12 }px`,
			'--info-box-pt': `${ cardPaddingTop ?? 32 }px`,
			'--info-box-pb': `${ cardPaddingBottom ?? 32 }px`,
			'--info-box-pl': `${ cardPaddingLeft ?? 28 }px`,
			'--info-box-pr': `${ cardPaddingRight ?? 28 }px`,
			'--info-box-icon-color': iconColor || '#2563eb',
			'--info-box-icon-bg': isImg ? 'transparent' : ( iconBackgroundColor || 'rgba(37, 99, 235, 0.1)' ),
			'--info-box-icon-size': `${ iconSize ?? 24 }px`,
			'--info-box-icon-box-size': isImg && imageWidth ? `${ imageWidth }px` : `${ iconBoxSize ?? 48 }px`,
			'--info-box-icon-radius': isImg ? `${ imageBorderRadius ?? 0 }px` : `${ iconRadius ?? 10 }px`,
			'--info-box-title-color': titleColor || '#0f172a',
			'--info-box-title-size': `${ titleFontSize ?? 20 }px`,
			'--info-box-desc-color': descriptionColor || '#475569',
			'--info-box-desc-size': `${ descriptionFontSize ?? 15 }px`,
			'--info-box-eyebrow-color': eyebrowColor || '#64748b',
			'--info-box-link-color': linkColor || '#2563eb',
			'--info-box-align':
				textAlign === 'center'
					? 'center'
					: textAlign === 'right'
					? 'flex-end'
					: 'flex-start',
			'--info-box-text-align': textAlign || 'left',
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<>
			<Inspector { ...props } />

			<div { ...blockProps }>
				{ ! isIconCleared && (
					<div
						className="gravisain-info-box-icon"
						style={ isImg ? {
							width: imageWidth ? `${ imageWidth }px` : undefined,
							height: imageHeight ? `${ imageHeight }px` : ( imageWidth ? 'auto' : undefined ),
							background: 'transparent',
							borderRadius: imageBorderRadius ? `${ imageBorderRadius }px` : undefined,
						} : undefined }
					>
						{ isImg && imgSrc ? (
							<img
								src={ imgSrc }
								alt={ title || 'icon' }
								className="gravisain-info-box-img"
								style={ {
									width: imageWidth ? `${ imageWidth }px` : '100%',
									height: imageHeight ? `${ imageHeight }px` : '100%',
									aspectRatio: imageAspectRatio && imageAspectRatio !== 'auto' ? imageAspectRatio : undefined,
									objectFit: imageObjectFit || 'cover',
									borderRadius: imageBorderRadius ? `${ imageBorderRadius }px` : undefined,
									objectPosition: imageFocalPoint ? `${Math.round(imageFocalPoint.x * 100)}% ${Math.round(imageFocalPoint.y * 100)}%` : undefined,
								} }
							/>
						) : iconData && iconData.type === 'svg' ? (
							<span
								className="gravisain-info-box-svg"
								dangerouslySetInnerHTML={ { __html: iconData.content } }
								style={ {
									width: `${ iconSize ?? 24 }px`,
									height: `${ iconSize ?? 24 }px`,
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: iconColor || '#2563eb',
								} }
							/>
						) : dashicon ? (
							<span className={ `dashicons dashicons-${ dashicon }` } />
						) : (
							<span
								className="gravisain-info-box-svg"
								dangerouslySetInnerHTML={ { __html: getIconMarkup( 'star' ).content } }
								style={ {
									width: `${ iconSize ?? 24 }px`,
									height: `${ iconSize ?? 24 }px`,
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: iconColor || '#2563eb',
								} }
							/>
						) }
					</div>
				) }

				{ showEyebrow && (
					<RichText
						tagName="span"
						className="gravisain-info-box-eyebrow"
						value={ eyebrow }
						onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
						placeholder={ __( 'EYEBROW LABEL', 'gravisain' ) }
					/>
				) }

				<RichText
					tagName="h3"
					className="gravisain-info-box-title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Info Box Title...', 'gravisain' ) }
				/>

				<RichText
					tagName="p"
					className="gravisain-info-box-desc"
					value={ description }
					onChange={ ( val ) => setAttributes( { description: val } ) }
					placeholder={ __( 'Write description here...', 'gravisain' ) }
				/>

				{ showLink && (
					<RichText
						tagName="a"
						className="gravisain-info-box-link"
						value={ linkText }
						onChange={ ( val ) => setAttributes( { linkText: val } ) }
						placeholder={ __( 'Link text...', 'gravisain' ) }
					/>
				) }
			</div>
		</>
	);
}
