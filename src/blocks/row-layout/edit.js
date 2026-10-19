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
import { useRef, useEffect } from '@wordpress/element';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { 
		columns, layoutPreset, alignItems, justifyContent, rowGap, rowGapTablet, rowGapMobile, stackOn,
		backgroundColor, backgroundColorTablet, backgroundColorMobile, 
		textColor, textColorTablet, textColorMobile, 
		padding, paddingTablet, paddingMobile, margin, marginTablet, marginMobile, 
		displayMode, displayModeTablet, displayModeMobile,
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
		hoverEffect, hoverBackgroundColor, hoverBorderColor,
		anchor, customClassName, customCSS,
		gridTemplate, gridTemplateTablet, gridTemplateMobile,
		isSticky, stickyDesktop, stickyTablet, stickyMobile, stickyOffset, stickyOffsetTablet, stickyOffsetMobile
	} = attributes;

	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
	
	const innerBlockCount = useSelect(
		( select ) => select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks?.length || 0,
		[ clientId ]
	);

	const TagName = htmlTag || 'div';

	const activeInnerWidth = useCustomContentWidth ? 'custom' : innerContentWidth;
	const blockRef = useRef( null );

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const isTablet = previewDeviceType === 'Tablet';
	const isMobile = previewDeviceType === 'Mobile';

	const isDeviceSticky = isSticky && (
		isMobile
			? ( stickyMobile === true )
			: isTablet
			? ( stickyTablet !== false )
			: ( stickyDesktop !== false )
	);

	const getActiveValue = ( base, tablet, mobile ) => {
		if ( isMobile ) return mobile !== undefined && mobile !== '' ? mobile : ( tablet !== undefined && tablet !== '' ? tablet : base );
		if ( isTablet ) return tablet !== undefined && tablet !== '' ? tablet : base;
		return base;
	};

	const activeDisplayMode = getActiveValue( displayMode || 'flex', displayModeTablet, displayModeMobile );
	let wrapperClass = `gravisain-row-layout is-display-${activeDisplayMode} has-${columns}-columns is-stacked-on-${stackOn} is-inner-width-${activeInnerWidth} ${ alignItems ? 'align-items-' + alignItems : '' } ${ justifyContent ? 'justify-content-' + justifyContent : '' }`;
	if ( hoverEffect && hoverEffect !== 'none' ) wrapperClass += ` hover-${ hoverEffect }`;
	if ( isDeviceSticky ) wrapperClass += ' is-sticky';
	if ( hideOnDesktop ) wrapperClass += ' gravisain-hide-desktop';
	if ( hideOnTablet ) wrapperClass += ' gravisain-hide-tablet';
	if ( hideOnMobile ) wrapperClass += ' gravisain-hide-mobile';
	if ( backgroundOverlay ) wrapperClass += ' has-background-overlay';
	if ( customClassName ) wrapperClass += ' ' + customClassName;

	const activeRowGap = getActiveValue( rowGap, rowGapTablet, rowGapMobile );
	const activeColumns = columns; // Columns don't stack using CSS variables here, they use classes.

	const activeBgColor = getActiveValue( backgroundColor, backgroundColorTablet, backgroundColorMobile );
	const activeBgImage = getActiveValue( backgroundImage?.url ? `url(${backgroundImage.url})` : undefined, backgroundImageTablet?.url ? `url(${backgroundImageTablet.url})` : undefined, backgroundImageMobile?.url ? `url(${backgroundImageMobile.url})` : undefined );
	const isBgGradient = typeof activeBgColor === 'string' && ( activeBgColor.includes( 'gradient' ) || activeBgColor.includes( 'radial' ) || activeBgColor.includes( 'linear' ) );

	const blockProps = useBlockProps( {
		ref: blockRef,
		id: anchor || undefined,
		className: wrapperClass,
		style: {
			'--gravisain-row-gap': activeRowGap + 'px',
			'--gravisain-gap-compensation': activeColumns > 1 ? `calc(${activeRowGap}px * ${activeColumns - 1} / ${activeColumns})` : '0px',
			
			...( activeBgColor ? (
				isBgGradient
					? { backgroundImage: activeBgImage ? `${activeBgImage}, ${activeBgColor}` : activeBgColor }
					: { backgroundColor: activeBgColor, backgroundImage: activeBgImage || undefined }
			) : {
				backgroundImage: activeBgImage || undefined
			} ),

			'--gravisain-bg-color': !isBgGradient ? ( activeBgColor || undefined ) : undefined,
			'--gravisain-bg-gradient': isBgGradient ? activeBgColor : undefined,
			'--gravisain-bg-image': activeBgImage || undefined,
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
			
			// Sticky Variables & Live Editor Styles
			'--gravisain-sticky-top': isSticky && stickyOffset !== undefined ? `${ stickyOffset }px` : undefined,
			'--gravisain-sticky-top-tablet': isSticky && stickyOffsetTablet !== undefined && stickyOffsetTablet !== '' ? `${ stickyOffsetTablet }px` : undefined,
			'--gravisain-sticky-top-mobile': isSticky && stickyOffsetMobile !== undefined && stickyOffsetMobile !== '' ? `${ stickyOffsetMobile }px` : undefined,
			position: isDeviceSticky ? 'sticky' : undefined,
			top: isDeviceSticky
				? ( isMobile && stickyOffsetMobile !== undefined && stickyOffsetMobile !== ''
					? `${ stickyOffsetMobile }px`
					: ( isTablet && stickyOffsetTablet !== undefined && stickyOffsetTablet !== ''
						? `${ stickyOffsetTablet }px`
						: `${ stickyOffset || 0 }px` ) )
				: undefined,
			zIndex: isDeviceSticky ? 100 : undefined,

			// Hover Variables
			'--gravisain-row-hover-bg': hoverBackgroundColor || undefined,
			'--gravisain-row-hover-border': hoverBorderColor || undefined,

			...parseCustomCSS( customCSS )
		}
	} );

	const setupColumns = ( preset, cols, tmpl ) => {
		const newBlocks = [];
		for ( let i = 0; i < cols; i++ ) {
			newBlocks.push( createBlock( 'gravisain/column', {} ) );
		}
		replaceInnerBlocks( clientId, newBlocks );
		setAttributes( { layoutPreset: preset, columns: cols, gridTemplate: tmpl } );
	};

	// Auto-recover old blocks and sync manually added/deleted columns
	useEffect(() => {
		if ( innerBlockCount > 0 ) {
			const currentTemplates = (gridTemplate || '').split(' ').filter(t => t.trim() !== '');
			
			// If number of columns OR number of grid template fragments doesn't match the inner blocks
			if ( innerBlockCount !== columns || currentTemplates.length !== innerBlockCount ) {
				let newTemplates = [...currentTemplates];
				
				if ( innerBlockCount > newTemplates.length ) {
					const diff = innerBlockCount - newTemplates.length;
					for ( let i = 0; i < diff; i++ ) {
						newTemplates.push('1fr');
					}
				} else if ( innerBlockCount < newTemplates.length ) {
					newTemplates = newTemplates.slice(0, innerBlockCount);
				}

				if ( newTemplates.length === 0 ) {
					newTemplates = Array(innerBlockCount).fill('1fr');
				}

				setAttributes({ 
					columns: innerBlockCount,
					gridTemplate: newTemplates.join(' ')
				});
			}
		}
	}, [ innerBlockCount, columns, gridTemplate, setAttributes ]);

	const innerBlocksProps = useInnerBlocksProps(
		{ 
			className: `gravisain-row-layout-inner gravisain-row-inner-${clientId}`,
			style: {
				display: activeDisplayMode === 'flex' ? 'grid' : 'flex',
				flexDirection: activeDisplayMode === 'block' ? 'column' : undefined,
				gridTemplateColumns: activeDisplayMode === 'flex' ? (getActiveValue( gridTemplate, gridTemplateTablet, gridTemplateMobile ) || '1fr') : undefined,
				gap: activeRowGap ? `${activeRowGap}px` : undefined,
				alignItems: activeDisplayMode === 'flex' ? alignItems : undefined,
				justifyContent: activeDisplayMode === 'flex' ? justifyContent : undefined
			}
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'horizontal',
			renderAppender: false
		}
	);

	const renderPresetBtn = ( preset, index ) => (
		<Tooltip text={ preset.label } key={ preset.name || index }>
			<button 
				type="button"
				className="gravisain-row-setup-btn"
				style={ {
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '108px',
					height: '54px',
					padding: 0,
					backgroundColor: 'transparent',
					border: '1.5px solid transparent',
					borderRadius: '4px',
					cursor: 'pointer',
					color: '#cbd5e1',
					boxSizing: 'border-box',
					boxShadow: 'none',
					outline: 'none',
					transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
				} }
				onMouseEnter={ ( e ) => {
					e.currentTarget.style.color = '#4f46e5';
					e.currentTarget.style.backgroundColor = '#f8fafc';
					e.currentTarget.style.borderColor = '#cbd5e1';
					e.currentTarget.style.transform = 'translateY(-2px)';
					e.currentTarget.style.boxShadow = '0 4px 10px -2px rgba(79, 70, 229, 0.15)';
				} }
				onMouseLeave={ ( e ) => {
					e.currentTarget.style.color = '#cbd5e1';
					e.currentTarget.style.backgroundColor = 'transparent';
					e.currentTarget.style.borderColor = 'transparent';
					e.currentTarget.style.transform = 'none';
					e.currentTarget.style.boxShadow = 'none';
				} }
				onClick={ () => setupColumns( preset.name, preset.cols, preset.gridTemplate ) }
				aria-label={ preset.label }
			>
				{ preset.icon }
			</button>
		</Tooltip>
	);

	if ( innerBlockCount === 0 ) {
		const row1Presets = layoutPresets.slice( 0, 4 );
		const row2Presets = layoutPresets.slice( 4, 8 );
		const row3Presets = layoutPresets.slice( 8, 11 );

		const rowStyle = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: '12px',
		};

		return (
			<TagName { ...blockProps }>
				<div 
					className="gravisain-row-setup-container"
					style={ {
						border: '1px dashed #cbd5e1',
						backgroundColor: '#ffffff',
						padding: '28px 24px 32px',
						borderRadius: '6px',
						textAlign: 'center',
						boxSizing: 'border-box',
						width: '100%',
						margin: '0 auto',
					} }
				>
					<div 
						className="gravisain-row-setup-title"
						style={ {
							fontSize: '13px',
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.8px',
							color: '#334155',
							marginBottom: '22px',
							userSelect: 'none',
							lineHeight: 1.4,
							textAlign: 'center',
						} }
					>
						{ __( 'SELECT YOUR LAYOUT', 'gravisain' ) }
					</div>
					<div 
						className="gravisain-row-setup-grid"
						style={ {
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '12px',
							maxWidth: '560px',
							margin: '0 auto',
						} }
					>
						<div className="gravisain-row-setup-row" style={ rowStyle }>
							{ row1Presets.map( ( p, i ) => renderPresetBtn( p, i ) ) }
						</div>
						<div className="gravisain-row-setup-row" style={ rowStyle }>
							{ row2Presets.map( ( p, i ) => renderPresetBtn( p, i + 4 ) ) }
						</div>
						<div className="gravisain-row-setup-row" style={ rowStyle }>
							{ row3Presets.map( ( p, i ) => renderPresetBtn( p, i + 8 ) ) }
						</div>
					</div>
				</div>
			</TagName>
		);
	}

	return (
		<>
			<BlockControls>
				{ activeDisplayMode === 'flex' && (
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
							height: `${ topShapeDivider.height || 100 }px`,
							width: `${ topShapeDivider.width || 100 }%`,
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
							height: `${ bottomShapeDivider.height || 100 }px`,
							width: `${ bottomShapeDivider.width || 100 }%`,
							transform: `translateX(-50%) ${ bottomShapeDivider.flipH ? 'scaleX(-1)' : '' } ${ bottomShapeDivider.flipV ? 'scaleY(-1)' : '' }`
						}}
						dangerouslySetInnerHTML={{ __html: SHAPES[ bottomShapeDivider.type ].svg }}
					/>
				) }
			</TagName>
		</>
	);
}
