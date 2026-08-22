import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
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

	let blockProps = useBlockProps( {
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

	const dynamicEditorCSS = `
		#block-${clientId} {
			text-align: ${currentTextAlign} !important;
			--gravisain-ff: ${fontFamily ? `'${fontFamily}'` : 'inherit'};
			--gravisain-fs: ${getTypographyVar(fontSize, true) || '16px'};
			--gravisain-fs-tablet: ${getTypographyVar(fontSizeTablet, true) || 'inherit'};
			--gravisain-fs-mobile: ${getTypographyVar(fontSizeMobile, true) || 'inherit'};
			--gravisain-lh: ${getTypographyVar(lineHeight, false) || '1.5'};
			--gravisain-lh-tablet: ${getTypographyVar(lineHeightTablet, false) || 'inherit'};
			--gravisain-lh-mobile: ${getTypographyVar(lineHeightMobile, false) || 'inherit'};
			--gravisain-ls: ${getTypographyVar(letterSpacing, true) || '0px'};
			--gravisain-ls-tablet: ${getTypographyVar(letterSpacingTablet, true) || 'inherit'};
			--gravisain-ls-mobile: ${getTypographyVar(letterSpacingMobile, true) || 'inherit'};
		}
		#block-${clientId} .gravisain-text-content,
		#block-${clientId} .gravisain-text-content * {
			text-align: ${currentTextAlign} !important;
			font-family: var(--gravisain-ff);
		}
	`;

	return (
		<>
			<style>{ dynamicEditorCSS }</style>
			<BlockControls>
				<ToolbarDropdownMenu
					text={ (htmlTag || 'p').toUpperCase() }
					label={ __( 'Change HTML Tag', 'gravisain' ) }
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
					placeholder={ __( 'Write text here...', 'gravisain' ) }
				/>
			</div>
		</>
	);
}
