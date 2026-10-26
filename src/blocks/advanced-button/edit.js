import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import ButtonInspector from './components/ButtonInspector';
import { ICONS, getIconMarkup } from '../../controls/icons';
import useGoogleFont from '../../controls/useGoogleFont';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { 
		text, icon, iconPosition, iconSpacing,
		buttonStyle = 'fill', buttonSize = 'md', buttonWidth = 'auto', customWidth,
		backgroundColor, textColor, hoverBackgroundColor, hoverTextColor,
		borderRadius = 9999, padding, paddingTablet, paddingMobile, margin, marginTablet, marginMobile,
		borderWidth = 0, borderStyle = 'none', borderColor, hoverBorderColor,
		typography = {}, textTransform,
		hoverEffect, shadow,
		anchor, customClassName, customCSS
	} = attributes;

	useGoogleFont( typography?.fontFamily );

	const [ device, setDevice ] = useState( 'desktop' );

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	useEffect( () => {
		if ( previewDeviceType === 'Tablet' && device !== 'tablet' ) {
			setDevice( 'tablet' );
		} else if ( previewDeviceType === 'Mobile' && device !== 'mobile' ) {
			setDevice( 'mobile' );
		} else if ( previewDeviceType === 'Desktop' && device !== 'desktop' ) {
			setDevice( 'desktop' );
		}
	}, [ previewDeviceType ] );

	const getSpacing = ( spacing, side ) => {
		if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
		if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
			return typeof spacing === 'number' ? `${ spacing }px` : spacing;
		}
		const val = spacing[ side ];
		if ( typeof val === 'number' ) return `${ val }px`;
		return val || undefined;
	};

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

	const blockRef = useRef( null );

	useEffect( () => {
		if ( ! blockRef.current ) return;
		const el = blockRef.current;
		const wrapper = el.closest( '.wp-block' ) || el;

		const applyProp = ( node, prop, val ) => {
			if ( val !== undefined && val !== null && val !== '' ) {
				const finalVal = typeof val === 'number' ? `${ val }px` : ( ! isNaN( val ) && String( val ).trim() !== '' ? `${ val }px` : String( val ) );
				node.style.setProperty( prop, finalVal, 'important' );
			} else {
				node.style.removeProperty( prop );
			}
		};

		[ el, wrapper ].forEach( ( node ) => {
			applyProp( node, 'margin-top', activeMarginTop );
			applyProp( node, 'margin-block-start', activeMarginTop );
			applyProp( node, 'margin-bottom', activeMarginBottom );
			applyProp( node, 'margin-block-end', activeMarginBottom );
			applyProp( node, 'margin-left', activeMarginLeft );
			applyProp( node, 'margin-right', activeMarginRight );
		} );
	}, [ activeMarginTop, activeMarginBottom, activeMarginLeft, activeMarginRight ] );

	const buttonClasses = [
		'gravisain-advanced-button',
		buttonWidth === 'full' ? 'is-width-full' : '',
		buttonWidth === 'fixed' ? 'is-width-fixed' : '',
		hoverEffect ? `hover-effect-${ hoverEffect }` : '',
		shadow ? 'has-shadow' : '',
		customClassName || '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps( {
		ref: blockRef,
		id: anchor || undefined,
		className: buttonClasses,
		style: {
			width: buttonWidth === 'fixed' && customWidth ? `${ customWidth }px` : ( buttonWidth === 'full' ? '100%' : undefined ),
			marginTop: activeMarginTop,
			marginRight: activeMarginRight,
			marginBottom: activeMarginBottom,
			marginLeft: activeMarginLeft,
			'--gravisain-btn-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-btn-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-btn-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-btn-margin-left': getSpacing( margin, 'left' ),
			'--gravisain-btn-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-btn-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-btn-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-btn-margin-left-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-btn-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-btn-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-btn-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-btn-margin-left-mobile': getSpacing( marginMobile, 'left' ),
			...parseCustomCSS( customCSS ),
		}
	} );

	const isFill = ! buttonStyle || buttonStyle === 'fill';
	const finalBgColor = backgroundColor || ( isFill ? 'var(--wp--preset--color--primary, #1e293b)' : 'transparent' );
	const finalTextColor = textColor || ( isFill ? '#ffffff' : 'var(--wp--preset--color--primary, #1e293b)' );
	const finalBorderColor = borderColor || ( isFill ? 'transparent' : 'var(--wp--preset--color--primary, #1e293b)' );

	const defaultPadding = {
		sm: { top: '8px', right: '16px', bottom: '8px', left: '16px' },
		md: { top: '12px', right: '24px', bottom: '12px', left: '24px' },
		lg: { top: '16px', right: '32px', bottom: '16px', left: '32px' },
	}[ buttonSize || 'md' ] || { top: '12px', right: '24px', bottom: '12px', left: '24px' };

	const finalPaddingTop = activePaddingTop !== undefined ? activePaddingTop : defaultPadding.top;
	const finalPaddingRight = activePaddingRight !== undefined ? activePaddingRight : defaultPadding.right;
	const finalPaddingBottom = activePaddingBottom !== undefined ? activePaddingBottom : defaultPadding.bottom;
	const finalPaddingLeft = activePaddingLeft !== undefined ? activePaddingLeft : defaultPadding.left;

	const btnClasses = [
		'gravisain-btn',
		'gravisain-advanced-button-inner',
		`gravisain-btn-${ buttonStyle || 'fill' }`,
		buttonSize !== 'custom' ? `gravisain-btn-${ buttonSize || 'md' }` : 'gravisain-btn-custom',
	];

	const btnStyles = {
		'--btn-bg': finalBgColor,
		'--btn-color': finalTextColor,
		'--btn-hover-bg': hoverBackgroundColor || finalBgColor,
		'--btn-hover-color': hoverTextColor || finalTextColor,
		'--btn-border-color': finalBorderColor,
		'--btn-hover-border-color': hoverBorderColor || finalBorderColor,
		'--btn-icon-gap': ( iconSpacing !== undefined ? iconSpacing : 8 ) + 'px',
		backgroundColor: finalBgColor,
		color: finalTextColor,
		borderColor: finalBorderColor,
		borderWidth: borderWidth !== undefined && borderWidth !== '' ? `${ borderWidth }px` : ( isFill ? '1px' : '2px' ),
		borderStyle: borderStyle && borderStyle !== 'none' ? borderStyle : 'solid',
		borderRadius: borderRadius !== undefined && borderRadius !== '' ? `${ borderRadius }px` : '9999px',
		paddingTop: finalPaddingTop,
		paddingRight: finalPaddingRight,
		paddingBottom: finalPaddingBottom,
		paddingLeft: finalPaddingLeft,
		fontFamily: typography?.fontFamily || undefined,
		fontSize: typography?.fontSize ? `${ typography.fontSize }px` : ( buttonSize === 'sm' ? '14px' : buttonSize === 'lg' ? '18px' : '16px' ),
		fontWeight: typography?.fontWeight || 600,
		lineHeight: typography?.lineHeight || 1.2,
		letterSpacing: typography?.letterSpacing ? `${ typography.letterSpacing }px` : undefined,
		textTransform: textTransform && textTransform !== 'none' ? textTransform : undefined,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		boxSizing: 'border-box',
		cursor: 'text',
		width: '100%',
	};

	return (
		<>
			<ButtonInspector attributes={ attributes } setAttributes={ setAttributes } />

			<div { ...blockProps }>
				<div 
					className={ btnClasses.join( ' ' ) }
					style={ btnStyles }
				>
					{ icon && iconPosition === 'left' && ( () => {
						const iconData = getIconMarkup( icon );
						if ( ! iconData ) return null;
						return (
							<span className="gravisain-btn-icon icon-left">
								{ iconData.type === 'image' ? (
									<img src={ iconData.src } alt="" style={ { width: '1em', height: '1em', objectFit: 'contain' } } />
								) : (
									<span dangerouslySetInnerHTML={ { __html: iconData.content } } style={ { width: '1em', height: '1em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } } />
								) }
							</span>
						);
					} )() }
					
					<RichText
						tagName="span"
						className="gravisain-btn-text"
						value={ text }
						onChange={ ( val ) => setAttributes( { text: val } ) }
						placeholder={ __( 'Button text...', 'gravisain-blocks' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>

					{ icon && iconPosition === 'right' && ( () => {
						const iconData = getIconMarkup( icon );
						if ( ! iconData ) return null;
						return (
							<span className="gravisain-btn-icon icon-right">
								{ iconData.type === 'image' ? (
									<img src={ iconData.src } alt="" style={ { width: '1em', height: '1em', objectFit: 'contain' } } />
								) : (
									<span dangerouslySetInnerHTML={ { __html: iconData.content } } style={ { width: '1em', height: '1em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } } />
								) }
							</span>
						);
					} )() }
				</div>
			</div>
		</>
	);
}
