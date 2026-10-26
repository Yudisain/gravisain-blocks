import { useEffect, useRef } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import ColumnInspector from './components/ColumnInspector';
import ColumnResizer from './components/ColumnResizer';
import SpacingVisualizer from '../row-layout/components/SpacingVisualizer';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

const getSpacing = ( spacing, side ) => {
	if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
	if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
		return typeof spacing === 'number' ? `${spacing}px` : spacing;
	}
	const val = spacing[ side ];
	if ( typeof val === 'number' ) return `${val}px`;
	return val || undefined;
};

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		width,
		widthTablet,
		widthMobile,
		verticalAlignment,
		horizontalAlignment,
		horizontalAlignmentTablet,
		horizontalAlignmentMobile,
		backgroundColor,
		textColor,
		backgroundImage,
		backgroundFocalPoint,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		borderWidth,
		borderColor,
		borderStyle,
		borderRadius,
		boxShadow,
		hoverEffect,
		hoverBackgroundColor,
		hoverBorderColor,
		anchor,
		customClassName,
		customCSS,
		isSticky,
		stickyDesktop,
		stickyTablet,
		stickyMobile,
		stickyOffset,
		stickyOffsetTablet,
		stickyOffsetMobile,
	} = attributes;

	const ref = useRef();

	const { previewDeviceType, hasInnerBlocks } = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return {
			previewDeviceType: editorDevice || postDevice || siteDevice || 'Desktop',
			hasInnerBlocks: select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks?.length > 0
		};
	}, [ clientId ] );

	const isDeviceSticky = isSticky && (
		previewDeviceType === 'Mobile'
			? ( stickyMobile === true )
			: previewDeviceType === 'Tablet'
			? ( stickyTablet !== false )
			: ( stickyDesktop !== false )
	);

	const activeHorizontalAlign =
		previewDeviceType === 'Mobile'
			? ( horizontalAlignmentMobile || horizontalAlignmentTablet || horizontalAlignment || '' )
			: previewDeviceType === 'Tablet'
			? ( horizontalAlignmentTablet || horizontalAlignment || '' )
			: ( horizontalAlignment || '' );

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-column',
			verticalAlignment ? `is-vertically-aligned-${ verticalAlignment }` : '',
			activeHorizontalAlign ? `has-text-align-${ activeHorizontalAlign }` : '',
			hoverEffect && hoverEffect !== 'none' ? `hover-${ hoverEffect }` : '',
			isDeviceSticky ? 'is-sticky' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			...( backgroundColor ? (
				backgroundColor.includes( 'gradient' )
					? { backgroundImage: backgroundImage ? `url(${ backgroundImage }), ${ backgroundColor }` : backgroundColor }
					: { backgroundColor, backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined }
			) : {
				backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined
			} ),
			color: textColor || undefined,
			backgroundSize: backgroundImage ? 'cover' : undefined,
			backgroundPosition: backgroundImage
				? ( backgroundFocalPoint ? `${Math.round(backgroundFocalPoint.x * 100)}% ${Math.round(backgroundFocalPoint.y * 100)}%` : 'center' )
				: undefined,

			// Desktop Spacing
			'--gravisain-col-pt': getSpacing( padding, 'top' ),
			'--gravisain-col-pr': getSpacing( padding, 'right' ),
			'--gravisain-col-pb': getSpacing( padding, 'bottom' ),
			'--gravisain-col-pl': getSpacing( padding, 'left' ),
			'--gravisain-col-mt': getSpacing( margin, 'top' ),
			'--gravisain-col-mr': getSpacing( margin, 'right' ),
			'--gravisain-col-mb': getSpacing( margin, 'bottom' ),
			'--gravisain-col-ml': getSpacing( margin, 'left' ),

			// Tablet Spacing Variables
			'--gravisain-col-pt-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-col-pr-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-col-pb-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-col-pl-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-col-mt-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-col-mr-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-col-mb-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-col-ml-tablet': getSpacing( marginTablet, 'left' ),

			// Mobile Spacing Variables
			'--gravisain-col-pt-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-col-pr-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-col-pb-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-col-pl-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-col-mt-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-col-mr-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-col-mb-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-col-ml-mobile': getSpacing( marginMobile, 'left' ),

			borderWidth: borderWidth ? `${ borderWidth }px` : undefined,
			borderColor: borderColor || undefined,
			borderStyle: borderWidth ? borderStyle : undefined,
			borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
			boxShadow: boxShadow || undefined,

			// Hover Effects
			'--gravisain-col-hover-bg': hoverBackgroundColor || undefined,
			'--gravisain-col-hover-border': hoverBorderColor || undefined,

			// Sticky Variables & Live Editor Styles
			'--gravisain-sticky-top': isSticky && stickyOffset !== undefined ? `${ stickyOffset }px` : undefined,
			'--gravisain-sticky-top-tablet': isSticky && stickyOffsetTablet !== undefined && stickyOffsetTablet !== '' ? `${ stickyOffsetTablet }px` : undefined,
			'--gravisain-sticky-top-mobile': isSticky && stickyOffsetMobile !== undefined && stickyOffsetMobile !== '' ? `${ stickyOffsetMobile }px` : undefined,
			position: isDeviceSticky ? 'sticky' : undefined,
			top: isDeviceSticky
				? ( previewDeviceType === 'Mobile' && stickyOffsetMobile !== undefined && stickyOffsetMobile !== ''
					? `${ stickyOffsetMobile }px`
					: ( previewDeviceType === 'Tablet' && stickyOffsetTablet !== undefined && stickyOffsetTablet !== ''
						? `${ stickyOffsetTablet }px`
						: `${ stickyOffset || 0 }px` ) )
				: undefined,
			alignSelf: isDeviceSticky && !verticalAlignment ? 'flex-start' : undefined,
			zIndex: isDeviceSticky ? 10 : undefined,

			// Horizontal Alignment
			'--gravisain-col-align': horizontalAlignment || undefined,
			'--gravisain-col-align-tablet': horizontalAlignmentTablet || undefined,
			'--gravisain-col-align-mobile': horizontalAlignmentMobile || undefined,
			textAlign: activeHorizontalAlign || undefined,

			...parseCustomCSS( customCSS ),
		},
		ref,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'gravisain-column-inner' },
		{
			templateLock: false,
			renderAppender: hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender
		}
	);

	return (
		<>
			<ColumnInspector { ...props } />
			<div { ...blockProps }>
				{ isSelected && (
					<SpacingVisualizer
						attributes={ attributes }
						setAttributes={ setAttributes }
						isSelected={ isSelected }
						blockRef={ ref }
						prefix="col"
					/>
				) }
				<div { ...innerBlocksProps } />
				<ColumnResizer clientId={ clientId } />
			</div>
		</>
	);
}
