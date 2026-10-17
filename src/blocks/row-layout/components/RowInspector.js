import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, RangeControl, Tooltip, Button, ToggleControl, TextControl, TextareaControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { layoutPresets } from './LayoutIcons';
import ColorControl from '../../../controls/ColorControl';
import SpacingControl from '../../../controls/SpacingControl';
import ShapeDividerControl from '../../../controls/ShapeDividerControl';
import BackgroundControl from '../../../controls/BackgroundControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';
import StickyControl from '../../../controls/StickyControl';
export default function RowInspector( { attributes, setAttributes, clientId } ) {
	const { 
		alignItems, justifyContent, rowGap, rowGapTablet, rowGapMobile, stackOn, columns, layoutPreset,
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
		anchor, customClassName, customCSS,
		isSticky, stickyOffset, stickyOffsetTablet, stickyOffsetMobile,
		hoverEffect, hoverBackgroundColor, hoverBorderColor
	} = attributes;

	const setResponsiveAttr = ( baseName, val, device ) => {
		if ( device === 'desktop' ) setAttributes( { [baseName]: val } );
		if ( device === 'tablet' ) setAttributes( { [`${baseName}Tablet`]: val } );
		if ( device === 'mobile' ) setAttributes( { [`${baseName}Mobile`]: val } );
	};

	const getResponsiveAttr = ( baseName, device ) => {
		if ( device === 'desktop' ) return attributes[baseName];
		if ( device === 'tablet' ) return attributes[`${baseName}Tablet`];
		if ( device === 'mobile' ) return attributes[`${baseName}Mobile`];
	};

	const getInheritedImage = ( device ) => {
		if ( device === 'desktop' ) return backgroundImage;
		if ( device === 'tablet' ) return backgroundImageTablet?.url ? backgroundImageTablet : backgroundImage;
		if ( device === 'mobile' ) return backgroundImageMobile?.url ? backgroundImageMobile : ( backgroundImageTablet?.url ? backgroundImageTablet : backgroundImage );
		return backgroundImage;
	};

	const innerBlocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks || [], [ clientId ] );
	const { insertBlocks, removeBlocks, updateBlockAttributes } = useDispatch( 'core/block-editor' );
	
	// ... (changeLayout code)
	const changeLayout = ( preset, newCols, gridTemplate ) => {
		setAttributes( { layoutPreset: preset, columns: newCols, gridTemplate } );
		
		const currentCols = innerBlocks.length;
		
		if ( newCols > currentCols ) {
			const newBlocks = [];
			for ( let i = 0; i < ( newCols - currentCols ); i++ ) {
				newBlocks.push( createBlock( 'gravisain/column', {} ) );
			}
			insertBlocks( newBlocks, currentCols, clientId );
		} 
		else if ( newCols < currentCols ) {
			const blocksToRemove = [];
			for ( let i = newCols; i < currentCols; i++ ) {
				blocksToRemove.push( innerBlocks[ i ].clientId );
			}
			removeBlocks( blocksToRemove );
		}
	};

	const [ activeTab, setActiveTab ] = wp.element.useState( 'general' );

	return (
		<InspectorControls>
			<div className="gravisain-inspector-tabs">
				<div className="components-tab-panel__tabs" role="tablist" style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: '16px' }}>
					<Button
						className={`components-button components-tab-panel__tabs-item ${ activeTab === 'general' ? 'is-active active-tab' : '' }`}
						onClick={ () => setActiveTab('general') }
						style={{ flex: 1, justifyContent: 'center', borderRadius: 0, padding: '12px 0' }}
					>
						{ __('General', 'gravisain') }
					</Button>
					<Button
						className={`components-button components-tab-panel__tabs-item ${ activeTab === 'style' ? 'is-active active-tab' : '' }`}
						onClick={ () => setActiveTab('style') }
						style={{ flex: 1, justifyContent: 'center', borderRadius: 0, padding: '12px 0' }}
					>
						{ __('Style', 'gravisain') }
					</Button>
					<Button
						className={`components-button components-tab-panel__tabs-item ${ activeTab === 'advanced' ? 'is-active active-tab' : '' }`}
						onClick={ () => setActiveTab('advanced') }
						style={{ flex: 1, justifyContent: 'center', borderRadius: 0, padding: '12px 0' }}
					>
						{ __('Advanced', 'gravisain') }
					</Button>
				</div>
				
				<div className="components-tab-panel__tab-content">
					{ activeTab === 'general' && (
						<>
							<PanelBody title={ __( 'Layout Settings', 'gravisain' ) } initialOpen={ true }>
								<ResponsiveTabControl>
									{ ( device ) => (
										<SelectControl
											label={ __( 'Display Mode', 'gravisain' ) + ( device !== 'desktop' ? ` (${ device.charAt(0).toUpperCase() + device.slice(1) })` : '' ) }
											value={ getResponsiveAttr( 'displayMode', device ) !== undefined ? getResponsiveAttr( 'displayMode', device ) : ( device === 'desktop' ? 'flex' : '' ) }
											options={ device === 'desktop' ? [
												{ label: __( 'Flex (Default)', 'gravisain' ), value: 'flex' },
												{ label: __( 'Block', 'gravisain' ), value: 'block' },
											] : [
												{ label: __( 'Inherit', 'gravisain' ), value: '' },
												{ label: __( 'Flex', 'gravisain' ), value: 'flex' },
												{ label: __( 'Block', 'gravisain' ), value: 'block' },
											] }
											onChange={ ( value ) => setResponsiveAttr( 'displayMode', value, device ) }
										/>
									) }
								</ResponsiveTabControl>
								<SelectControl
									label={ __( 'HTML Tag', 'gravisain' ) }
									value={ htmlTag }
									options={ [
										{ label: 'div', value: 'div' },
										{ label: 'section', value: 'section' },
										{ label: 'header', value: 'header' },
										{ label: 'footer', value: 'footer' },
										{ label: 'main', value: 'main' },
										{ label: 'article', value: 'article' },
										{ label: 'aside', value: 'aside' },
									] }
									onChange={ ( value ) => setAttributes( { htmlTag: value } ) }
								/>
								<ToggleControl
									label={ __( 'Custom Content Max Width', 'gravisain' ) }
									checked={ useCustomContentWidth }
									onChange={ ( val ) => setAttributes( { useCustomContentWidth: val } ) }
								/>
								{ useCustomContentWidth ? (
									<RangeControl
										label={ __( 'Max Width (px)', 'gravisain' ) }
										value={ customContentMaxWidth }
										onChange={ ( val ) => setAttributes( { customContentMaxWidth: val } ) }
										min={ 200 }
										max={ 2000 }
									/>
								) : (
									<SelectControl
										label={ __( 'Inner Content Width', 'gravisain' ) }
										value={ innerContentWidth }
										options={ [
											{ label: __( 'Theme (Constrained)', 'gravisain' ), value: 'theme' },
											{ label: __( 'Full Width', 'gravisain' ), value: 'full' },
										] }
										onChange={ ( value ) => setAttributes( { innerContentWidth: value } ) }
										help={ __( 'Theme width constrains content to the site max-width. Full width stretches content to screen edges.', 'gravisain' ) }
									/>
								) }
								{ ( displayMode || 'flex' ) === 'flex' && (
									<>
										<SelectControl
											label={ __( 'Vertical Alignment', 'gravisain' ) }
									value={ alignItems }
									options={ [
										{ label: __( 'Stretch (Default)', 'gravisain' ), value: '' },
										{ label: __( 'Top', 'gravisain' ), value: 'flex-start' },
										{ label: __( 'Center', 'gravisain' ), value: 'center' },
										{ label: __( 'Bottom', 'gravisain' ), value: 'flex-end' },
									] }
									onChange={ ( value ) => setAttributes( { alignItems: value } ) }
								/>
								<SelectControl
									label={ __( 'Horizontal Alignment', 'gravisain' ) }
									value={ justifyContent }
									options={ [
										{ label: __( 'Start (Default)', 'gravisain' ), value: '' },
										{ label: __( 'Center', 'gravisain' ), value: 'center' },
										{ label: __( 'Space Between', 'gravisain' ), value: 'space-between' },
									] }
									onChange={ ( value ) => setAttributes( { justifyContent: value } ) }
								/>
								</>
								) }
								<hr />
								<ResponsiveTabControl>
									{ ( device ) => (
										<RangeControl
											label={ __( 'Column Gap (px)', 'gravisain' ) }
											value={ device === 'desktop' ? rowGap : device === 'tablet' ? rowGapTablet : rowGapMobile }
											onChange={ ( value ) => {
												if ( device === 'desktop' ) setAttributes( { rowGap: value } );
												if ( device === 'tablet' ) setAttributes( { rowGapTablet: value } );
												if ( device === 'mobile' ) setAttributes( { rowGapMobile: value } );
											} }
											min={ 0 }
											max={ 100 }
										/>
									) }
								</ResponsiveTabControl>
								<SelectControl
									label={ __( 'Stack on', 'gravisain' ) }
									value={ stackOn }
									options={ [
										{ label: __( 'Mobile (Default)', 'gravisain' ), value: 'mobile' },
										{ label: __( 'Tablet & Mobile', 'gravisain' ), value: 'tablet' },
										{ label: __( 'Never (No stacking)', 'gravisain' ), value: 'none' },
									] }
									onChange={ ( value ) => setAttributes( { stackOn: value } ) }
									help={ __( 'Select at which screen size the columns should stack vertically.', 'gravisain' ) }
								/>
							</PanelBody>

							<StickyControl
								attributes={ attributes }
								setAttributes={ setAttributes }
								helpText={ __( 'This will stick the row to viewport while scrolling.', 'gravisain' ) }
							/>

							<PanelBody title={ __( 'Change Layout', 'gravisain' ) } initialOpen={ false }>
								<div className="gravisain-layout-selector">
									{ layoutPresets.map( ( preset, index ) => {
										const isActive = layoutPreset === preset.name;
										return (
											<Tooltip text={ preset.label } key={ index }>
												<Button 
													className={ `gravisain-layout-btn ${ isActive ? 'is-active' : '' }` }
													onClick={ () => changeLayout( preset.name, preset.cols, preset.gridTemplate ) }
												>
													{ preset.icon }
												</Button>
											</Tooltip>
										);
									} ) }
								</div>
							</PanelBody>
						</>
					) }

					{ activeTab === 'style' && (
						<>
							<PanelBody title={ __( 'Colors', 'gravisain' ) } initialOpen={ true }>
								<ResponsiveTabControl>
									{ ( device ) => (
										<>
											<ColorControl
												label={ __( 'Background Color', 'gravisain' ) }
												value={ getResponsiveAttr( 'backgroundColor', device ) }
												onChange={ ( val ) => setResponsiveAttr( 'backgroundColor', val, device ) }
											/>
											<ColorControl
												label={ __( 'Text Color', 'gravisain' ) }
												value={ getResponsiveAttr( 'textColor', device ) }
												onChange={ ( val ) => setResponsiveAttr( 'textColor', val, device ) }
												disableGradient={ true }
											/>
										</>
									) }
								</ResponsiveTabControl>
							</PanelBody>

							<PanelBody title={ __( 'Background Settings', 'gravisain' ) } initialOpen={ false }>
								<ResponsiveTabControl>
									{ ( device ) => (
										<BackgroundControl
											backgroundImage={ getResponsiveAttr( 'backgroundImage', device ) }
											inheritedImage={ getInheritedImage( device ) }
											backgroundPosition={ getResponsiveAttr( 'backgroundPosition', device ) }
											backgroundSize={ getResponsiveAttr( 'backgroundSize', device ) }
											backgroundAttachment={ getResponsiveAttr( 'backgroundAttachment', device ) }
											backgroundOverlay={ getResponsiveAttr( 'backgroundOverlay', device ) }
											backgroundOverlayOpacity={ getResponsiveAttr( 'backgroundOverlayOpacity', device ) }
											onChangeImage={ ( val ) => setResponsiveAttr( 'backgroundImage', val, device ) }
											onChangePosition={ ( val ) => setResponsiveAttr( 'backgroundPosition', val, device ) }
											onChangeSize={ ( val ) => setResponsiveAttr( 'backgroundSize', val, device ) }
											onChangeAttachment={ ( val ) => setResponsiveAttr( 'backgroundAttachment', val, device ) }
											onChangeOverlay={ ( val ) => setResponsiveAttr( 'backgroundOverlay', val, device ) }
											onChangeOverlayOpacity={ ( val ) => setResponsiveAttr( 'backgroundOverlayOpacity', val, device ) }
										/>
									) }
								</ResponsiveTabControl>
							</PanelBody>

							<PanelBody title={ __( 'Border & Shadow', 'gravisain' ) } initialOpen={ false }>
								<ResponsiveTabControl>
									{ ( device ) => (
										<>
											<RangeControl
												label={ __( 'Border Radius (px)', 'gravisain' ) }
												value={ getResponsiveAttr( 'borderRadius', device ) }
												onChange={ ( val ) => setResponsiveAttr( 'borderRadius', val, device ) }
												min={ 0 }
												max={ 200 }
											/>
											<SelectControl
												label={ __( 'Border Style', 'gravisain' ) }
												value={ getResponsiveAttr( 'borderStyle', device ) }
												options={ [
													{ label: __( 'None', 'gravisain' ), value: 'none' },
													{ label: __( 'Solid', 'gravisain' ), value: 'solid' },
													{ label: __( 'Dashed', 'gravisain' ), value: 'dashed' },
													{ label: __( 'Dotted', 'gravisain' ), value: 'dotted' },
												] }
												onChange={ ( val ) => setResponsiveAttr( 'borderStyle', val, device ) }
											/>
											{ getResponsiveAttr( 'borderStyle', device ) !== 'none' && (
												<>
													<RangeControl
														label={ __( 'Border Width (px)', 'gravisain' ) }
														value={ getResponsiveAttr( 'borderWidth', device ) }
														onChange={ ( val ) => setResponsiveAttr( 'borderWidth', val, device ) }
														min={ 0 }
														max={ 20 }
													/>
													<ColorControl
														label={ __( 'Border Color', 'gravisain' ) }
														value={ getResponsiveAttr( 'borderColor', device ) }
														onChange={ ( val ) => setResponsiveAttr( 'borderColor', val, device ) }
														disableGradient={ true }
													/>
												</>
											) }
											<hr />
											<SelectControl
												label={ __( 'Box Shadow', 'gravisain' ) }
												value={ getResponsiveAttr( 'boxShadow', device ) }
												options={ [
													{ label: __( 'None', 'gravisain' ), value: 'none' },
													{ label: __( 'Soft Shadow', 'gravisain' ), value: '0 4px 12px rgba(0,0,0,0.1)' },
													{ label: __( 'Medium Shadow', 'gravisain' ), value: '0 8px 24px rgba(0,0,0,0.12)' },
													{ label: __( 'Hard Shadow', 'gravisain' ), value: '0 12px 36px rgba(0,0,0,0.15)' },
												] }
												onChange={ ( val ) => setResponsiveAttr( 'boxShadow', val, device ) }
											/>
										</>
									) }
								</ResponsiveTabControl>
							</PanelBody>

							<PanelBody title={ __( 'Hover & Interactive Effects', 'gravisain' ) } initialOpen={ false }>
								<SelectControl
									label={ __( 'Row Hover Effect', 'gravisain' ) }
									value={ hoverEffect || 'none' }
									options={ [
										{ label: __( 'None (Static)', 'gravisain' ), value: 'none' },
										{ label: __( 'Lift Up (Terangkat ke atas)', 'gravisain' ), value: 'lift' },
										{ label: __( 'Scale Up (Zoom/Membesar)', 'gravisain' ), value: 'scale' },
										{ label: __( 'Border Glow (Cahaya border)', 'gravisain' ), value: 'border-glow' },
									] }
									onChange={ ( val ) => setAttributes( { hoverEffect: val } ) }
								/>
								{ hoverEffect === 'border-glow' && (
									<ColorControl
										label={ __( 'Hover Glow Color', 'gravisain' ) }
										value={ hoverBorderColor }
										onChange={ ( val ) => setAttributes( { hoverBorderColor: val } ) }
										disableGradient={ true }
									/>
								) }
								<ColorControl
									label={ __( 'Hover Background Color', 'gravisain' ) }
									value={ hoverBackgroundColor }
									onChange={ ( val ) => setAttributes( { hoverBackgroundColor: val } ) }
								/>
							</PanelBody>
							
							<PanelBody title={ __( 'Shape Dividers', 'gravisain' ) } initialOpen={ false }>
								<ShapeDividerControl
									label={ __( 'Top Shape Divider', 'gravisain' ) }
									value={ topShapeDivider }
									onChange={ ( val ) => setAttributes( { topShapeDivider: val } ) }
								/>
								<hr />
								<ShapeDividerControl
									label={ __( 'Bottom Shape Divider', 'gravisain' ) }
									value={ bottomShapeDivider }
									onChange={ ( val ) => setAttributes( { bottomShapeDivider: val } ) }
								/>
							</PanelBody>
						</>
					) }

					{ activeTab === 'advanced' && (
						<>
							<PanelBody title={ __( 'Spacing', 'gravisain' ) } initialOpen={ true }>
								<ResponsiveTabControl>
									{ ( device ) => (
										<>
											<SpacingControl
												label={ __( 'Padding', 'gravisain' ) }
												value={ device === 'desktop' ? padding : device === 'tablet' ? paddingTablet : paddingMobile }
												onChange={ ( val ) => {
													if ( device === 'desktop' ) setAttributes( { padding: val } );
													if ( device === 'tablet' ) setAttributes( { paddingTablet: val } );
													if ( device === 'mobile' ) setAttributes( { paddingMobile: val } );
												} }
											/>
											<SpacingControl
												label={ __( 'Margin', 'gravisain' ) }
												value={ device === 'desktop' ? margin : device === 'tablet' ? marginTablet : marginMobile }
												onChange={ ( val ) => {
													if ( device === 'desktop' ) setAttributes( { margin: val } );
													if ( device === 'tablet' ) setAttributes( { marginTablet: val } );
													if ( device === 'mobile' ) setAttributes( { marginMobile: val } );
												} }
											/>
										</>
									) }
								</ResponsiveTabControl>
							</PanelBody>
							<PanelBody title={ __( 'Responsive', 'gravisain' ) } initialOpen={ false }>
								<ToggleControl
									label={ __( 'Hide on Desktop', 'gravisain' ) }
									checked={ hideOnDesktop }
									onChange={ ( val ) => setAttributes( { hideOnDesktop: val } ) }
								/>
								<ToggleControl
									label={ __( 'Hide on Tablet', 'gravisain' ) }
									checked={ hideOnTablet }
									onChange={ ( val ) => setAttributes( { hideOnTablet: val } ) }
								/>
								<ToggleControl
									label={ __( 'Hide on Mobile', 'gravisain' ) }
									checked={ hideOnMobile }
									onChange={ ( val ) => setAttributes( { hideOnMobile: val } ) }
								/>
							</PanelBody>
							<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ false }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain' ) }
									value={ anchor }
									onChange={ ( val ) => setAttributes( { anchor: val } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain' ) }
									value={ customClassName }
									onChange={ ( val ) => setAttributes( { customClassName: val } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain' ) }
									help={ __( 'Add your own CSS to customize the appearance of the Row Layout block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain' ) }
									value={ customCSS }
									onChange={ ( val ) => setAttributes( { customCSS: val } ) }
									rows={ 4 }
								/>
							</PanelBody>
						</>
					) }
				</div>
			</div>
		</InspectorControls>
	);
}
