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
		backgroundColor,
		textColor,
		backgroundImage,
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
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-column',
			verticalAlignment ? `is-vertically-aligned-${ verticalAlignment }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			flexBasis: width ? `calc(${ width } - var(--gravisain-gap-compensation, 0px) - 0.1px)` : undefined,
			flexGrow: width ? 0 : 1,
			flexShrink: 0,
			boxSizing: 'border-box',
			backgroundColor: backgroundColor || undefined,
			color: textColor || undefined,
			backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined,
			backgroundSize: backgroundImage ? 'cover' : undefined,
			backgroundPosition: backgroundImage ? 'center' : undefined,

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
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
