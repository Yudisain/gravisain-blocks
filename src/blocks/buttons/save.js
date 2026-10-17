import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const { 
		layout = 'horizontal', 
		layoutTablet = '',
		layoutMobile = '',
		justifyContent = 'flex-start', 
		justifyContentTablet = '',
		justifyContentMobile = '',
		gap = 16, 
		gapTablet,
		gapMobile,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		anchor, 
		customClassName, 
		customCSS 
	} = attributes;

	const getSpacing = ( spacing, side ) => {
		if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
		if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
			return typeof spacing === 'number' ? `${ spacing }px` : spacing;
		}
		const val = spacing[ side ];
		if ( typeof val === 'number' ) return `${ val }px`;
		return val || undefined;
	};

	const layoutClasses = [
		`is-layout-${layout || 'horizontal'}`,
		layoutTablet ? `is-layout-tablet-${layoutTablet}` : '',
		layoutMobile ? `is-layout-mobile-${layoutMobile}` : '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-buttons-wrapper ${layoutClasses} ${customClassName || ''}`.trim(),
		style: {
			'--buttons-justify': justifyContent || 'flex-start',
			'--buttons-gap': `${gap !== undefined ? gap : 16}px`,
			'--buttons-justify-tablet': justifyContentTablet || undefined,
			'--buttons-gap-tablet': gapTablet !== undefined && gapTablet !== '' ? `${gapTablet}px` : undefined,
			'--buttons-justify-mobile': justifyContentMobile || undefined,
			'--buttons-gap-mobile': gapMobile !== undefined && gapMobile !== '' ? `${gapMobile}px` : undefined,
			paddingTop: getSpacing( padding, 'top' ),
			paddingRight: getSpacing( padding, 'right' ),
			paddingBottom: getSpacing( padding, 'bottom' ),
			paddingLeft: getSpacing( padding, 'left' ),
			marginTop: getSpacing( margin, 'top' ),
			marginRight: getSpacing( margin, 'right' ),
			marginBottom: getSpacing( margin, 'bottom' ),
			marginLeft: getSpacing( margin, 'left' ),
			'--gravisain-buttons-padding-top': getSpacing( padding, 'top' ),
			'--gravisain-buttons-padding-right': getSpacing( padding, 'right' ),
			'--gravisain-buttons-padding-bottom': getSpacing( padding, 'bottom' ),
			'--gravisain-buttons-padding-left': getSpacing( padding, 'left' ),
			'--gravisain-buttons-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-buttons-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-buttons-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-buttons-margin-left': getSpacing( margin, 'left' ),
			'--gravisain-buttons-padding-top-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-buttons-padding-right-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-buttons-padding-bottom-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-buttons-padding-left-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-buttons-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-buttons-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-buttons-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-buttons-margin-left-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-buttons-padding-top-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-buttons-padding-right-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-buttons-padding-bottom-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-buttons-padding-left-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-buttons-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-buttons-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-buttons-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-buttons-margin-left-mobile': getSpacing( marginMobile, 'left' ),
			justifyContent: justifyContent,
			gap: `${gap !== undefined ? gap : 16}px`,
			...parseCustomCSS( customCSS )
		}
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
