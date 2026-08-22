import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { SHAPES } from '../../controls/shapes';
import parseCustomCSS from '../../controls/parseCustomCSS';
import metadata from './block.json';

const v1 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const { 
			columns, alignItems, justifyContent, rowGap, rowGapTablet, rowGapMobile, stackOn,
			backgroundColor, textColor, padding, paddingTablet, paddingMobile, margin, marginTablet, marginMobile, displayMode,
			backgroundImage, backgroundPosition, backgroundSize, backgroundAttachment,
			backgroundOverlay, backgroundOverlayOpacity,
			topShapeDivider, bottomShapeDivider, hideOnDesktop, hideOnTablet, hideOnMobile,
			innerContentWidth, htmlTag, borderRadius, borderStyle, borderWidth, borderColor, boxShadow,
			anchor, customClassName, customCSS
		} = attributes;
	
		const TagName = htmlTag || 'div';
	
		let wrapperClass = `gravisain-row-layout is-display-${displayMode} has-${columns}-columns is-stacked-on-${stackOn} is-inner-width-${innerContentWidth} ${ alignItems ? 'align-items-' + alignItems : '' } ${ justifyContent ? 'justify-content-' + justifyContent : '' }`;
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
				backgroundColor: backgroundColor || undefined,
				backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
				backgroundPosition: backgroundImage?.url ? backgroundPosition : undefined,
				backgroundSize: backgroundImage?.url ? backgroundSize : undefined,
				backgroundAttachment: backgroundImage?.url ? backgroundAttachment : undefined,
				'--gravisain-bg-overlay': backgroundOverlay || undefined,
				'--gravisain-bg-overlay-opacity': backgroundOverlayOpacity !== undefined ? backgroundOverlayOpacity / 100 : undefined,
				color: textColor || undefined,
	
				// Desktop Spacing (OLD VERSION - used native paddingTop instead of CSS variables)
				paddingTop: padding?.top || undefined,
				paddingRight: padding?.right || undefined,
				paddingBottom: padding?.bottom || undefined,
				paddingLeft: padding?.left || undefined,
				marginTop: margin?.top || undefined,
				marginRight: margin?.right || undefined,
				marginBottom: margin?.bottom || undefined,
				marginLeft: margin?.left || undefined,
	
				// Tablet Spacing variables
				'--gravisain-padding-top-tablet': paddingTablet?.top || undefined,
				'--gravisain-padding-right-tablet': paddingTablet?.right || undefined,
				'--gravisain-padding-bottom-tablet': paddingTablet?.bottom || undefined,
				'--gravisain-padding-left-tablet': paddingTablet?.left || undefined,
				'--gravisain-margin-top-tablet': marginTablet?.top || undefined,
				'--gravisain-margin-right-tablet': marginTablet?.right || undefined,
				'--gravisain-margin-bottom-tablet': marginTablet?.bottom || undefined,
				'--gravisain-margin-left-tablet': marginTablet?.left || undefined,
	
				// Mobile Spacing variables
				'--gravisain-padding-top-mobile': paddingMobile?.top || undefined,
				'--gravisain-padding-right-mobile': paddingMobile?.right || undefined,
				'--gravisain-padding-bottom-mobile': paddingMobile?.bottom || undefined,
				'--gravisain-padding-left-mobile': paddingMobile?.left || undefined,
				'--gravisain-margin-top-mobile': marginMobile?.top || undefined,
				'--gravisain-margin-right-mobile': marginMobile?.right || undefined,
				// Mobile Spacing variables (was duplicated in old version)
				'--gravisain-padding-top-mobile': paddingMobile?.top || undefined,
				'--gravisain-padding-right-mobile': paddingMobile?.right || undefined,
				'--gravisain-padding-bottom-mobile': paddingMobile?.bottom || undefined,
				'--gravisain-padding-left-mobile': paddingMobile?.left || undefined,
				'--gravisain-margin-top-mobile': marginMobile?.top || undefined,
				'--gravisain-margin-right-mobile': marginMobile?.right || undefined,
				'--gravisain-margin-bottom-mobile': marginMobile?.bottom || undefined,
				'--gravisain-margin-left-mobile': marginMobile?.left || undefined,
	
				// Borders & Shadow
				borderRadius: borderRadius ? `${borderRadius}px` : undefined,
				borderStyle: borderStyle !== 'none' ? borderStyle : undefined,
				borderWidth: borderStyle !== 'none' && borderWidth ? `${borderWidth}px` : undefined,
				borderColor: borderStyle !== 'none' && borderColor ? borderColor : undefined,
				boxShadow: boxShadow !== 'none' ? boxShadow : undefined,
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
};

export default [ v1 ];
