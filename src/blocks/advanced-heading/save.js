import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		headingTag,
		textAlign,
		textAlignTablet,
		textAlignMobile,
		eyebrow,
		eyebrowPosition,
		content,
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
		showDivider,
		dividerWidth,
		dividerHeight,
		dividerColor,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		maxWidth,
		breakoutPadding,
		anchor,
		customClassName,
		customCSS,
		fontFamily,
	} = attributes;

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
			'gravisain-advanced-heading',
			`has-text-align-${ textAlign || 'left' }`,
			textAlignTablet ? `has-tablet-text-align-${ textAlignTablet }` : '',
			textAlignMobile ? `has-mobile-text-align-${ textAlignMobile }` : '',
			breakoutPadding ? 'has-breakout-padding' : '',
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
			maxWidth: maxWidth && maxWidth !== '100%' ? maxWidth : undefined,
			...parseCustomCSS( customCSS ),
		},
	} );

	const TagName = headingTag || 'h2';

	const getSolidColor = (c) => (c && c.includes('gradient')) ? undefined : c;

	const headingStyle = {
		textAlign: textAlign || 'left',
		fontWeight: fontWeight || '800',
		textTransform: textTransform || 'none',
		color: enableTextGradient ? 'transparent' : getSolidColor(textColor) || '#0f172a',
		'--gravisain-highlight-color': getSolidColor(highlightColor) || '#2563eb',
		backgroundImage: enableTextGradient ? textGradient : 'none',
		WebkitBackgroundClip: enableTextGradient ? 'text' : 'border-box',
		backgroundClip: enableTextGradient ? 'text' : 'border-box',
	};

	return (
		<div { ...blockProps }>
			{ eyebrow && eyebrowPosition === 'above' && (
				<RichText.Content
					tagName="span"
					className="gravisain-heading-eyebrow"
					value={ eyebrow }
				/>
			) }

			<RichText.Content
				tagName={ TagName }
				className="gravisain-heading-title"
				style={ headingStyle }
				value={ content }
			/>

			{ eyebrow && eyebrowPosition === 'below' && (
				<RichText.Content
					tagName="span"
					className="gravisain-heading-eyebrow below"
					value={ eyebrow }
				/>
			) }

			{ showDivider && (
				<div
					className="gravisain-heading-divider"
					style={ {
						width: `${ dividerWidth }px`,
						height: `${ dividerHeight }px`,
						backgroundColor: dividerColor,
						marginLeft: textAlign === 'center' || textAlign === 'right' ? 'auto' : 0,
						marginRight: textAlign === 'center' ? 'auto' : 0,
					} }
				/>
			) }
		</div>
	);
}
