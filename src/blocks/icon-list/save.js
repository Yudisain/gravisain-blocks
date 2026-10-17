import { useBlockProps, RichText } from '@wordpress/block-editor';
import { getIconMarkup } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';

const cleanFontFamily = ( fam ) => {
	if ( ! fam || fam === 'inherit' || fam === 'default' ) return undefined;
	if ( fam.includes( ',' ) ) return fam;
	return `'${ fam }', sans-serif`;
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
		items = [],
		layout,
		alignment = 'left',
		alignmentTablet = '',
		alignmentMobile = '',
		itemGap = 12,
		defaultIcon = 'check',
		iconSize = 20,
		iconColor = '#10b981',
		iconBackground = '',
		iconPadding = 0,
		iconRadius = 0,
		textColor,
		fontFamily,
		fontWeight,
		fontStyle = 'normal',
		fontSize = 16,
		fontSizeTablet,
		fontSizeMobile,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		letterSpacing,
		letterSpacingTablet,
		letterSpacingMobile,
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

	const getSpacing = ( spacing, side ) => {
		if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
		if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
			return typeof spacing === 'number' ? `${ spacing }px` : spacing;
		}
		const val = spacing[ side ];
		if ( typeof val === 'number' ) return `${ val }px`;
		return val || undefined;
	};

	const getFlexAlign = ( align ) => {
		if ( align === 'center' ) return 'center';
		if ( align === 'right' ) return 'flex-end';
		return 'flex-start';
	};

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-icon-list',
			`layout-${ layout || 'vertical' }`,
			`align-${ alignment || 'left' }`,
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-list-gap': `${ itemGap }px`,
			'--gravisain-list-icon-size': `${ iconSize }px`,
			'--gravisain-list-icon-color': iconColor || '#10b981',
			'--gravisain-list-icon-bg': iconBackground || 'transparent',
			'--gravisain-list-icon-padding': `${ iconPadding || 0 }px`,
			'--gravisain-list-icon-radius': `${ iconRadius || 0 }px`,
			'--gravisain-list-font-family': cleanFontFamily( fontFamily ),
			'--gravisain-list-font-weight': fontWeight || undefined,
			'--gravisain-list-font-style': fontStyle && fontStyle !== 'normal' ? fontStyle : undefined,
			'--gravisain-list-font-size': fontSize ? `${ fontSize }px` : undefined,
			'--gravisain-list-line-height': getTypographyVar( lineHeight, false ),
			'--gravisain-list-letter-spacing': getTypographyVar( letterSpacing, true ),
			'--gravisain-list-font-size-tablet': getTypographyVar( fontSizeTablet, true ),
			'--gravisain-list-font-size-mobile': getTypographyVar( fontSizeMobile, true ),
			'--gravisain-list-line-height-tablet': getTypographyVar( lineHeightTablet, false ),
			'--gravisain-list-line-height-mobile': getTypographyVar( lineHeightMobile, false ),
			'--gravisain-list-letter-spacing-tablet': getTypographyVar( letterSpacingTablet, true ),
			'--gravisain-list-letter-spacing-mobile': getTypographyVar( letterSpacingMobile, true ),
			'--gravisain-list-justify': getFlexAlign( alignment ),
			'--gravisain-list-align': getFlexAlign( alignment ),
			'--gravisain-list-text-align': alignment || 'left',
			'--gravisain-list-justify-tablet': alignmentTablet ? getFlexAlign( alignmentTablet ) : undefined,
			'--gravisain-list-align-tablet': alignmentTablet ? getFlexAlign( alignmentTablet ) : undefined,
			'--gravisain-list-justify-mobile': alignmentMobile ? getFlexAlign( alignmentMobile ) : undefined,
			'--gravisain-list-align-mobile': alignmentMobile ? getFlexAlign( alignmentMobile ) : undefined,
			paddingTop: getSpacing( padding, 'top' ),
			paddingRight: getSpacing( padding, 'right' ),
			paddingBottom: getSpacing( padding, 'bottom' ),
			paddingLeft: getSpacing( padding, 'left' ),
			marginTop: getSpacing( margin, 'top' ),
			marginRight: getSpacing( margin, 'right' ),
			marginBottom: getSpacing( margin, 'bottom' ),
			marginLeft: getSpacing( margin, 'left' ),
			'--gravisain-icon-list-padding-top': getSpacing( padding, 'top' ),
			'--gravisain-icon-list-padding-right': getSpacing( padding, 'right' ),
			'--gravisain-icon-list-padding-bottom': getSpacing( padding, 'bottom' ),
			'--gravisain-icon-list-padding-left': getSpacing( padding, 'left' ),
			'--gravisain-icon-list-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-icon-list-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-icon-list-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-icon-list-margin-left': getSpacing( margin, 'left' ),
			'--gravisain-icon-list-padding-top-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-icon-list-padding-right-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-icon-list-padding-bottom-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-icon-list-padding-left-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-icon-list-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-icon-list-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-icon-list-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-icon-list-margin-left-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-icon-list-padding-top-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-icon-list-padding-right-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-icon-list-padding-bottom-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-icon-list-padding-left-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-icon-list-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-icon-list-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-icon-list-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-icon-list-margin-left-mobile': getSpacing( marginMobile, 'left' ),
			color: textColor || undefined,
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<div { ...blockProps }>
			<ul className="gravisain-icon-list-items">
				{ items.map( ( item, index ) => {
					const activeIcon = item.icon || defaultIcon || 'check';
					const iconData = getIconMarkup( activeIcon, defaultIcon || 'check' );

					const itemStyle = {};
					if ( item.color ) {
						itemStyle.color = item.color;
					}
					if ( item.background ) {
						itemStyle.background = item.background;
					}

					const isImg = iconData && iconData.type === 'image';
					return (
						<li key={ item.id || index } className="gravisain-icon-list-item">
							<span
								className="gravisain-list-icon"
								style={ Object.keys( itemStyle ).length > 0 ? itemStyle : undefined }
								dangerouslySetInnerHTML={ ! isImg && iconData?.content ? { __html: iconData.content } : undefined }
							>
								{ isImg && <img src={ iconData.src } alt="" /> }
							</span>
							<RichText.Content tagName="span" className="gravisain-list-text" value={ item.text } />
						</li>
					);
				} ) }
			</ul>
		</div>
	);
}
