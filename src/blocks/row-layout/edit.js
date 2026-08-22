import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
import { Button, Placeholder, Tooltip } from '@wordpress/components';
import RowInspector from './components/RowInspector';
import { layoutPresets } from './components/LayoutIcons';
import { SHAPES } from '../../controls/shapes';
import parseCustomCSS from '../../controls/parseCustomCSS';
import SpacingVisualizer from './components/SpacingVisualizer';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/column' ];

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
import { useRef } from '@wordpress/element';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { 
		columns, layoutPreset, alignItems, justifyContent, rowGap, rowGapTablet, rowGapMobile, stackOn,
		backgroundColor, backgroundColorTablet, backgroundColorMobile, 
		textColor, textColorTablet, textColorMobile, 
		padding, paddingTablet, paddingMobile, margin, marginTablet, marginMobile, displayMode,
		backgroundImage, backgroundImageTablet, backgroundImageMobile, 
		backgroundPosition, backgroundPositionTablet, backgroundPositionMobile, 
		backgroundSize, backgroundSizeTablet, backgroundSizeMobile, 
		backgroundAttachment, backgroundAttachmentTablet, backgroundAttachmentMobile,
		backgroundOverlay, backgroundOverlayTablet, backgroundOverlayMobile, 
		backgroundOverlayOpacity, backgroundOverlayOpacityTablet, backgroundOverlayOpacityMobile,
		topShapeDivider, bottomShapeDivider, hideOnDesktop, hideOnTablet, hideOnMobile,
		innerContentWidth, useCustomContentWidth, customContentMaxWidth, htmlTag, 
		borderRadius, borderRadiusTablet, borderRadiusMobile, 
		borderStyle, borderStyleTablet, borderStyleMobile, 
		borderWidth, borderWidthTablet, borderWidthMobile, 
		borderColor, borderColorTablet, borderColorMobile, 
		boxShadow, boxShadowTablet, boxShadowMobile,
		anchor, customClassName, customCSS
	} = attributes;

	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
	
	const innerBlockCount = useSelect(
		( select ) => select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks?.length || 0,
		[ clientId ]
	);

	const TagName = htmlTag || 'div';

	const activeInnerWidth = useCustomContentWidth ? 'custom' : innerContentWidth;
	let wrapperClass = `gravisain-row-layout is-display-${displayMode} has-${columns}-columns is-stacked-on-${stackOn} is-inner-width-${activeInnerWidth} ${ alignItems ? 'align-items-' + alignItems : '' } ${ justifyContent ? 'justify-content-' + justifyContent : '' }`;
	if ( hideOnDesktop ) wrapperClass += ' gravisain-hide-desktop';
	if ( hideOnTablet ) wrapperClass += ' gravisain-hide-tablet';
	if ( hideOnMobile ) wrapperClass += ' gravisain-hide-mobile';
	if ( backgroundOverlay ) wrapperClass += ' has-background-overlay';
	if ( customClassName ) wrapperClass += ' ' + customClassName;

	const blockRef = useRef( null );

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const isTablet = previewDeviceType === 'Tablet';
	const isMobile = previewDeviceType === 'Mobile';

	const getActiveValue = ( base, tablet, mobile ) => {
		if ( isMobile ) return mobile !== undefined && mobile !== '' ? mobile : ( tablet !== undefined && tablet !== '' ? tablet : base );
		if ( isTablet ) return tablet !== undefined && tablet !== '' ? tablet : base;
		return base;
	};

	const activeRowGap = getActiveValue( rowGap, rowGapTablet, rowGapMobile );
	const activeColumns = columns; // Columns don't stack using CSS variables here, they use classes.

	const blockProps = useBlockProps( {
		ref: blockRef,
		id: anchor || undefined,
		className: wrapperClass,
		style: {
			'--gravisain-row-gap': activeRowGap + 'px',
			'--gravisain-gap-compensation': activeColumns > 1 ? `calc(${activeRowGap}px * ${activeColumns - 1} / ${activeColumns})` : '0px',
			
			'--gravisain-bg-color': getActiveValue( backgroundColor, backgroundColorTablet, backgroundColorMobile ) || undefined,
			'--gravisain-bg-image': getActiveValue( backgroundImage?.url ? `url(${backgroundImage.url})` : undefined, backgroundImageTablet?.url ? `url(${backgroundImageTablet.url})` : undefined, backgroundImageMobile?.url ? `url(${backgroundImageMobile.url})` : undefined ) || undefined,
			'--gravisain-bg-position': getActiveValue( backgroundPosition, backgroundPositionTablet, backgroundPositionMobile ) || undefined,
			'--gravisain-bg-size': getActiveValue( backgroundSize, backgroundSizeTablet, backgroundSizeMobile ) || undefined,
			'--gravisain-bg-attachment': getActiveValue( backgroundAttachment, backgroundAttachmentTablet, backgroundAttachmentMobile ) || undefined,
			
			'--gravisain-bg-overlay': getActiveValue( backgroundOverlay, backgroundOverlayTablet, backgroundOverlayMobile ) || undefined,
			'--gravisain-bg-overlay-opacity': getActiveValue( backgroundOverlayOpacity !== undefined ? backgroundOverlayOpacity / 100 : undefined, backgroundOverlayOpacityTablet !== undefined ? backgroundOverlayOpacityTablet / 100 : undefined, backgroundOverlayOpacityMobile !== undefined ? backgroundOverlayOpacityMobile / 100 : undefined ),
			
			'--gravisain-text-color': getActiveValue( textColor, textColorTablet, textColorMobile ) || undefined,
			
			'--gravisain-padding-top': getActiveValue( getSpacing( padding, 'top' ), getSpacing( paddingTablet, 'top' ), getSpacing( paddingMobile, 'top' ) ),
			'--gravisain-padding-right': getActiveValue( getSpacing( padding, 'right' ), getSpacing( paddingTablet, 'right' ), getSpacing( paddingMobile, 'right' ) ),
			'--gravisain-padding-bottom': getActiveValue( getSpacing( padding, 'bottom' ), getSpacing( paddingTablet, 'bottom' ), getSpacing( paddingMobile, 'bottom' ) ),
			'--gravisain-padding-left': getActiveValue( getSpacing( padding, 'left' ), getSpacing( paddingTablet, 'left' ), getSpacing( paddingMobile, 'left' ) ),
			
			'--gravisain-margin-top': getActiveValue( getSpacing( margin, 'top' ), getSpacing( marginTablet, 'top' ), getSpacing( marginMobile, 'top' ) ),
			'--gravisain-margin-right': getActiveValue( getSpacing( margin, 'right' ), getSpacing( marginTablet, 'right' ), getSpacing( marginMobile, 'right' ) ),
			'--gravisain-margin-bottom': getActiveValue( getSpacing( margin, 'bottom' ), getSpacing( marginTablet, 'bottom' ), getSpacing( marginMobile, 'bottom' ) ),
			'--gravisain-margin-left': getActiveValue( getSpacing( margin, 'left' ), getSpacing( marginTablet, 'left' ), getSpacing( marginMobile, 'left' ) ),

			'--gravisain-custom-inner-width': useCustomContentWidth && customContentMaxWidth ? `${customContentMaxWidth}px` : undefined,

			'--gravisain-border-radius': getActiveValue( borderRadius ? `${borderRadius}px` : undefined, borderRadiusTablet ? `${borderRadiusTablet}px` : undefined, borderRadiusMobile ? `${borderRadiusMobile}px` : undefined ),
			
			'--gravisain-border-style': getActiveValue( borderStyle !== 'none' ? borderStyle : undefined, borderStyleTablet !== 'none' ? borderStyleTablet : undefined, borderStyleMobile !== 'none' ? borderStyleMobile : undefined ),
			'--gravisain-border-width': getActiveValue( borderStyle !== 'none' && borderWidth ? `${borderWidth}px` : undefined, borderStyleTablet !== 'none' && borderWidthTablet ? `${borderWidthTablet}px` : undefined, borderStyleMobile !== 'none' && borderWidthMobile ? `${borderWidthMobile}px` : undefined ),
			'--gravisain-border-color': getActiveValue( borderStyle !== 'none' && borderColor ? borderColor : undefined, borderStyleTablet !== 'none' && borderColorTablet ? borderColorTablet : undefined, borderStyleMobile !== 'none' && borderColorMobile ? borderColorMobile : undefined ),
			
			'--gravisain-box-shadow': getActiveValue( boxShadow !== 'none' ? boxShadow : undefined, boxShadowTablet !== 'none' ? boxShadowTablet : undefined, boxShadowMobile !== 'none' ? boxShadowMobile : undefined ),
			
			...parseCustomCSS( customCSS )
		}
	} );

	const setupColumns = ( preset, cols, widths ) => {
		const newBlocks = widths.map( ( w ) => createBlock( 'gravisain/column', { width: w } ) );
		replaceInnerBlocks( clientId, newBlocks );
		setAttributes( { layoutPreset: preset, columns: cols } );
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: `gravisain-row-layout-inner gravisain-row-inner-${clientId}` },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: displayMode === 'flex' ? 'horizontal' : 'vertical',
			renderAppender: InnerBlocks.ButtonBlockAppender
		}
	);

	if ( innerBlockCount === 0 ) {
		return (
			<TagName { ...blockProps }>
				<Placeholder
					icon="grid-view"
					label={ __( 'Select Layout', 'gravisain' ) }
					instructions={ __( 'Easy layouts responsive grid with columns option.', 'gravisain' ) }
				>
					<div className="gravisain-layout-selector">
						{ layoutPresets.map( ( preset, index ) => (
							<Tooltip text={ preset.label } key={ index }>
								<Button 
									className="gravisain-layout-btn"
									onClick={ () => setupColumns( preset.name, preset.cols, preset.widths ) }
								>
									{ preset.icon }
								</Button>
							</Tooltip>
						) ) }
					</div>
				</Placeholder>
			</TagName>
		);
	}

	return (
		<>
			<BlockControls>
				{ displayMode === 'flex' && (
					<BlockVerticalAlignmentToolbar
						value={ alignItems === 'flex-start' ? 'top' : alignItems === 'flex-end' ? 'bottom' : alignItems === 'center' ? 'center' : undefined }
						onChange={ ( val ) => {
							let flexVal = '';
							if ( val === 'top' ) flexVal = 'flex-start';
							if ( val === 'center' ) flexVal = 'center';
							if ( val === 'bottom' ) flexVal = 'flex-end';
							setAttributes( { alignItems: flexVal } );
						} }
					/>
				) }
			</BlockControls>
			<RowInspector { ...props } />
			{ useCustomContentWidth && customContentMaxWidth && (
				<style>
					{`
						.gravisain-row-inner-${ clientId } {
							max-width: ${ customContentMaxWidth }px !important;
							margin: 0 auto !important;
						}
					`}
				</style>
			) }
			<TagName { ...blockProps }>
				<SpacingVisualizer 
					attributes={ attributes } 
					setAttributes={ setAttributes } 
					isSelected={ props.isSelected } 
					blockRef={ blockRef }
				/>
				{ topShapeDivider?.type && topShapeDivider.type !== 'none' && SHAPES[ topShapeDivider.type ] && (
					<div 
						className="gravisain-shape-divider gravisain-shape-top"
						style={{ 
							color: topShapeDivider.color, 
							height: `${ topShapeDivider.height }px`,
							width: `${ topShapeDivider.width }%`,
							transform: `translateX(-50%) ${ topShapeDivider.flipH ? 'scaleX(-1)' : '' } ${ topShapeDivider.flipV ? 'scaleY(-1)' : '' }`
						}}
						dangerouslySetInnerHTML={{ __html: SHAPES[ topShapeDivider.type ].svg }}
					/>
				) }
				<div { ...innerBlocksProps } />
				{ bottomShapeDivider?.type && bottomShapeDivider.type !== 'none' && SHAPES[ bottomShapeDivider.type ] && (
					<div 
						className="gravisain-shape-divider gravisain-shape-bottom"
						style={{ 
							color: bottomShapeDivider.color, 
							height: `${ bottomShapeDivider.height }px`,
							width: `${ bottomShapeDivider.width }%`,
							transform: `translateX(-50%) ${ bottomShapeDivider.flipH ? 'scaleX(-1)' : '' } ${ bottomShapeDivider.flipV ? 'scaleY(-1)' : '' }`
						}}
						dangerouslySetInnerHTML={{ __html: SHAPES[ bottomShapeDivider.type ].svg }}
					/>
				) }
			</TagName>
		</>
	);
}
