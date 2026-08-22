import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
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

export default function Edit( { attributes, setAttributes, clientId } ) {
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

	let blockProps = useBlockProps( {
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
			marginLeft: 'auto',
			marginRight: 'auto',
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

	const getSolidColor = (c) => (c && c.includes('gradient')) ? undefined : c;

	const headingStyle = {
		textAlign: currentTextAlign,
		fontWeight: fontWeight || '800',
		textTransform: textTransform || 'none',
		color: enableTextGradient ? 'transparent' : getSolidColor(textColor) || '#0f172a',
		'--gravisain-highlight-color': getSolidColor(highlightColor) || '#2563eb',
		backgroundImage: enableTextGradient ? textGradient : 'none',
		WebkitBackgroundClip: enableTextGradient ? 'text' : 'border-box',
		backgroundClip: enableTextGradient ? 'text' : 'border-box',
	};

	const dynamicEditorCSS = `
		#block-${ clientId } {
			text-align: ${ currentTextAlign } !important;
			--gravisain-ff: ${ fontFamily ? `'${ fontFamily }'` : 'inherit' };
			--gravisain-fs: ${ getTypographyVar( fontSize, true ) || '32px' };
			--gravisain-fs-tablet: ${ getTypographyVar( fontSizeTablet, true ) || 'inherit' };
			--gravisain-fs-mobile: ${ getTypographyVar( fontSizeMobile, true ) || 'inherit' };
			--gravisain-lh: ${ getTypographyVar( lineHeight, false ) || '1.25' };
			--gravisain-lh-tablet: ${ getTypographyVar( lineHeightTablet, false ) || 'inherit' };
			--gravisain-lh-mobile: ${ getTypographyVar( lineHeightMobile, false ) || 'inherit' };
			--gravisain-ls: ${ getTypographyVar( letterSpacing, true ) || '0px' };
			--gravisain-ls-tablet: ${ getTypographyVar( letterSpacingTablet, true ) || 'inherit' };
			--gravisain-ls-mobile: ${ getTypographyVar( letterSpacingMobile, true ) || 'inherit' };
		}
		#block-${ clientId } .gravisain-heading-title,
		#block-${ clientId } .gravisain-heading-eyebrow,
		#block-${ clientId } .gravisain-heading-title *,
		#block-${ clientId } .gravisain-heading-eyebrow * {
			text-align: ${ currentTextAlign } !important;
			font-family: var(--gravisain-ff);
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
				{ eyebrow && eyebrowPosition === 'above' && (
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

				{ eyebrow && eyebrowPosition === 'below' && (
					<RichText
						tagName="span"
						className="gravisain-heading-eyebrow below"
						style={ { display: 'block' } }
						value={ eyebrow }
						onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
					/>
				) }

				{ showDivider && (
					<div
						className="gravisain-heading-divider"
						style={ {
							width: `${ dividerWidth }px`,
							height: `${ dividerHeight }px`,
							backgroundColor: dividerColor,
						} }
					/>
				) }
			</div>
		</>
	);
}
