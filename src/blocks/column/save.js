import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

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
		width,
		widthTablet,
		widthMobile,
		verticalAlignment,
		horizontalAlignment,
		horizontalAlignmentTablet,
		horizontalAlignmentMobile,
		backgroundColor,
		textColor,
		backgroundImage,
		backgroundFocalPoint,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		borderWidth,
		borderColor,
		borderStyle,
		borderRadius,
		boxShadow,
		hoverEffect,
		hoverBackgroundColor,
		hoverBorderColor,
		anchor,
		customClassName,
		customCSS,
		isSticky,
		stickyDesktop,
		stickyTablet,
		stickyMobile,
		stickyOffset,
		stickyOffsetTablet,
		stickyOffsetMobile,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-column',
			verticalAlignment ? `is-vertically-aligned-${ verticalAlignment }` : '',
			horizontalAlignment ? `has-text-align-${ horizontalAlignment }` : '',
			horizontalAlignmentTablet ? `has-tablet-text-align-${ horizontalAlignmentTablet }` : '',
			horizontalAlignmentMobile ? `has-mobile-text-align-${ horizontalAlignmentMobile }` : '',
			hoverEffect && hoverEffect !== 'none' ? `hover-${ hoverEffect }` : '',
			isSticky ? 'is-sticky' : '',
			isSticky && stickyDesktop === false ? 'sticky-disable-desktop' : '',
			isSticky && stickyTablet === false ? 'sticky-disable-tablet' : '',
			isSticky && ( stickyMobile === false || stickyMobile === undefined ) ? 'sticky-disable-mobile' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			minWidth: 0,
			boxSizing: 'border-box',
			...( backgroundColor ? (
				backgroundColor.includes( 'gradient' )
					? { backgroundImage: backgroundImage ? `url(${ backgroundImage }), ${ backgroundColor }` : backgroundColor }
					: { backgroundColor, backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined }
			) : {
				backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined
			} ),
			color: textColor || undefined,
			backgroundSize: backgroundImage ? 'cover' : undefined,
			backgroundPosition: backgroundImage
				? ( backgroundFocalPoint && ( backgroundFocalPoint.x !== 0.5 || backgroundFocalPoint.y !== 0.5 )
					? `${Math.round(backgroundFocalPoint.x * 100)}% ${Math.round(backgroundFocalPoint.y * 100)}%`
					: 'center' )
				: undefined,

			// Desktop Spacing
			'--gravisain-col-pt': getSpacing( padding, 'top' ),
			'--gravisain-col-pr': getSpacing( padding, 'right' ),
			'--gravisain-col-pb': getSpacing( padding, 'bottom' ),
			'--gravisain-col-pl': getSpacing( padding, 'left' ),
			'--gravisain-col-mt': getSpacing( margin, 'top' ),
			'--gravisain-col-mr': getSpacing( margin, 'right' ),
			'--gravisain-col-mb': getSpacing( margin, 'bottom' ),
			'--gravisain-col-ml': getSpacing( margin, 'left' ),

			// Tablet & Mobile Width Variables
			'--gravisain-col-width-tablet': widthTablet || undefined,
			'--gravisain-col-width-mobile': widthMobile || undefined,

			// Tablet Spacing Variables
			'--gravisain-col-pt-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-col-pr-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-col-pb-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-col-pl-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-col-mt-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-col-mr-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-col-mb-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-col-ml-tablet': getSpacing( marginTablet, 'left' ),

			// Mobile Spacing Variables
			'--gravisain-col-pt-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-col-pr-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-col-pb-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-col-pl-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-col-mt-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-col-mr-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-col-mb-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-col-ml-mobile': getSpacing( marginMobile, 'left' ),

			// Borders
			borderWidth: borderWidth ? `${ borderWidth }px` : undefined,
			borderColor: borderColor || undefined,
			borderStyle: borderWidth ? borderStyle : undefined,
			borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
			boxShadow: boxShadow || undefined,

			// Hover Effects
			'--gravisain-col-hover-bg': hoverBackgroundColor || undefined,
			'--gravisain-col-hover-border': hoverBorderColor || undefined,

			// Sticky Variables
			'--gravisain-sticky-top': isSticky && stickyOffset !== undefined ? `${ stickyOffset }px` : undefined,
			'--gravisain-sticky-top-tablet': isSticky && stickyOffsetTablet !== undefined && stickyOffsetTablet !== '' ? `${ stickyOffsetTablet }px` : undefined,
			'--gravisain-sticky-top-mobile': isSticky && stickyOffsetMobile !== undefined && stickyOffsetMobile !== '' ? `${ stickyOffsetMobile }px` : undefined,

			// Horizontal Alignment Variables
			'--gravisain-col-align': horizontalAlignment || undefined,
			'--gravisain-col-align-tablet': horizontalAlignmentTablet || undefined,
			'--gravisain-col-align-mobile': horizontalAlignmentMobile || undefined,

			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
