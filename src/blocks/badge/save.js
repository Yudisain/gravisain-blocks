import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

const cleanFontFamily = ( fam ) => {
	if ( ! fam || fam === 'inherit' || fam === 'default' ) return undefined;
	if ( fam.includes( ',' ) ) return fam;
	return `'${ fam }', sans-serif`;
};

const getSpacing = ( spacing, side ) => {
	if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
	if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
		return typeof spacing === 'number' ? `${ spacing }px` : spacing;
	}
	const val = spacing[ side ];
	if ( typeof val === 'number' ) return `${ val }px`;
	return val || undefined;
};

const getTypographyVar = ( val, isSpacing = false ) => {
	if ( val === undefined || val === null || val === '' ) return undefined;
	if ( typeof val === 'number' ) return isSpacing ? `${ val }px` : String( val );
	if ( typeof val === 'string' ) {
		if ( isSpacing && ! isNaN( val ) ) return `${ val }px`;
		return val;
	}
	return val;
};

export default function save( { attributes } ) {
	const {
		text = '',
		showDot = true,
		dotColor = '#10b981',
		dotPulse = true,
		dotPulseSpeed = 1.8,
		dotSize = 8,
		link = '',
		linkTarget = '_self',
		alignment = 'left',
		alignmentTablet = '',
		alignmentMobile = '',
		fontFamily = '',
		fontSize = 13,
		fontSizeTablet,
		fontSizeMobile,
		fontWeight = '600',
		fontStyle = 'normal',
		lineHeight = '1.4',
		letterSpacing = '0px',
		textColor = '#1e293b',
		backgroundColor = '#ffffff',
		borderWidth = 1,
		borderColor = 'rgba(226, 232, 240, 0.9)',
		borderStyle = 'solid',
		borderRadius = 9999,
		hasShadow = true,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const getFlexJustify = ( align ) => {
		if ( align === 'center' ) return 'center';
		if ( align === 'right' ) return 'flex-end';
		return 'flex-start';
	};

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-badge-wrapper',
			`align-${ alignment || 'left' }`,
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-badge-justify': getFlexJustify( alignment ),
			'--gravisain-badge-justify-tablet': alignmentTablet ? getFlexJustify( alignmentTablet ) : undefined,
			'--gravisain-badge-justify-mobile': alignmentMobile ? getFlexJustify( alignmentMobile ) : undefined,
			'--gravisain-badge-mt': getSpacing( margin, 'top' ),
			'--gravisain-badge-mr': getSpacing( margin, 'right' ),
			'--gravisain-badge-mb': getSpacing( margin, 'bottom' ),
			'--gravisain-badge-ml': getSpacing( margin, 'left' ),
			'--gravisain-badge-mt-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-badge-mr-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-badge-mb-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-badge-ml-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-badge-mt-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-badge-mr-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-badge-mb-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-badge-ml-mobile': getSpacing( marginMobile, 'left' ),
			marginTop: getSpacing( margin, 'top' ),
			marginRight: getSpacing( margin, 'right' ),
			marginBottom: getSpacing( margin, 'bottom' ),
			marginLeft: getSpacing( margin, 'left' ),
			...parseCustomCSS( customCSS ),
		},
	} );

	const pillStyle = {
		fontFamily: cleanFontFamily( fontFamily ),
		fontSize: fontSize ? `${ fontSize }px` : undefined,
		fontWeight: fontWeight || '600',
		fontStyle: fontStyle !== 'normal' ? fontStyle : undefined,
		lineHeight: lineHeight || '1.4',
		letterSpacing: getTypographyVar( letterSpacing, true ),
		color: textColor || '#1e293b',
		backgroundColor: backgroundColor || '#ffffff',
		borderWidth: borderWidth ? `${ borderWidth }px` : 0,
		borderStyle: borderWidth ? borderStyle : 'none',
		borderColor: borderWidth ? borderColor : 'transparent',
		borderRadius: `${ borderRadius !== undefined ? borderRadius : 9999 }px`,
		boxShadow: hasShadow
			? '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)'
			: 'none',
		paddingTop: getSpacing( padding, 'top' ) || '6px',
		paddingRight: getSpacing( padding, 'right' ) || '16px',
		paddingBottom: getSpacing( padding, 'bottom' ) || '6px',
		paddingLeft: getSpacing( padding, 'left' ) || '12px',
		'--gravisain-badge-pt': getSpacing( padding, 'top' ) || '6px',
		'--gravisain-badge-pr': getSpacing( padding, 'right' ) || '16px',
		'--gravisain-badge-pb': getSpacing( padding, 'bottom' ) || '6px',
		'--gravisain-badge-pl': getSpacing( padding, 'left' ) || '12px',
		'--gravisain-badge-pt-tablet': getSpacing( paddingTablet, 'top' ),
		'--gravisain-badge-pr-tablet': getSpacing( paddingTablet, 'right' ),
		'--gravisain-badge-pb-tablet': getSpacing( paddingTablet, 'bottom' ),
		'--gravisain-badge-pl-tablet': getSpacing( paddingTablet, 'left' ),
		'--gravisain-badge-pt-mobile': getSpacing( paddingMobile, 'top' ),
		'--gravisain-badge-pr-mobile': getSpacing( paddingMobile, 'right' ),
		'--gravisain-badge-pb-mobile': getSpacing( paddingMobile, 'bottom' ),
		'--gravisain-badge-pl-mobile': getSpacing( paddingMobile, 'left' ),
		'--gravisain-badge-fs-tablet': getTypographyVar( fontSizeTablet, true ),
		'--gravisain-badge-fs-mobile': getTypographyVar( fontSizeMobile, true ),
		'--badge-dot-color': dotColor || '#10b981',
		'--badge-dot-size': `${ dotSize || 8 }px`,
		'--badge-dot-speed': `${ dotPulseSpeed || 1.8 }s`,
	};

	const PillTag = link ? 'a' : 'div';
	const linkProps = link ? {
		href: link,
		target: linkTarget || '_self',
		rel: linkTarget === '_blank' ? 'noopener noreferrer' : undefined,
	} : {};

	return (
		<div { ...blockProps }>
			<PillTag
				className={ `gravisain-badge-pill ${ hasShadow ? 'has-shadow' : '' } ${ link ? 'is-link' : '' }` }
				style={ pillStyle }
				{ ...linkProps }
			>
				{ showDot && (
					<span className={ `gravisain-badge-dot-wrapper ${ dotPulse ? 'is-pulsing' : '' }` }>
						{ dotPulse && <span className="gravisain-badge-dot-ping" /> }
						<span className="gravisain-badge-dot" />
					</span>
				) }
				<RichText.Content
					tagName="span"
					className="gravisain-badge-text"
					value={ text }
				/>
			</PillTag>
		</div>
	);
}
