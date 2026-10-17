import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	RichText,
} from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';
import useGoogleFont from '../../controls/useGoogleFont';
import Inspector from './components/Inspector';
import { renderDividerGraphic } from './components/dividerShapes';

export default function Edit( { attributes, setAttributes, clientId } ) {
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

	const [ device, setDevice ] = useState( 'desktop' );

	useGoogleFont( titleTypography?.fontFamily || fontFamily );
	useGoogleFont( titleTypographyTablet?.fontFamily );
	useGoogleFont( titleTypographyMobile?.fontFamily );
	useGoogleFont( eyebrowTypography?.fontFamily );
	useGoogleFont( eyebrowTypographyTablet?.fontFamily );
	useGoogleFont( eyebrowTypographyMobile?.fontFamily );
	useGoogleFont( descriptionTypography?.fontFamily );
	useGoogleFont( descriptionTypographyTablet?.fontFamily );
	useGoogleFont( descriptionTypographyMobile?.fontFamily );

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const { __experimentalSetPreviewDeviceType: setPostDeviceType } =
		useDispatch( 'core/edit-post' ) || {};
	const { __experimentalSetPreviewDeviceType: setSiteDeviceType } =
		useDispatch( 'core/edit-site' ) || {};
	const { setDeviceType } = useDispatch( 'core/editor' ) || {};

	const handleDeviceChange = ( newDev ) => {
		setDevice( newDev );
		const capitalizedDevice =
			newDev === 'tablet'
				? 'Tablet'
				: newDev === 'mobile'
				? 'Mobile'
				: 'Desktop';

		if ( setDeviceType ) {
			setDeviceType( capitalizedDevice );
		}
		if ( setPostDeviceType ) {
			setPostDeviceType( capitalizedDevice );
		}
		if ( setSiteDeviceType ) {
			setSiteDeviceType( capitalizedDevice );
		}
	};

	useEffect( () => {
		if ( previewDeviceType === 'Tablet' && device !== 'tablet' ) {
			setDevice( 'tablet' );
		} else if ( previewDeviceType === 'Mobile' && device !== 'mobile' ) {
			setDevice( 'mobile' );
		} else if ( previewDeviceType === 'Desktop' && device !== 'desktop' ) {
			setDevice( 'desktop' );
		}
	}, [ previewDeviceType ] );

	const currentTextAlign =
		device === 'tablet' && textAlignTablet
			? textAlignTablet
			: device === 'mobile' && textAlignMobile
			? textAlignMobile
			: textAlign || 'left';

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

	const getSolidColor = ( c ) => ( c && typeof c === 'string' && c.includes( 'gradient' ) ? undefined : c );

	const blockRef = useRef( null );

	const getActiveSpacing = ( side ) => {
		if ( device === 'mobile' ) {
			const mob = getSpacing( marginMobile, side );
			if ( mob !== undefined ) return mob;
			const tab = getSpacing( marginTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( margin, side );
		}
		if ( device === 'tablet' ) {
			const tab = getSpacing( marginTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( margin, side );
		}
		return getSpacing( margin, side );
	};

	const getActivePadding = ( side ) => {
		if ( device === 'mobile' ) {
			const mob = getSpacing( paddingMobile, side );
			if ( mob !== undefined ) return mob;
			const tab = getSpacing( paddingTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( padding, side );
		}
		if ( device === 'tablet' ) {
			const tab = getSpacing( paddingTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( padding, side );
		}
		return getSpacing( padding, side );
	};

	const activeMarginTop = getActiveSpacing( 'top' );
	const activeMarginBottom = getActiveSpacing( 'bottom' );
	const activeMarginLeft = getActiveSpacing( 'left' );
	const activeMarginRight = getActiveSpacing( 'right' );

	const activePaddingTop = getActivePadding( 'top' );
	const activePaddingBottom = getActivePadding( 'bottom' );
	const activePaddingLeft = getActivePadding( 'left' );
	const activePaddingRight = getActivePadding( 'right' );

	useEffect( () => {
		if ( ! blockRef.current ) return;
		const el = blockRef.current;
		const wrapper = el.closest( '.wp-block' ) || el;

		const applyProp = ( node, prop, val ) => {
			if ( val !== undefined && val !== null && val !== '' ) {
				const finalVal = typeof val === 'number' ? `${val}px` : ( ! isNaN( val ) && String( val ).trim() !== '' ? `${val}px` : String( val ) );
				node.style.setProperty( prop, finalVal, 'important' );
			} else {
				node.style.removeProperty( prop );
			}
		};

		[ el, wrapper ].forEach( ( node ) => {
			applyProp( node, 'padding-top', activePaddingTop );
			applyProp( node, 'padding-bottom', activePaddingBottom );
			applyProp( node, 'padding-left', activePaddingLeft );
			applyProp( node, 'padding-right', activePaddingRight );

			applyProp( node, 'margin-top', activeMarginTop );
			applyProp( node, 'margin-block-start', activeMarginTop );
			applyProp( node, 'margin-bottom', activeMarginBottom );
			applyProp( node, 'margin-block-end', activeMarginBottom );
			applyProp( node, 'margin-left', activeMarginLeft );
			applyProp( node, 'margin-right', activeMarginRight );
		} );
	}, [ activeMarginTop, activeMarginBottom, activeMarginLeft, activeMarginRight, activePaddingTop, activePaddingBottom, activePaddingLeft, activePaddingRight ] );

	const getHeadingTypographyVars = ( prefix, obj = {}, fallbackObj = {} ) => {
		const ff = obj.fontFamily || fallbackObj.fontFamily;
		const fs = obj.fontSize !== undefined ? obj.fontSize : fallbackObj.fontSize;
		const fw = obj.fontWeight || fallbackObj.fontWeight;
		const lh = obj.lineHeight !== undefined ? obj.lineHeight : fallbackObj.lineHeight;
		const ls = obj.letterSpacing !== undefined ? obj.letterSpacing : fallbackObj.letterSpacing;

		return {
			[`--gravisain-heading-${prefix}-ff`]: ff ? `'${ff}'` : undefined,
			[`--gravisain-heading-${prefix}-fs`]: getTypographyVar( fs, true ),
			[`--gravisain-heading-${prefix}-fw`]: fw ? String(fw) : undefined,
			[`--gravisain-heading-${prefix}-lh`]: getTypographyVar( lh, false ),
			[`--gravisain-heading-${prefix}-ls`]: getTypographyVar( ls, true ),
		};
	};

	let blockProps = useBlockProps( {
		ref: blockRef,
		id: anchor || undefined,
		className: [
			'gravisain-advanced-heading',
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
			'--gravisain-heading-eyebrow-color': getSolidColor( eyebrowColor ) || undefined,
			...getHeadingTypographyVars( 'eyebrow', eyebrowTypography ),
			...getHeadingTypographyVars( 'eyebrow-tablet', eyebrowTypographyTablet ),
			...getHeadingTypographyVars( 'eyebrow-mobile', eyebrowTypographyMobile ),

			// Title
			'--gravisain-heading-title-color': getSolidColor( titleColor || textColor ) || undefined,
			...getHeadingTypographyVars( 'title', titleTypography, { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } ),
			...getHeadingTypographyVars( 'title-tablet', titleTypographyTablet, { fontSize: fontSizeTablet, lineHeight: lineHeightTablet, letterSpacing: letterSpacingTablet } ),
			...getHeadingTypographyVars( 'title-mobile', titleTypographyMobile, { fontSize: fontSizeMobile, lineHeight: lineHeightMobile, letterSpacing: letterSpacingMobile } ),

			// Description
			'--gravisain-heading-desc-color': getSolidColor( descriptionColor ) || undefined,
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
			maxWidth: maxWidth || 'none',
			...parseCustomCSS( customCSS ),
		},
	} );

	// Force strip any core text-alignment classes that conflict with our current responsive state
	if ( blockProps.className ) {
		blockProps.className = blockProps.className
			.split( ' ' )
			.filter( ( c ) => ! c.startsWith( 'has-text-align-' ) )
			.join( ' ' )
			.trim() + ` has-text-align-${ currentTextAlign }`;
	}

	const TagName = headingTag || 'h2';

	const isMobile = device === 'mobile' || previewDeviceType === 'Mobile';
	const isTablet = device === 'tablet' || previewDeviceType === 'Tablet';

	const getDeviceProp = ( desktopVal, tabletVal, mobileVal ) => {
		if ( isMobile ) {
			if ( mobileVal !== undefined && mobileVal !== null && mobileVal !== '' ) return mobileVal;
			if ( tabletVal !== undefined && tabletVal !== null && tabletVal !== '' ) return tabletVal;
			return desktopVal;
		}
		if ( isTablet ) {
			if ( tabletVal !== undefined && tabletVal !== null && tabletVal !== '' ) return tabletVal;
			return desktopVal;
		}
		return desktopVal;
	};

	const getDeviceTypo = ( desktopTypo = {}, tabletTypo = {}, mobileTypo = {}, legacyDefaults = {} ) => {
		const ff = getDeviceProp( desktopTypo.fontFamily || legacyDefaults.fontFamily, tabletTypo.fontFamily, mobileTypo.fontFamily );
		const fs = getDeviceProp( desktopTypo.fontSize !== undefined ? desktopTypo.fontSize : legacyDefaults.fontSize, tabletTypo.fontSize !== undefined ? tabletTypo.fontSize : legacyDefaults.fontSizeTablet, mobileTypo.fontSize !== undefined ? mobileTypo.fontSize : legacyDefaults.fontSizeMobile );
		const fw = getDeviceProp( desktopTypo.fontWeight || legacyDefaults.fontWeight, tabletTypo.fontWeight, mobileTypo.fontWeight );
		const lh = getDeviceProp( desktopTypo.lineHeight !== undefined ? desktopTypo.lineHeight : legacyDefaults.lineHeight, tabletTypo.lineHeight !== undefined ? tabletTypo.lineHeight : legacyDefaults.lineHeightTablet, mobileTypo.lineHeight !== undefined ? mobileTypo.lineHeight : legacyDefaults.lineHeightMobile );
		const ls = getDeviceProp( desktopTypo.letterSpacing !== undefined ? desktopTypo.letterSpacing : legacyDefaults.letterSpacing, tabletTypo.letterSpacing !== undefined ? tabletTypo.letterSpacing : legacyDefaults.letterSpacingTablet, mobileTypo.letterSpacing !== undefined ? mobileTypo.letterSpacing : legacyDefaults.letterSpacingMobile );
		return { ff, fs, fw, lh, ls };
	};

	const activeTitleTypo = getDeviceTypo(
		titleTypography,
		titleTypographyTablet,
		titleTypographyMobile,
		{ fontFamily, fontSize, fontSizeTablet, fontSizeMobile, fontWeight, lineHeight, lineHeightTablet, lineHeightMobile, letterSpacing, letterSpacingTablet, letterSpacingMobile }
	);

	const activeEyebrowTypo = getDeviceTypo(
		eyebrowTypography,
		eyebrowTypographyTablet,
		eyebrowTypographyMobile,
		{ fontSize: 11, fontWeight: '700', letterSpacing: '0.12em', lineHeight: '1.2' }
	);

	const activeDescTypo = getDeviceTypo(
		descriptionTypography,
		descriptionTypographyTablet,
		descriptionTypographyMobile,
		{ fontSize: 16, fontWeight: '400', letterSpacing: '0px', lineHeight: '1.6' }
	);

	const headingStyle = {
		textAlign: currentTextAlign,
		fontWeight: activeTitleTypo.fw || fontWeight || '800',
		textTransform: textTransform || 'none',
		color: enableTextGradient ? 'transparent' : getSolidColor( titleColor || textColor ) || '#0f172a',
		'--gravisain-highlight-color': getSolidColor( highlightColor ) || '#2563eb',
		backgroundImage: enableTextGradient ? textGradient : 'none',
		WebkitBackgroundClip: enableTextGradient ? 'text' : 'border-box',
		backgroundClip: enableTextGradient ? 'text' : 'border-box',
	};

	const dynamicEditorCSS = `
		[data-block="${ clientId }"],
		.editor-styles-wrapper [data-block="${ clientId }"],
		.editor-styles-wrapper #block-${ clientId },
		#block-${ clientId } {
			text-align: ${ currentTextAlign } !important;
			${ activeMarginTop !== undefined && activeMarginTop !== '' ? `margin-top: ${activeMarginTop} !important; margin-block-start: ${activeMarginTop} !important;` : '' }
			${ activeMarginBottom !== undefined && activeMarginBottom !== '' ? `margin-bottom: ${activeMarginBottom} !important; margin-block-end: ${activeMarginBottom} !important;` : '' }
			${ activeMarginLeft !== undefined && activeMarginLeft !== '' ? `margin-left: ${activeMarginLeft} !important;` : '' }
			${ activeMarginRight !== undefined && activeMarginRight !== '' ? `margin-right: ${activeMarginRight} !important;` : '' }
			${ activePaddingTop !== undefined && activePaddingTop !== '' ? `padding-top: ${activePaddingTop} !important;` : '' }
			${ activePaddingBottom !== undefined && activePaddingBottom !== '' ? `padding-bottom: ${activePaddingBottom} !important;` : '' }
			${ activePaddingLeft !== undefined && activePaddingLeft !== '' ? `padding-left: ${activePaddingLeft} !important;` : '' }
			${ activePaddingRight !== undefined && activePaddingRight !== '' ? `padding-right: ${activePaddingRight} !important;` : '' }
		}
		#block-${ clientId } .gravisain-heading-title,
		#block-${ clientId } .gravisain-heading-eyebrow,
		#block-${ clientId } .gravisain-heading-description,
		#block-${ clientId } .gravisain-heading-title *,
		#block-${ clientId } .gravisain-heading-eyebrow *,
		#block-${ clientId } .gravisain-heading-description * {
			text-align: ${ currentTextAlign } !important;
		}
		#block-${ clientId } .gravisain-heading-title {
			${ activeTitleTypo.ff ? `font-family: '${ activeTitleTypo.ff }' !important;` : '' }
			font-size: ${ getTypographyVar( activeTitleTypo.fs, true ) || '32px' } !important;
			${ activeTitleTypo.fw ? `font-weight: ${ activeTitleTypo.fw } !important;` : '' }
			line-height: ${ getTypographyVar( activeTitleTypo.lh, false ) || '1.25' } !important;
			letter-spacing: ${ getTypographyVar( activeTitleTypo.ls, true ) || '0px' } !important;
			${ ( ! enableTextGradient && ( titleColor || textColor ) ) ? `color: ${ getSolidColor( titleColor || textColor ) } !important;` : '' }
		}
		#block-${ clientId } .gravisain-heading-eyebrow {
			${ activeEyebrowTypo.ff ? `font-family: '${ activeEyebrowTypo.ff }' !important;` : '' }
			${ activeEyebrowTypo.fs ? `font-size: ${ getTypographyVar( activeEyebrowTypo.fs, true ) } !important;` : '' }
			${ activeEyebrowTypo.fw ? `font-weight: ${ activeEyebrowTypo.fw } !important;` : '' }
			${ activeEyebrowTypo.lh ? `line-height: ${ getTypographyVar( activeEyebrowTypo.lh, false ) } !important;` : '' }
			${ activeEyebrowTypo.ls ? `letter-spacing: ${ getTypographyVar( activeEyebrowTypo.ls, true ) } !important;` : '' }
			${ eyebrowColor ? `color: ${ getSolidColor( eyebrowColor ) } !important;` : '' }
		}
		#block-${ clientId } .gravisain-heading-description {
			${ activeDescTypo.ff ? `font-family: '${ activeDescTypo.ff }' !important;` : '' }
			${ activeDescTypo.fs ? `font-size: ${ getTypographyVar( activeDescTypo.fs, true ) } !important;` : '' }
			${ activeDescTypo.fw ? `font-weight: ${ activeDescTypo.fw } !important;` : '' }
			${ activeDescTypo.lh ? `line-height: ${ getTypographyVar( activeDescTypo.lh, false ) } !important;` : '' }
			${ activeDescTypo.ls ? `letter-spacing: ${ getTypographyVar( activeDescTypo.ls, true ) } !important;` : '' }
			${ descriptionColor ? `color: ${ getSolidColor( descriptionColor ) } !important;` : '' }
		}
		#block-${ clientId } .gravisain-heading-divider {
			margin-left: ${ currentTextAlign === 'center' || currentTextAlign === 'right' ? 'auto' : '0' } !important;
			margin-right: ${ currentTextAlign === 'center' || currentTextAlign === 'left' ? 'auto' : '0' } !important;
		}
	`;

	return (
		<>
			<style>{ dynamicEditorCSS }</style>
			<BlockControls>
				<AlignmentToolbar
					value={ currentTextAlign }
					onChange={ ( value ) => {
						if ( device === 'tablet' ) {
							setAttributes( { textAlignTablet: value } );
						} else if ( device === 'mobile' ) {
							setAttributes( { textAlignMobile: value } );
						} else {
							setAttributes( { textAlign: value } );
						}
					} }
				/>
			</BlockControls>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				device={ device }
				setDevice={ setDevice }
				onDeviceChange={ handleDeviceChange }
			/>

			<div { ...blockProps } id={`block-${ clientId }`}>
				{ eyebrowPosition === 'above' && (
					<RichText
						tagName="span"
						className="gravisain-heading-eyebrow"
						style={ { display: 'block' } }
						value={ eyebrow }
						onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
						placeholder={ __( 'Eyebrow text...', 'gravisain' ) }
					/>
				) }

				<RichText
					tagName={ TagName }
					className="gravisain-heading-title"
					style={ headingStyle }
					value={ content }
					onChange={ ( val ) => setAttributes( { content: val } ) }
					placeholder={ __( 'Write heading title here...', 'gravisain' ) }
				/>

				{ eyebrowPosition === 'below' && (
					<RichText
						tagName="span"
						className="gravisain-heading-eyebrow below"
						style={ { display: 'block' } }
						value={ eyebrow }
						onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
					/>
				) }

				{ showDivider && ( () => {
					const style = dividerStyle || 'solid';
					const width = dividerWidth || 48;
					const height = dividerHeight || 4;
					const color = dividerColor || '#2563eb';
					const marginLeft = textAlign === 'center' || textAlign === 'right' ? 'auto' : 0;
					const marginRight = textAlign === 'center' ? 'auto' : 0;
					const marginTop = dividerSpacing !== undefined && dividerSpacing !== 14 ? `${ dividerSpacing }px` : undefined;

					if ( style === 'solid' ) {
						return (
							<div
								className="gravisain-heading-divider is-style-solid"
								style={ {
									width: `${ width }px`,
									height: `${ height }px`,
									background: color,
									marginLeft,
									marginRight,
									...( marginTop ? { marginTop } : {} ),
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
									...( marginTop ? { marginTop } : {} ),
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
									...( marginTop ? { marginTop } : {} ),
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
									...( marginTop ? { marginTop } : {} ),
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
								...( marginTop ? { marginTop } : {} ),
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

				<RichText
					tagName="p"
					className="gravisain-heading-description"
					value={ description }
					onChange={ ( val ) => setAttributes( { description: val } ) }
					placeholder={ __( 'Write description here (optional)...', 'gravisain' ) }
				/>
			</div>
		</>
	);
}
