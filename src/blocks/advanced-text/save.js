import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		htmlTag,
		content,
		textAlign,
		textAlignTablet,
		textAlignMobile,
		fontSize,
		fontSizeTablet,
		fontSizeMobile,
		fontWeight,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		letterSpacing,
		letterSpacingTablet,
		letterSpacingMobile,
		textTransform,
		textColor,
		highlightColor,
		enableTextGradient,
		textGradient,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		anchor,
		customClassName,
		fontFamily,
	} = attributes;

	const getSpacing = ( spacing, side ) => {
		if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
		if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
			return typeof spacing === 'number' ? `${spacing}px` : spacing;
		}
		const val = spacing[ side ];
		if ( typeof val === 'number' ) return `${val}px`;
		return val || undefined;
	};

	const getTypographyVar = (val, isSpacing = false) => {
		if ( val === undefined || val === null || val === '' ) return undefined;
		if ( typeof val === 'number' ) return isSpacing ? `${val}px` : String(val);
		if ( typeof val === 'string' ) {
			if ( isSpacing && !isNaN(val) ) return `${val}px`;
			return val;
		}
		return val;
	};

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-advanced-text',
			`has-text-align-${ textAlign || 'left' }`,
			textAlignTablet ? `has-tablet-text-align-${ textAlignTablet }` : '',
			textAlignMobile ? `has-mobile-text-align-${ textAlignMobile }` : '',
			customClassName || '',
		]
			.filter( Boolean )
			.join( ' ' ),
		style: {
			'--gravisain-padding-top': getSpacing( padding, 'top' ),
			'--gravisain-padding-right': getSpacing( padding, 'right' ),
			'--gravisain-padding-bottom': getSpacing( padding, 'bottom' ),
			'--gravisain-padding-left': getSpacing( padding, 'left' ),
			'--gravisain-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-margin-left': getSpacing( margin, 'left' ),
			'--gravisain-padding-top-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-padding-right-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-padding-bottom-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-padding-left-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-margin-left-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-padding-top-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-padding-right-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-padding-bottom-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-padding-left-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-margin-left-mobile': getSpacing( marginMobile, 'left' ),
			'--gravisain-ff': fontFamily ? `'${fontFamily}'` : undefined,
			'--gravisain-fs': getTypographyVar(fontSize, true),
			'--gravisain-fs-tablet': getTypographyVar(fontSizeTablet, true),
			'--gravisain-fs-mobile': getTypographyVar(fontSizeMobile, true),
			'--gravisain-lh': getTypographyVar(lineHeight, false),
			'--gravisain-lh-tablet': getTypographyVar(lineHeightTablet, false),
			'--gravisain-lh-mobile': getTypographyVar(lineHeightMobile, false),
			'--gravisain-ls': getTypographyVar(letterSpacing, true),
			'--gravisain-ls-tablet': getTypographyVar(letterSpacingTablet, true),
			'--gravisain-ls-mobile': getTypographyVar(letterSpacingMobile, true),
		},
	} );

	const TagName = htmlTag || 'p';

	const getSolidColor = (c) => (c && c.includes('gradient')) ? undefined : c;

	const textStyle = {
		textAlign: textAlign || 'left',
		fontWeight: fontWeight || '400',
		textTransform: textTransform || 'none',
		color: enableTextGradient ? 'transparent' : getSolidColor(textColor) || '#334155',
		'--gravisain-highlight-color': getSolidColor(highlightColor) || '#2563eb',
		backgroundImage: enableTextGradient ? textGradient : 'none',
		WebkitBackgroundClip: enableTextGradient ? 'text' : 'border-box',
		backgroundClip: enableTextGradient ? 'text' : 'border-box',
	};

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName={ TagName }
				className="gravisain-text-content"
				style={ textStyle }
				value={ content }
			/>
		</div>
	);
}
