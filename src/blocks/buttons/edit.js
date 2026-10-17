import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import ButtonsInspector from './components/ButtonsInspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/advanced-button' ];

export default function Edit( { attributes, setAttributes } ) {
	const { 
		layout = 'horizontal', 
		layoutTablet = '',
		layoutMobile = '',
		justifyContent = 'flex-start', 
		justifyContentTablet = '',
		justifyContentMobile = '',
		gap = 16, 
		gapTablet,
		gapMobile,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		anchor, 
		customClassName, 
		customCSS 
	} = attributes;

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

	const getActiveLayout = () => {
		if ( device === 'mobile' && layoutMobile ) return layoutMobile;
		if ( ( device === 'mobile' || device === 'tablet' ) && layoutTablet ) return layoutTablet;
		return layout || 'horizontal';
	};

	const getActiveJustify = () => {
		if ( device === 'mobile' && justifyContentMobile ) return justifyContentMobile;
		if ( ( device === 'mobile' || device === 'tablet' ) && justifyContentTablet ) return justifyContentTablet;
		return justifyContent || 'flex-start';
	};

	const getActiveGap = () => {
		if ( device === 'mobile' && gapMobile !== undefined && gapMobile !== '' ) return gapMobile;
		if ( ( device === 'mobile' || device === 'tablet' ) && gapTablet !== undefined && gapTablet !== '' ) return gapTablet;
		return gap !== undefined ? gap : 16;
	};

	const activeLayout = getActiveLayout();
	const isHorizontal = activeLayout === 'horizontal';
	const activeJustify = getActiveJustify();
	const activeGap = getActiveGap();

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

	const blockProps = useBlockProps( {
		ref: blockRef,
		id: anchor || undefined,
		className: `gravisain-buttons-wrapper is-layout-${activeLayout} ${customClassName || ''}`.trim(),
		style: {
			'--buttons-justify': activeJustify,
			'--buttons-gap': `${activeGap}px`,
			'--gravisain-buttons-padding-top': getSpacing( padding, 'top' ),
			'--gravisain-buttons-padding-right': getSpacing( padding, 'right' ),
			'--gravisain-buttons-padding-bottom': getSpacing( padding, 'bottom' ),
			'--gravisain-buttons-padding-left': getSpacing( padding, 'left' ),
			'--gravisain-buttons-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-buttons-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-buttons-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-buttons-margin-left': getSpacing( margin, 'left' ),
			'--gravisain-buttons-padding-top-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-buttons-padding-right-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-buttons-padding-bottom-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-buttons-padding-left-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-buttons-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-buttons-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-buttons-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-buttons-margin-left-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-buttons-padding-top-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-buttons-padding-right-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-buttons-padding-bottom-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-buttons-padding-left-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-buttons-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-buttons-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-buttons-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-buttons-margin-left-mobile': getSpacing( marginMobile, 'left' ),
			marginTop: activeMarginTop,
			marginBottom: activeMarginBottom,
			marginLeft: activeMarginLeft,
			marginRight: activeMarginRight,
			paddingTop: activePaddingTop,
			paddingBottom: activePaddingBottom,
			paddingLeft: activePaddingLeft,
			paddingRight: activePaddingRight,
			display: 'flex',
			flexDirection: isHorizontal ? 'row' : 'column',
			flexWrap: isHorizontal ? 'wrap' : undefined,
			alignItems: isHorizontal ? 'center' : 'stretch',
			justifyContent: activeJustify,
			gap: `${activeGap}px`,
			...parseCustomCSS( customCSS )
		}
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: activeLayout,
		renderAppender: InnerBlocks.ButtonBlockAppender,
		template: [ [ 'gravisain/advanced-button' ] ],
	} );

	return (
		<>
			<ButtonsInspector attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...innerBlocksProps } />
		</>
	);
}
