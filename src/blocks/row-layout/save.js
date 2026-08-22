import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { SHAPES } from '../../controls/shapes';
import parseCustomCSS from '../../controls/parseCustomCSS';

// Helper to extract spacing values because BoxControl can return a string or number when all sides are linked
const getSpacing = ( spacing, side ) => {
	if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
	if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
		return typeof spacing === 'number' ? `${spacing}px` : spacing;
	}
	const val = spacing[ side ];
	if ( typeof val === 'number' ) return `${val}px`;
	return val || undefined;
};

export default function save( { attributes } ) {
	const { 
		columns, alignItems, justifyContent, rowGap, rowGapTablet, rowGapMobile, stackOn,
		backgroundColor, backgroundColorTablet, backgroundColorMobile, 
		textColor, textColorTablet, textColorMobile, 
		padding, paddingTablet, paddingMobile, margin, marginTablet, marginMobile, displayMode,
		backgroundImage, backgroundImageTablet, backgroundImageMobile, 
		backgroundPosition, backgroundPositionTablet, backgroundPositionMobile, 
		backgroundSize, backgroundSizeTablet, backgroundSizeMobile, 
		backgroundAttachment, backgroundAttachmentTablet, backgroundAttachmentMobile,
		backgroundOverlay, backgroundOverlayTablet, backgroundOverlayMobile, 
		backgroundOverlayOpacity, backgroundOverlayOpacityTablet, backgroundOverlayOpacityMobile,
		topShapeDivider, bottomShapeDivider, hideOnDesktop, hideOnTablet, hideOnMobile,
		innerContentWidth, useCustomContentWidth, customContentMaxWidth, htmlTag, 
		borderRadius, borderRadiusTablet, borderRadiusMobile, 
		borderStyle, borderStyleTablet, borderStyleMobile, 
		borderWidth, borderWidthTablet, borderWidthMobile, 
		borderColor, borderColorTablet, borderColorMobile, 
		boxShadow, boxShadowTablet, boxShadowMobile,
		anchor, customClassName, customCSS
	} = attributes;

	const TagName = htmlTag || 'div';

	const activeInnerWidth = useCustomContentWidth ? 'custom' : innerContentWidth;
	let wrapperClass = `gravisain-row-layout is-display-${displayMode} has-${columns}-columns is-stacked-on-${stackOn} is-inner-width-${activeInnerWidth} ${ alignItems ? 'align-items-' + alignItems : '' } ${ justifyContent ? 'justify-content-' + justifyContent : '' }`;
	if ( hideOnDesktop ) wrapperClass += ' gravisain-hide-desktop';
	if ( hideOnTablet ) wrapperClass += ' gravisain-hide-tablet';
	if ( hideOnMobile ) wrapperClass += ' gravisain-hide-mobile';
	if ( backgroundOverlay ) wrapperClass += ' has-background-overlay';
	if ( customClassName ) wrapperClass += ' ' + customClassName;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: wrapperClass,
		style: {
			'--gravisain-row-gap': rowGap + 'px',
			'--gravisain-row-gap-tablet': rowGapTablet !== undefined ? rowGapTablet + 'px' : undefined,
			'--gravisain-row-gap-mobile': rowGapMobile !== undefined ? rowGapMobile + 'px' : undefined,
			'--gravisain-gap-compensation': columns > 1 ? `calc(${rowGap}px * ${columns - 1} / ${columns})` : '0px',
			'--gravisain-gap-compensation-tablet': columns > 1 && rowGapTablet !== undefined ? `calc(${rowGapTablet}px * ${columns - 1} / ${columns})` : undefined,
			'--gravisain-gap-compensation-mobile': columns > 1 && rowGapMobile !== undefined ? `calc(${rowGapMobile}px * ${columns - 1} / ${columns})` : undefined,
			'--gravisain-bg-color': backgroundColor || undefined,
			'--gravisain-bg-color-tablet': backgroundColorTablet || undefined,
			'--gravisain-bg-color-mobile': backgroundColorMobile || undefined,
			
			'--gravisain-bg-image': backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
			'--gravisain-bg-image-tablet': backgroundImageTablet?.url ? `url(${backgroundImageTablet.url})` : undefined,
			'--gravisain-bg-image-mobile': backgroundImageMobile?.url ? `url(${backgroundImageMobile.url})` : undefined,
			
			'--gravisain-bg-position': backgroundPosition || undefined,
			'--gravisain-bg-position-tablet': backgroundPositionTablet || undefined,
			'--gravisain-bg-position-mobile': backgroundPositionMobile || undefined,
			
			'--gravisain-bg-size': backgroundSize || undefined,
			'--gravisain-bg-size-tablet': backgroundSizeTablet || undefined,
			'--gravisain-bg-size-mobile': backgroundSizeMobile || undefined,
			
			'--gravisain-bg-attachment': backgroundAttachment || undefined,
			'--gravisain-bg-attachment-tablet': backgroundAttachmentTablet || undefined,
			'--gravisain-bg-attachment-mobile': backgroundAttachmentMobile || undefined,
			
			'--gravisain-bg-overlay': backgroundOverlay || undefined,
			'--gravisain-bg-overlay-tablet': backgroundOverlayTablet || undefined,
			'--gravisain-bg-overlay-mobile': backgroundOverlayMobile || undefined,
			
			'--gravisain-bg-overlay-opacity': backgroundOverlayOpacity !== undefined ? backgroundOverlayOpacity / 100 : undefined,
			'--gravisain-bg-overlay-opacity-tablet': backgroundOverlayOpacityTablet !== undefined ? backgroundOverlayOpacityTablet / 100 : undefined,
			'--gravisain-bg-overlay-opacity-mobile': backgroundOverlayOpacityMobile !== undefined ? backgroundOverlayOpacityMobile / 100 : undefined,
			
			'--gravisain-text-color': textColor || undefined,
			'--gravisain-text-color-tablet': textColorTablet || undefined,
			'--gravisain-text-color-mobile': textColorMobile || undefined,

			// Desktop Spacing
			'--gravisain-padding-top': getSpacing( padding, 'top' ),
			'--gravisain-padding-right': getSpacing( padding, 'right' ),
			'--gravisain-padding-bottom': getSpacing( padding, 'bottom' ),
			'--gravisain-padding-left': getSpacing( padding, 'left' ),
			'--gravisain-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-margin-left': getSpacing( margin, 'left' ),

			'--gravisain-custom-inner-width': useCustomContentWidth && customContentMaxWidth ? `${customContentMaxWidth}px` : undefined,

			// Tablet Spacing variables
			'--gravisain-padding-top-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-padding-right-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-padding-bottom-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-padding-left-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-margin-left-tablet': getSpacing( marginTablet, 'left' ),

			// Mobile Spacing variables
			'--gravisain-padding-top-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-padding-right-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-padding-bottom-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-padding-left-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-margin-left-mobile': getSpacing( marginMobile, 'left' ),

			// Borders & Shadow
			'--gravisain-border-radius': borderRadius ? `${borderRadius}px` : undefined,
			'--gravisain-border-radius-tablet': borderRadiusTablet ? `${borderRadiusTablet}px` : undefined,
			'--gravisain-border-radius-mobile': borderRadiusMobile ? `${borderRadiusMobile}px` : undefined,
			
			'--gravisain-border-style': borderStyle !== 'none' ? borderStyle : undefined,
			'--gravisain-border-style-tablet': borderStyleTablet !== 'none' ? borderStyleTablet : undefined,
			'--gravisain-border-style-mobile': borderStyleMobile !== 'none' ? borderStyleMobile : undefined,
			
			'--gravisain-border-width': borderStyle !== 'none' && borderWidth ? `${borderWidth}px` : undefined,
			'--gravisain-border-width-tablet': borderStyleTablet !== 'none' && borderWidthTablet ? `${borderWidthTablet}px` : undefined,
			'--gravisain-border-width-mobile': borderStyleMobile !== 'none' && borderWidthMobile ? `${borderWidthMobile}px` : undefined,
			
			'--gravisain-border-color': borderStyle !== 'none' && borderColor ? borderColor : undefined,
			'--gravisain-border-color-tablet': borderStyleTablet !== 'none' && borderColorTablet ? borderColorTablet : undefined,
			'--gravisain-border-color-mobile': borderStyleMobile !== 'none' && borderColorMobile ? borderColorMobile : undefined,
			
			'--gravisain-box-shadow': boxShadow !== 'none' ? boxShadow : undefined,
			'--gravisain-box-shadow-tablet': boxShadowTablet !== 'none' ? boxShadowTablet : undefined,
			'--gravisain-box-shadow-mobile': boxShadowMobile !== 'none' ? boxShadowMobile : undefined,
			...parseCustomCSS( customCSS )
		}
	} );

	return (
		<TagName { ...blockProps }>
			{ topShapeDivider?.type && topShapeDivider.type !== 'none' && SHAPES[ topShapeDivider.type ] && (
				<div 
					className="gravisain-shape-divider gravisain-shape-top"
					style={{ 
						color: topShapeDivider.color, 
						height: `${ topShapeDivider.height }px`,
						width: `${ topShapeDivider.width }%`,
						transform: `translateX(-50%) ${ topShapeDivider.flipH ? 'scaleX(-1)' : '' } ${ topShapeDivider.flipV ? 'scaleY(-1)' : '' }`
					}}
					dangerouslySetInnerHTML={{ __html: SHAPES[ topShapeDivider.type ].svg }}
				/>
			) }
			<div className="gravisain-row-layout-inner">
				<InnerBlocks.Content />
			</div>
			{ bottomShapeDivider?.type && bottomShapeDivider.type !== 'none' && SHAPES[ bottomShapeDivider.type ] && (
				<div 
					className="gravisain-shape-divider gravisain-shape-bottom"
					style={{ 
						color: bottomShapeDivider.color, 
						height: `${ bottomShapeDivider.height }px`,
						width: `${ bottomShapeDivider.width }%`,
						transform: `translateX(-50%) ${ bottomShapeDivider.flipH ? 'scaleX(-1)' : '' } ${ bottomShapeDivider.flipV ? 'scaleY(-1)' : '' }`
					}}
					dangerouslySetInnerHTML={{ __html: SHAPES[ bottomShapeDivider.type ].svg }}
				/>
			) }
		</TagName>
	);
}
