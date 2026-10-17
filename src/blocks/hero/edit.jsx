import { useBlockProps, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { Container } from '../../components/Container.jsx';
import Inspector from './components/Inspector.jsx';
import Content from './components/Content.jsx';
import Media from './components/Media.jsx';
import parseCustomCSS from '../../controls/parseCustomCSS';
import useGoogleFont from '../../controls/useGoogleFont';
import { getHeroCSSVariables, getSpacing, getTypographyVar } from './utils';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const blockId = `block-${ clientId }`;
	const { 
		layout, background, overlay, innerContainerMaxWidth, anchor, customClassName, customCSS,
		titleTypography, titleTypographyTablet, titleTypographyMobile,
		eyebrowTypography, eyebrowTypographyTablet, eyebrowTypographyMobile,
		descriptionTypography, descriptionTypographyTablet, descriptionTypographyMobile,
		primaryButtonTypography, primaryButtonTypographyTablet, primaryButtonTypographyMobile,
		secondaryButtonTypography, secondaryButtonTypographyTablet, secondaryButtonTypographyMobile,
		margin, marginTablet, marginMobile,
		padding, paddingTablet, paddingMobile,
		align, textAlign
	} = attributes;

	const blockRef = useRef( null );

	// Load Google Fonts in the editor
	useGoogleFont( titleTypography?.fontFamily );
	useGoogleFont( titleTypographyTablet?.fontFamily );
	useGoogleFont( titleTypographyMobile?.fontFamily );
	useGoogleFont( eyebrowTypography?.fontFamily );
	useGoogleFont( eyebrowTypographyTablet?.fontFamily );
	useGoogleFont( eyebrowTypographyMobile?.fontFamily );
	useGoogleFont( descriptionTypography?.fontFamily );
	useGoogleFont( descriptionTypographyTablet?.fontFamily );
	useGoogleFont( descriptionTypographyMobile?.fontFamily );
	useGoogleFont( primaryButtonTypography?.fontFamily );
	useGoogleFont( primaryButtonTypographyTablet?.fontFamily );
	useGoogleFont( primaryButtonTypographyMobile?.fontFamily );
	useGoogleFont( secondaryButtonTypography?.fontFamily );
	useGoogleFont( secondaryButtonTypographyTablet?.fontFamily );
	useGoogleFont( secondaryButtonTypographyMobile?.fontFamily );

	const { previewDeviceType, hasParents } = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		const parents = select( 'core/block-editor' )?.getBlockParents?.( clientId ) || [];
		return {
			previewDeviceType: editorDevice || postDevice || siteDevice || 'Desktop',
			hasParents: parents.length > 0,
		};
	}, [ clientId ] );

	const isTablet = previewDeviceType === 'Tablet';
	const isMobile = previewDeviceType === 'Mobile';

	const getActiveValue = ( base, tablet, mobile ) => {
		if ( isMobile ) return mobile !== undefined && mobile !== '' ? mobile : ( tablet !== undefined && tablet !== '' ? tablet : base );
		if ( isTablet ) return tablet !== undefined && tablet !== '' ? tablet : base;
		return base;
	};

	const getActiveTypo = ( base = {}, tablet = {}, mobile = {} ) => {
		if ( isMobile ) {
			return {
				fontFamily: mobile.fontFamily || tablet.fontFamily || base.fontFamily,
				fontSize: mobile.fontSize !== undefined && mobile.fontSize !== '' ? mobile.fontSize : ( tablet.fontSize !== undefined && tablet.fontSize !== '' ? tablet.fontSize : base.fontSize ),
				fontWeight: mobile.fontWeight || tablet.fontWeight || base.fontWeight,
				lineHeight: mobile.lineHeight !== undefined && mobile.lineHeight !== '' ? mobile.lineHeight : ( tablet.lineHeight !== undefined && tablet.lineHeight !== '' ? tablet.lineHeight : base.lineHeight ),
				letterSpacing: mobile.letterSpacing !== undefined && mobile.letterSpacing !== '' ? mobile.letterSpacing : ( tablet.letterSpacing !== undefined && tablet.letterSpacing !== '' ? tablet.letterSpacing : base.letterSpacing ),
			};
		}
		if ( isTablet ) {
			return {
				fontFamily: tablet.fontFamily || base.fontFamily,
				fontSize: tablet.fontSize !== undefined && tablet.fontSize !== '' ? tablet.fontSize : base.fontSize,
				fontWeight: tablet.fontWeight || base.fontWeight,
				lineHeight: tablet.lineHeight !== undefined && tablet.lineHeight !== '' ? tablet.lineHeight : base.lineHeight,
				letterSpacing: tablet.letterSpacing !== undefined && tablet.letterSpacing !== '' ? tablet.letterSpacing : base.letterSpacing,
			};
		}
		return base;
	};

	const activeTitleTypo = getActiveTypo( titleTypography, titleTypographyTablet, titleTypographyMobile );
	const activeEyebrowTypo = getActiveTypo( eyebrowTypography, eyebrowTypographyTablet, eyebrowTypographyMobile );
	const activeDescTypo = getActiveTypo( descriptionTypography, descriptionTypographyTablet, descriptionTypographyMobile );
	const activeBtn1Typo = getActiveTypo( primaryButtonTypography, primaryButtonTypographyTablet, primaryButtonTypographyMobile );
	const activeBtn2Typo = getActiveTypo( secondaryButtonTypography, secondaryButtonTypographyTablet, secondaryButtonTypographyMobile );

	const activeMarginTop = getActiveValue( getSpacing( margin, 'top' ), getSpacing( marginTablet, 'top' ), getSpacing( marginMobile, 'top' ) );
	const activeMarginBottom = getActiveValue( getSpacing( margin, 'bottom' ), getSpacing( marginTablet, 'bottom' ), getSpacing( marginMobile, 'bottom' ) );
	const activeMarginLeft = getActiveValue( getSpacing( margin, 'left' ), getSpacing( marginTablet, 'left' ), getSpacing( marginMobile, 'left' ) );
	const activeMarginRight = getActiveValue( getSpacing( margin, 'right' ), getSpacing( marginTablet, 'right' ), getSpacing( marginMobile, 'right' ) );

	const activePaddingTop = getActiveValue( getSpacing( padding, 'top' ), getSpacing( paddingTablet, 'top' ), getSpacing( paddingMobile, 'top' ) );
	const activePaddingBottom = getActiveValue( getSpacing( padding, 'bottom' ), getSpacing( paddingTablet, 'bottom' ), getSpacing( paddingMobile, 'bottom' ) );
	const activePaddingLeft = getActiveValue( getSpacing( padding, 'left' ), getSpacing( paddingTablet, 'left' ), getSpacing( paddingMobile, 'left' ) );
	const activePaddingRight = getActiveValue( getSpacing( padding, 'right' ), getSpacing( paddingTablet, 'right' ), getSpacing( paddingMobile, 'right' ) );

	const isAlignBreakout = align === 'full' || align === 'wide' || ! align;

	// Directly manipulate the DOM nodes in the editor to guarantee margins and paddings apply immediately
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

		// Apply padding & margin to both section and wrapper for maximum editor consistency
		[ el, wrapper ].forEach( ( node ) => {
			applyProp( node, 'padding-top', activePaddingTop );
			applyProp( node, 'padding-bottom', activePaddingBottom );
			applyProp( node, 'padding-left', activePaddingLeft );
			applyProp( node, 'padding-right', activePaddingRight );

			applyProp( node, 'margin-top', activeMarginTop );
			applyProp( node, 'margin-block-start', activeMarginTop );
			applyProp( node, 'margin-bottom', activeMarginBottom );
			applyProp( node, 'margin-block-end', activeMarginBottom );
			const isNestedInContainer = hasParents || !! ( el.closest( '.wp-block-gravisain-column, .gravisain-column, .wp-block-column, .wp-block-columns, .wp-block-gravisain-row-layout, .gravisain-row-layout, .gravisain-container, .wp-block-group' ) );
			const shouldBreakout = isAlignBreakout && ! isNestedInContainer;

			if ( ! shouldBreakout ) {
				applyProp( node, 'margin-left', activeMarginLeft );
				applyProp( node, 'margin-right', activeMarginRight );
				if ( isNestedInContainer ) {
					node.style.setProperty( 'width', 'auto', 'important' );
					node.style.setProperty( 'max-width', '100%', 'important' );
				}
			} else if ( activeMarginLeft || activeMarginRight ) {
				applyProp( node, 'margin-left', `calc(50% - 50vw + ${activeMarginLeft || '0px'})` );
				applyProp( node, 'margin-right', `calc(50% - 50vw + ${activeMarginRight || '0px'})` );
				applyProp( node, 'width', `calc(100vw - ${activeMarginLeft || '0px'} - ${activeMarginRight || '0px'})` );
				applyProp( node, 'max-width', `calc(100vw - ${activeMarginLeft || '0px'} - ${activeMarginRight || '0px'})` );
			} else {
				node.style.removeProperty( 'margin-left' );
				node.style.removeProperty( 'margin-right' );
				node.style.removeProperty( 'width' );
				node.style.removeProperty( 'max-width' );
			}
		} );
	}, [ activeMarginTop, activeMarginBottom, activeMarginLeft, activeMarginRight, activePaddingTop, activePaddingBottom, activePaddingLeft, activePaddingRight, isAlignBreakout, hasParents ] );

	const cssVars = getHeroCSSVariables( attributes );
	
	const blockProps = useBlockProps( {
		ref: blockRef,
		id: anchor || blockId,
		className: `gravisain-section gravisain-hero hero-layout-${ layout } ${ customClassName || '' }`.trim(),
		style: {
			...( background?.color ? (
				background.color.includes( 'gradient' )
					? { backgroundImage: background.color }
					: { backgroundColor: background.color }
			) : {} ),
			...( background?.image ? { 
				backgroundImage: `url(${background.image})`,
				backgroundPosition: background?.focalPoint ? `${Math.round(background.focalPoint.x * 100)}% ${Math.round(background.focalPoint.y * 100)}%` : 'center center',
				backgroundSize: 'cover',
			} : {} ),
			...cssVars,
			marginTop: activeMarginTop || undefined,
			marginBottom: activeMarginBottom || undefined,
			paddingTop: activePaddingTop || undefined,
			paddingBottom: activePaddingBottom || undefined,
			paddingLeft: activePaddingLeft || undefined,
			paddingRight: activePaddingRight || undefined,
			...( ! isAlignBreakout ? {
				marginLeft: activeMarginLeft || undefined,
				marginRight: activeMarginRight || undefined,
			} : {} ),
			...parseCustomCSS(customCSS)
		}
	} );

	// Build CSS variables string
	const cssVarEntries = Object.entries( cssVars )
		.filter( ( [ , val ] ) => val !== undefined && val !== null && val !== '' )
		.map( ( [ key, val ] ) => `${ key }: ${ val };` )
		.join( '\n\t\t\t' );

	const dynamicEditorCSS = `
		.editor-styles-wrapper [data-block="${ clientId }"],
		.editor-styles-wrapper #block-${ clientId },
		#${ blockId },
		[data-block="${ clientId }"],
		.editor-styles-wrapper [data-block="${ clientId }"] .gravisain-hero,
		.editor-styles-wrapper #block-${ clientId } .gravisain-hero,
		#${ blockId } .gravisain-hero,
		.editor-styles-wrapper [data-block="${ clientId }"] section,
		.editor-styles-wrapper #block-${ clientId } section {
			${ cssVarEntries }
			${ activePaddingTop !== undefined && activePaddingTop !== '' ? `padding-top: ${activePaddingTop} !important;` : '' }
			${ activePaddingBottom !== undefined && activePaddingBottom !== '' ? `padding-bottom: ${activePaddingBottom} !important;` : '' }
			${ activePaddingLeft !== undefined && activePaddingLeft !== '' ? `padding-left: ${activePaddingLeft} !important;` : '' }
			${ activePaddingRight !== undefined && activePaddingRight !== '' ? `padding-right: ${activePaddingRight} !important;` : '' }
			${ activeMarginTop !== undefined && activeMarginTop !== '' ? `margin-top: ${activeMarginTop} !important; margin-block-start: ${activeMarginTop} !important;` : '' }
			${ activeMarginBottom !== undefined && activeMarginBottom !== '' ? `margin-bottom: ${activeMarginBottom} !important; margin-block-end: ${activeMarginBottom} !important;` : '' }
			${ ( ! isAlignBreakout || hasParents ) && activeMarginLeft !== undefined && activeMarginLeft !== '' ? `margin-left: ${activeMarginLeft} !important;` : '' }
			${ ( ! isAlignBreakout || hasParents ) && activeMarginRight !== undefined && activeMarginRight !== '' ? `margin-right: ${activeMarginRight} !important;` : '' }
			${ hasParents ? `
				width: auto !important;
				max-width: 100% !important;
			` : '' }
			${ isAlignBreakout && ! hasParents && (activeMarginLeft || activeMarginRight) ? `
				width: calc(100vw - ${activeMarginLeft || '0px'} - ${activeMarginRight || '0px'}) !important;
				max-width: calc(100vw - ${activeMarginLeft || '0px'} - ${activeMarginRight || '0px'}) !important;
				margin-left: calc(50% - 50vw + ${activeMarginLeft || '0px'}) !important;
				margin-right: calc(50% - 50vw + ${activeMarginRight || '0px'}) !important;
			` : '' }
		}

		/* Force override Gutenberg styles with active responsive typography */
		#${ blockId } .hero-eyebrow {
			font-family: ${ activeEyebrowTypo.fontFamily ? `'${activeEyebrowTypo.fontFamily}'` : 'var(--gravisain-hero-eyebrow-ff, inherit)' } !important;
			font-size: ${ getTypographyVar( activeEyebrowTypo.fontSize, true ) || 'var(--gravisain-hero-eyebrow-fs, 0.875rem)' } !important;
			font-weight: ${ activeEyebrowTypo.fontWeight || 'var(--gravisain-hero-eyebrow-fw, 600)' } !important;
			line-height: ${ getTypographyVar( activeEyebrowTypo.lineHeight, false ) || 'var(--gravisain-hero-eyebrow-lh, 1.2)' } !important;
			letter-spacing: ${ getTypographyVar( activeEyebrowTypo.letterSpacing, true ) || 'var(--gravisain-hero-eyebrow-ls, 0.12em)' } !important;
			color: var(--gravisain-hero-eyebrow-color, var(--wp--preset--color--primary, #2563eb)) !important;
		}
		#${ blockId } .hero-title {
			font-family: ${ activeTitleTypo.fontFamily ? `'${activeTitleTypo.fontFamily}'` : 'var(--gravisain-hero-title-ff, inherit)' } !important;
			font-size: ${ getTypographyVar( activeTitleTypo.fontSize, true ) || 'var(--gravisain-hero-title-fs, clamp(2rem, 5vw, 3.5rem))' } !important;
			font-weight: ${ activeTitleTypo.fontWeight || 'var(--gravisain-hero-title-fw, 800)' } !important;
			line-height: ${ getTypographyVar( activeTitleTypo.lineHeight, false ) || 'var(--gravisain-hero-title-lh, 1.2)' } !important;
			letter-spacing: ${ getTypographyVar( activeTitleTypo.letterSpacing, true ) || 'var(--gravisain-hero-title-ls, normal)' } !important;
			color: var(--gravisain-hero-title-color, inherit) !important;
		}
		#${ blockId } .hero-title mark,
		#${ blockId } .hero-title .gravisain-highlight {
			background: transparent;
			color: var(--gravisain-highlight-color, var(--wp--preset--color--primary, #2563eb));
			font-weight: inherit;
		}
		#${ blockId } .hero-description {
			font-family: ${ activeDescTypo.fontFamily ? `'${activeDescTypo.fontFamily}'` : 'var(--gravisain-hero-desc-ff, inherit)' } !important;
			font-size: ${ getTypographyVar( activeDescTypo.fontSize, true ) || 'var(--gravisain-hero-desc-fs, clamp(1.05rem, 2vw, 1.25rem))' } !important;
			font-weight: ${ activeDescTypo.fontWeight || 'var(--gravisain-hero-desc-fw, 400)' } !important;
			line-height: ${ getTypographyVar( activeDescTypo.lineHeight, false ) || 'var(--gravisain-hero-desc-lh, 1.6)' } !important;
			letter-spacing: ${ getTypographyVar( activeDescTypo.letterSpacing, true ) || 'var(--gravisain-hero-desc-ls, normal)' } !important;
			color: var(--gravisain-hero-desc-color, inherit) !important;
		}

		/* Primary Button — force all style properties to update in editor */
		#${ blockId } .gravisain-button.primary-btn {
			padding-top: var(--gravisain-hero-btn1-pt, 0.875rem) !important;
			padding-right: var(--gravisain-hero-btn1-pr, 1.75rem) !important;
			padding-bottom: var(--gravisain-hero-btn1-pb, 0.875rem) !important;
			padding-left: var(--gravisain-hero-btn1-pl, 1.75rem) !important;
			font-family: ${ activeBtn1Typo.fontFamily ? `'${activeBtn1Typo.fontFamily}'` : 'var(--gravisain-hero-btn1-ff, inherit)' } !important;
			font-size: ${ getTypographyVar( activeBtn1Typo.fontSize, true ) || 'var(--gravisain-hero-btn1-fs, 1rem)' } !important;
			font-weight: ${ activeBtn1Typo.fontWeight || 'var(--gravisain-hero-btn1-fw, 600)' } !important;
			line-height: ${ getTypographyVar( activeBtn1Typo.lineHeight, false ) || 'var(--gravisain-hero-btn1-lh, 1.2)' } !important;
			letter-spacing: ${ getTypographyVar( activeBtn1Typo.letterSpacing, true ) || 'var(--gravisain-hero-btn1-ls, normal)' } !important;
			border-radius: var(--gravisain-hero-btn1-radius, 8px) !important;
		}
		#${ blockId } .gravisain-button.primary-btn.gravisain-button--primary {
			background-color: var(--gravisain-hero-btn1-bg, var(--wp--preset--color--primary, #2563eb)) !important;
			color: var(--gravisain-hero-btn1-color, #ffffff) !important;
		}
		#${ blockId } .gravisain-button.primary-btn.gravisain-button--outline {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn1-color, inherit) !important;
			border: 2px solid currentColor !important;
		}
		#${ blockId } .gravisain-button.primary-btn.gravisain-button--link {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn1-color, inherit) !important;
			border: none !important;
			padding: 0 !important;
		}

		/* Secondary Button — force all style properties to update in editor */
		#${ blockId } .gravisain-button.secondary-btn {
			padding-top: var(--gravisain-hero-btn2-pt, 0.875rem) !important;
			padding-right: var(--gravisain-hero-btn2-pr, 1.75rem) !important;
			padding-bottom: var(--gravisain-hero-btn2-pb, 0.875rem) !important;
			padding-left: var(--gravisain-hero-btn2-pl, 1.75rem) !important;
			font-family: ${ activeBtn2Typo.fontFamily ? `'${activeBtn2Typo.fontFamily}'` : 'var(--gravisain-hero-btn2-ff, inherit)' } !important;
			font-size: ${ getTypographyVar( activeBtn2Typo.fontSize, true ) || 'var(--gravisain-hero-btn2-fs, 1rem)' } !important;
			font-weight: ${ activeBtn2Typo.fontWeight || 'var(--gravisain-hero-btn2-fw, 600)' } !important;
			line-height: ${ getTypographyVar( activeBtn2Typo.lineHeight, false ) || 'var(--gravisain-hero-btn2-lh, 1.2)' } !important;
			letter-spacing: ${ getTypographyVar( activeBtn2Typo.letterSpacing, true ) || 'var(--gravisain-hero-btn2-ls, normal)' } !important;
			border-radius: var(--gravisain-hero-btn2-radius, 8px) !important;
		}
		#${ blockId } .gravisain-button.secondary-btn:not(.gravisain-button--outline):not(.gravisain-button--link) {
			background: var(--gravisain-hero-btn2-bg, var(--wp--preset--color--secondary, #0ea5e9)) !important;
			color: var(--gravisain-hero-btn2-color, #ffffff) !important;
			border: 2px solid transparent !important;
		}
		#${ blockId } .gravisain-button.secondary-btn.gravisain-button--outline {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn2-color, inherit) !important;
			border: 2px solid currentColor !important;
		}
		#${ blockId } .gravisain-button.secondary-btn.gravisain-button--link {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn2-color, inherit) !important;
			border: none !important;
			padding: 0 !important;
		}
	`;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign || ( layout === '1-column' ? 'center' : 'left' ) }
					onChange={ ( val ) => setAttributes( { textAlign: val || '' } ) }
				/>
			</BlockControls>
			<style>{ dynamicEditorCSS }</style>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />

			<section { ...blockProps }>
				{ overlay?.color && (
					<div 
						className="gravisain-section-overlay" 
						style={ { 
							...( overlay.color.includes( 'gradient' )
								? { backgroundImage: overlay.color }
								: { backgroundColor: overlay.color }
							),
							opacity: overlay.opacity || 0.5, 
							position: 'absolute', 
							inset: 0 
						} } 
					/>
				) }
				<div className="gravisain-section-content" style={ { position: 'relative', zIndex: 1 } }>
					<Container maxWidth="xl" className="hero-container" style={ { maxWidth: innerContainerMaxWidth || undefined } }>
						<div className={ `hero-layout hero-layout-${ layout }` }>
							<Content attributes={ attributes } setAttributes={ setAttributes } />

							{ layout !== '1-column' && (
								<Media attributes={ attributes } setAttributes={ setAttributes } />
							) }
						</div>
					</Container>
				</div>
			</section>
		</>
	);
}
