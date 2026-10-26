import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	RichText,
} from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import useGoogleFont from '../../controls/useGoogleFont';
import Inspector from './components/Inspector';

export default function Edit( { attributes, setAttributes, clientId } ) {
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

	const [ device, setDevice ] = useState( 'desktop' );

	useGoogleFont(fontFamily);

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

	let blockProps = useBlockProps( {
		ref: blockRef,
		id: anchor || undefined,
		className: [
			'gravisain-advanced-text',
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

	// Force strip any core text-alignment classes that conflict with our current responsive state
	if ( blockProps.className ) {
		blockProps.className = blockProps.className
			.split( ' ' )
			.filter( ( c ) => ! c.startsWith( 'has-text-align-' ) )
			.join( ' ' )
			.trim() + ` has-text-align-${ currentTextAlign }`;
	}

	const TagName = htmlTag || 'p';

	const getSolidColor = (c) => (c && c.includes('gradient')) ? undefined : c;

	const textStyle = {
		textAlign: currentTextAlign,
		fontWeight: fontWeight || '400',
		textTransform: textTransform || 'none',
		color: enableTextGradient ? 'transparent' : getSolidColor(textColor) || '#334155',
		'--gravisain-highlight-color': getSolidColor(highlightColor) || '#2563eb',
		backgroundImage: enableTextGradient ? textGradient : 'none',
		WebkitBackgroundClip: enableTextGradient ? 'text' : 'border-box',
		backgroundClip: enableTextGradient ? 'text' : 'border-box',
	};

	const isMobile = device === 'mobile' || previewDeviceType === 'Mobile';
	const isTablet = device === 'tablet' || previewDeviceType === 'Tablet';

	const activeFontSize = isMobile
		? ( fontSizeMobile !== undefined && fontSizeMobile !== null && fontSizeMobile !== '' ? fontSizeMobile : ( fontSizeTablet !== undefined && fontSizeTablet !== null && fontSizeTablet !== '' ? fontSizeTablet : fontSize ) )
		: ( isTablet ? ( fontSizeTablet !== undefined && fontSizeTablet !== null && fontSizeTablet !== '' ? fontSizeTablet : fontSize ) : fontSize );

	const activeLineHeight = isMobile
		? ( lineHeightMobile !== undefined && lineHeightMobile !== null && lineHeightMobile !== '' ? lineHeightMobile : ( lineHeightTablet !== undefined && lineHeightTablet !== null && lineHeightTablet !== '' ? lineHeightTablet : lineHeight ) )
		: ( isTablet ? ( lineHeightTablet !== undefined && lineHeightTablet !== null && lineHeightTablet !== '' ? lineHeightTablet : lineHeight ) : lineHeight );

	const activeLetterSpacing = isMobile
		? ( letterSpacingMobile !== undefined && letterSpacingMobile !== null && letterSpacingMobile !== '' ? letterSpacingMobile : ( letterSpacingTablet !== undefined && letterSpacingTablet !== null && letterSpacingTablet !== '' ? letterSpacingTablet : letterSpacing ) )
		: ( isTablet ? ( letterSpacingTablet !== undefined && letterSpacingTablet !== null && letterSpacingTablet !== '' ? letterSpacingTablet : letterSpacing ) : letterSpacing );

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
			--gravisain-ff: ${ fontFamily ? `'${ fontFamily }'` : 'inherit' };
			--gravisain-fs: ${ getTypographyVar( fontSize, true ) || '16px' };
			--gravisain-fs-tablet: ${ getTypographyVar( fontSizeTablet, true ) || 'inherit' };
			--gravisain-fs-mobile: ${ getTypographyVar( fontSizeMobile, true ) || 'inherit' };
			--gravisain-lh: ${ getTypographyVar( lineHeight, false ) || '1.5' };
			--gravisain-lh-tablet: ${ getTypographyVar( lineHeightTablet, false ) || 'inherit' };
			--gravisain-lh-mobile: ${ getTypographyVar( lineHeightMobile, false ) || 'inherit' };
			--gravisain-ls: ${ getTypographyVar( letterSpacing, true ) || '0px' };
			--gravisain-ls-tablet: ${ getTypographyVar( letterSpacingTablet, true ) || 'inherit' };
			--gravisain-ls-mobile: ${ getTypographyVar( letterSpacingMobile, true ) || 'inherit' };
		}
		#block-${clientId} .gravisain-text-content,
		#block-${clientId} .gravisain-text-content * {
			text-align: ${currentTextAlign} !important;
			font-family: var(--gravisain-ff);
		}
		#block-${clientId} .gravisain-text-content {
			font-size: ${getTypographyVar(activeFontSize, true) || '16px'} !important;
			line-height: ${getTypographyVar(activeLineHeight, false) || '1.5'} !important;
			letter-spacing: ${getTypographyVar(activeLetterSpacing, true) || '0px'} !important;
		}
	`;

	return (
		<>
			<style>{ dynamicEditorCSS }</style>
			<BlockControls>
				<ToolbarDropdownMenu
					text={ (htmlTag || 'p').toUpperCase() }
					label={ __( 'Change HTML Tag', 'gravisain-blocks' ) }
					controls={ [
						{ title: 'Paragraph <p>', value: 'p' },
						{ title: 'Heading 1', value: 'h1' },
						{ title: 'Heading 2', value: 'h2' },
						{ title: 'Heading 3', value: 'h3' },
						{ title: 'Heading 4', value: 'h4' },
						{ title: 'Heading 5', value: 'h5' },
						{ title: 'Heading 6', value: 'h6' },
						{ title: 'Div <div>', value: 'div' },
						{ title: 'Span <span>', value: 'span' },
					].map( ( option ) => ( {
						title: option.title,
						isActive: ( htmlTag || 'p' ) === option.value,
						onClick: () => setAttributes( { htmlTag: option.value } ),
					} ) ) }
				/>
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
				<RichText
					tagName={ TagName }
					className="gravisain-text-content"
					style={ textStyle }
					value={ content }
					onChange={ ( val ) => setAttributes( { content: val } ) }
					placeholder={ __( 'Write text here...', 'gravisain-blocks' ) }
				/>
			</div>
		</>
	);
}
