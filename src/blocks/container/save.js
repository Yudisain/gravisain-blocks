import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
		maxWidth,
		minHeight,
		minHeightUnit,
		contentAlign,
		overflow,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		isSticky,
		stickyDesktop,
		stickyTablet,
		stickyMobile,
		stickyOffset,
		stickyOffsetTablet,
		stickyOffsetMobile,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: [
			'gravisain-block-container',
			isSticky ? 'is-sticky' : '',
			isSticky && stickyDesktop === false ? 'sticky-disable-desktop' : '',
			isSticky && stickyTablet === false ? 'sticky-disable-tablet' : '',
			isSticky && ( stickyMobile === false || stickyMobile === undefined ) ? 'sticky-disable-mobile' : '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--container-max-width': maxWidth || '1200px',
			'--container-min-height': minHeight > 0 ? `${ minHeight }${ minHeightUnit || 'px' }` : 'auto',
			'--container-align': contentAlign || 'flex-start',
			'--container-overflow': overflow || 'visible',

			// Desktop Spacing
			'--gravisain-container-pt': getSpacing( padding, 'top' ),
			'--gravisain-container-pr': getSpacing( padding, 'right' ),
			'--gravisain-container-pb': getSpacing( padding, 'bottom' ),
			'--gravisain-container-pl': getSpacing( padding, 'left' ),
			'--gravisain-container-mt': getSpacing( margin, 'top' ),
			'--gravisain-container-mr': getSpacing( margin, 'right' ),
			'--gravisain-container-mb': getSpacing( margin, 'bottom' ),
			'--gravisain-container-ml': getSpacing( margin, 'left' ),

			// Tablet Spacing
			'--gravisain-container-pt-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-container-pr-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-container-pb-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-container-pl-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-container-mt-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-container-mr-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-container-mb-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-container-ml-tablet': getSpacing( marginTablet, 'left' ),

			// Mobile Spacing
			'--gravisain-container-pt-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-container-pr-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-container-pb-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-container-pl-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-container-mt-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-container-mr-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-container-mb-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-container-ml-mobile': getSpacing( marginMobile, 'left' ),

			// Sticky Variables
			'--gravisain-sticky-top': isSticky && stickyOffset !== undefined ? `${ stickyOffset }px` : undefined,
			'--gravisain-sticky-top-tablet': isSticky && stickyOffsetTablet !== undefined && stickyOffsetTablet !== '' ? `${ stickyOffsetTablet }px` : undefined,
			'--gravisain-sticky-top-mobile': isSticky && stickyOffsetMobile !== undefined && stickyOffsetMobile !== '' ? `${ stickyOffsetMobile }px` : undefined,
		},
	} );

	return (
		<section { ...blockProps }>
			<div className="gravisain-container-inner">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
