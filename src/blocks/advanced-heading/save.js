import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';
import { renderDividerGraphic } from './components/dividerShapes';

export default function save( { attributes } ) {
	const {
		headingTag,
		textAlign,
		textAlignTablet,
		textAlignMobile,
		eyebrow,
		eyebrowPosition,
		eyebrowColor,
		eyebrowTypography = {},
		eyebrowTypographyTablet = {},
		eyebrowTypographyMobile = {},
		content,
		titleColor,
		titleTypography = {},
		titleTypographyTablet = {},
		titleTypographyMobile = {},
		description,
		descriptionColor,
		descriptionTypography = {},
		descriptionTypographyTablet = {},
		descriptionTypographyMobile = {},
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
		dividerStyle,
		dividerFlip,
		dividerSpacing,
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

	const getHeadingTypographyVars = ( prefix, obj = {} ) => {
		if ( ! obj || typeof obj !== 'object' || Object.keys( obj ).length === 0 ) return {};
		return {
			[`--gravisain-heading-${prefix}-ff`]: obj.fontFamily ? `'${obj.fontFamily}'` : undefined,
			[`--gravisain-heading-${prefix}-fs`]: getTypographyVar( obj.fontSize, true ),
			[`--gravisain-heading-${prefix}-fw`]: obj.fontWeight ? String( obj.fontWeight ) : undefined,
			[`--gravisain-heading-${prefix}-lh`]: getTypographyVar( obj.lineHeight, false ),
			[`--gravisain-heading-${prefix}-ls`]: getTypographyVar( obj.letterSpacing, true ),
		};
	};

	const getSolidColor = (c) => (c && c.includes('gradient')) ? undefined : c;

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

			// Eyebrow
			'--gravisain-heading-eyebrow-color': eyebrowColor ? getSolidColor( eyebrowColor ) : undefined,
			...getHeadingTypographyVars( 'eyebrow', eyebrowTypography ),
			...getHeadingTypographyVars( 'eyebrow-tablet', eyebrowTypographyTablet ),
			...getHeadingTypographyVars( 'eyebrow-mobile', eyebrowTypographyMobile ),

			// Title
			'--gravisain-heading-title-color': titleColor ? getSolidColor( titleColor ) : undefined,
			...getHeadingTypographyVars( 'title', titleTypography ),
			...getHeadingTypographyVars( 'title-tablet', titleTypographyTablet ),
			...getHeadingTypographyVars( 'title-mobile', titleTypographyMobile ),

			// Description
			'--gravisain-heading-desc-color': descriptionColor ? getSolidColor( descriptionColor ) : undefined,
			...getHeadingTypographyVars( 'desc', descriptionTypography ),
			...getHeadingTypographyVars( 'desc-tablet', descriptionTypographyTablet ),
			...getHeadingTypographyVars( 'desc-mobile', descriptionTypographyMobile ),

			// Legacy fallbacks
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

	const headingStyle = {
		textAlign: textAlign || 'left',
		fontWeight: fontWeight || '800',
		textTransform: textTransform || 'none',
		color: enableTextGradient ? 'transparent' : getSolidColor( titleColor || textColor ) || '#0f172a',
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

			{ showDivider && ( () => {
				const style = dividerStyle || 'solid';
				const width = dividerWidth || 48;
				const height = dividerHeight || 4;
				const color = dividerColor || '#2563eb';
				const marginLeft = textAlign === 'center' || textAlign === 'right' ? 'auto' : 0;
				const marginRight = textAlign === 'center' ? 'auto' : 0;
				const hasCustomMargin = dividerSpacing !== undefined && dividerSpacing !== 14;

				if ( style === 'solid' ) {
					return (
						<div
							className="gravisain-heading-divider"
							style={ {
								width: `${ width }px`,
								height: `${ height }px`,
								background: color,
								marginLeft,
								marginRight,
								...( hasCustomMargin ? { marginTop: `${ dividerSpacing }px` } : {} ),
							} }
						/>
					);
				}

				if ( style === 'double' ) {
					const borderThickness = Math.max( 1, Math.floor( height / 3 ) );
					return (
						<div
							className="gravisain-heading-divider is-style-double"
							style={ {
								width: `${ width }px`,
								height: `${ height }px`,
								borderTop: `${ borderThickness }px solid ${ color }`,
								borderBottom: `${ borderThickness }px solid ${ color }`,
								background: 'transparent',
								marginLeft,
								marginRight,
								...( hasCustomMargin ? { marginTop: `${ dividerSpacing }px` } : {} ),
							} }
						/>
					);
				}

				if ( style === 'dotted' ) {
					return (
						<div
							className="gravisain-heading-divider is-style-dotted"
							style={ {
								width: `${ width }px`,
								height: '0px',
								borderTop: `${ height }px dotted ${ color }`,
								background: 'transparent',
								marginLeft,
								marginRight,
								...( hasCustomMargin ? { marginTop: `${ dividerSpacing }px` } : {} ),
							} }
						/>
					);
				}

				if ( style === 'dashed' ) {
					return (
						<div
							className="gravisain-heading-divider is-style-dashed"
							style={ {
								width: `${ width }px`,
								height: '0px',
								borderTop: `${ height }px dashed ${ color }`,
								background: 'transparent',
								marginLeft,
								marginRight,
								...( hasCustomMargin ? { marginTop: `${ dividerSpacing }px` } : {} ),
							} }
						/>
					);
				}

				return (
					<div
						className={ `gravisain-heading-divider is-style-${ style }` }
						style={ {
							width: `${ width }px`,
							height: `${ height }px`,
							background: 'transparent',
							lineHeight: 0,
							marginLeft,
							marginRight,
							...( hasCustomMargin ? { marginTop: `${ dividerSpacing }px` } : {} ),
						} }
					>
						{ renderDividerGraphic( {
							styleKey: style,
							color,
							height,
							flip: dividerFlip,
						} ) }
					</div>
				);
			} )() }

			{ description && (
				<RichText.Content
					tagName="p"
					className="gravisain-heading-description"
					value={ description }
				/>
			) }
		</div>
	);
}
