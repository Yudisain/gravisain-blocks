import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	RangeControl,
	ToggleControl,
	TabPanel,
	FocalPointPicker,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import IconPickerControl from '../../../controls/IconPickerControl';
import LayoutPresets from './LayoutPresets';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		layoutPreset,
		icon,
		iconType,
		mediaType,
		dashicon,
		imageUrl,
		imageFocalPoint,
		imageWidth,
		imageHeight,
		imageAspectRatio,
		imageObjectFit,
		imageBorderRadius,
		iconSize,
		iconBoxSize,
		iconRadius,
		iconColor,
		iconBackgroundColor,
		textAlign,
		showEyebrow,
		eyebrowColor,
		titleColor,
		titleFontSize,
		descriptionColor,
		descriptionFontSize,
		showLink,
		linkUrl,
		linkColor,
		cardBackgroundColor,
		cardBorderColor,
		cardBorderWidth,
		cardBorderRadius,
		cardPaddingTop,
		cardPaddingBottom,
		cardPaddingLeft,
		cardPaddingRight,
		hoverEffect,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const isIconCleared = mediaType === 'none' || icon === 'none';
	const currentIconValue = isIconCleared
		? ''
		: ( icon || ( mediaType === 'image' && imageUrl ? imageUrl : ( dashicon ? 'star' : ( iconType || 'star' ) ) ) );
	const isImageSelected = ! isIconCleared && Boolean(
		( icon && typeof icon === 'string' && ( icon.startsWith( 'http' ) || icon.startsWith( '/' ) || icon.startsWith( 'data:image' ) ) ) ||
		( mediaType === 'image' && imageUrl )
	);
	const activeImageUrl = isImageSelected
		? ( ( icon && typeof icon === 'string' && ( icon.startsWith( 'http' ) || icon.startsWith( '/' ) || icon.startsWith( 'data:image' ) ) ) ? icon : imageUrl )
		: '';

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'general',
						title: __( 'General', 'gravisain-blocks' ),
						className: 'gravisain-tab-general',
					},
					{
						name: 'style',
						title: __( 'Style', 'gravisain-blocks' ),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain-blocks' ),
						className: 'gravisain-tab-advanced',
					},
				] }
			>
				{ ( tab ) => {
					if ( tab.name === 'general' ) {
						return (
							<>
								<PanelBody title={ __( 'Quick Layout Presets', 'gravisain-blocks' ) } initialOpen={ true }>
									<LayoutPresets
										layoutPreset={ layoutPreset }
										textAlign={ textAlign }
										onSelectPreset={ ( preset ) => {
											setAttributes( {
												layoutPreset: preset.id,
												...preset.values,
											} );
										} }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Media / Icon Settings', 'gravisain-blocks' ) }>
									<IconPickerControl
										label={ __( 'Icon or Image', 'gravisain-blocks' ) }
										value={ currentIconValue }
										onChange={ ( val ) => {
											if ( ! val ) {
												setAttributes( {
													icon: 'none',
													iconType: '',
													dashicon: '',
													imageUrl: '',
													mediaType: 'none',
												} );
												return;
											}
											setAttributes( { icon: val } );
											const isImg = typeof val === 'string' && (
												val.startsWith( 'http://' ) ||
												val.startsWith( 'https://' ) ||
												val.startsWith( '/' ) ||
												val.startsWith( 'data:image' )
											);
											if ( isImg ) {
												setAttributes( { imageUrl: val, mediaType: 'image' } );
											} else {
												setAttributes( { mediaType: 'icon' } );
											}
										} }
									/>

									{ isImageSelected && activeImageUrl && (
										<>
											<div style={ { marginTop: 16 } }>
												<FocalPointPicker
													label={ __( 'Image Focal Point (Click & Drag)', 'gravisain-blocks' ) }
													url={ activeImageUrl }
													value={ imageFocalPoint || { x: 0.5, y: 0.5 } }
													onChange={ ( val ) => setAttributes( { imageFocalPoint: val } ) }
												/>
											</div>
										</>
									) }
								</PanelBody>

								{ isImageSelected && (
									<PanelBody title={ __( 'Image Settings', 'gravisain-blocks' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'Aspect Ratio', 'gravisain-blocks' ) }
											value={ imageAspectRatio || 'auto' }
											options={ [
												{ label: __( 'Auto (Original)', 'gravisain-blocks' ), value: 'auto' },
												{ label: __( '1:1 (Square)', 'gravisain-blocks' ), value: '1/1' },
												{ label: __( '16:9 (Landscape)', 'gravisain-blocks' ), value: '16/9' },
												{ label: __( '4:3 (Standard)', 'gravisain-blocks' ), value: '4/3' },
												{ label: __( '3:4 (Portrait)', 'gravisain-blocks' ), value: '3/4' },
											] }
											onChange={ ( val ) => setAttributes( { imageAspectRatio: val } ) }
										/>

										<SelectControl
											label={ __( 'Object Fit', 'gravisain-blocks' ) }
											value={ imageObjectFit || 'cover' }
											options={ [
												{ label: __( 'Cover (Crop to fill)', 'gravisain-blocks' ), value: 'cover' },
												{ label: __( 'Contain (Keep entire image)', 'gravisain-blocks' ), value: 'contain' },
												{ label: __( 'Fill (Stretch to fit)', 'gravisain-blocks' ), value: 'fill' },
											] }
											onChange={ ( val ) => setAttributes( { imageObjectFit: val } ) }
										/>

										<RangeControl
											label={ __( 'Image Width (px - 0 for auto)', 'gravisain-blocks' ) }
											value={ imageWidth || 0 }
											onChange={ ( val ) => setAttributes( { imageWidth: val } ) }
											min={ 0 }
											max={ 400 }
											help={ __( 'Leave 0 to follow Icon Box Size or original image ratio.', 'gravisain-blocks' ) }
										/>

										<RangeControl
											label={ __( 'Image Height (px - 0 for auto)', 'gravisain-blocks' ) }
											value={ imageHeight || 0 }
											onChange={ ( val ) => setAttributes( { imageHeight: val } ) }
											min={ 0 }
											max={ 400 }
											help={ __( 'Leave 0 to follow Icon Box Size.', 'gravisain-blocks' ) }
										/>

										<RangeControl
											label={ __( 'Image Border Radius (px)', 'gravisain-blocks' ) }
											value={ imageBorderRadius || 0 }
											onChange={ ( val ) => setAttributes( { imageBorderRadius: val } ) }
											min={ 0 }
											max={ 100 }
										/>
									</PanelBody>
								) }

								<PanelBody title={ __( 'Content Visibility & Links', 'gravisain-blocks' ) }>
									<ToggleControl
										label={ __( 'Show Eyebrow Label', 'gravisain-blocks' ) }
										checked={ showEyebrow }
										onChange={ ( val ) => setAttributes( { showEyebrow: val } ) }
									/>
									<ToggleControl
										label={ __( 'Show Call to Action Link', 'gravisain-blocks' ) }
										checked={ showLink }
										onChange={ ( val ) => setAttributes( { showLink: val } ) }
									/>
									{ showLink && (
										<TextControl
											label={ __( 'Link URL', 'gravisain-blocks' ) }
											value={ linkUrl }
											onChange={ ( val ) => setAttributes( { linkUrl: val } ) }
										/>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Hover & Interactive Effects', 'gravisain-blocks' ) }>
									<SelectControl
										label={ __( 'Card Hover Effect', 'gravisain-blocks' ) }
										value={ hoverEffect }
										options={ [
											{ label: __( 'Lift Up (Shadow Boost)', 'gravisain-blocks' ), value: 'lift' },
											{ label: __( 'Scale Up Slightly', 'gravisain-blocks' ), value: 'scale' },
											{ label: __( 'Border Glow', 'gravisain-blocks' ), value: 'border-glow' },
											{ label: __( 'None', 'gravisain-blocks' ), value: 'none' },
										] }
										onChange={ ( val ) => setAttributes( { hoverEffect: val } ) }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Alignment', 'gravisain-blocks' ) }>
									<SelectControl
										label={ __( 'Text Alignment', 'gravisain-blocks' ) }
										value={ textAlign }
										options={ [
											{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
											{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
											{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
										] }
										onChange={ ( val ) => setAttributes( { textAlign: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Media / Icon Styling', 'gravisain-blocks' ) }>
									<RangeControl
										label={ __( 'Icon / Image Size (px)', 'gravisain-blocks' ) }
										value={ iconSize }
										onChange={ ( val ) => setAttributes( { iconSize: val } ) }
										min={ 12 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Icon Box Size (px)', 'gravisain-blocks' ) }
										value={ iconBoxSize }
										onChange={ ( val ) => setAttributes( { iconBoxSize: val } ) }
										min={ 24 }
										max={ 200 }
									/>
									<RangeControl
										label={ __( 'Icon Box Border Radius (px)', 'gravisain-blocks' ) }
										value={ iconRadius }
										onChange={ ( val ) => setAttributes( { iconRadius: val } ) }
										min={ 0 }
										max={ 999 }
									/>
									{ ! isImageSelected && (
										<>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Icon Color', 'gravisain-blocks' ) }
												</p>
												<ColorControl
													value={ iconColor }
													onChange={ ( color ) => setAttributes( { iconColor: color || '#2563eb' } ) }
												/>
											</div>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Icon Background Color', 'gravisain-blocks' ) }
												</p>
												<ColorControl
													value={ iconBackgroundColor }
													onChange={ ( color ) => setAttributes( { iconBackgroundColor: color || 'rgba(37, 99, 235, 0.1)' } ) }
												/>
											</div>
										</>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Typography & Colors', 'gravisain-blocks' ) }>
									<RangeControl
										label={ __( 'Title Font Size (px)', 'gravisain-blocks' ) }
										value={ titleFontSize }
										onChange={ ( val ) => setAttributes( { titleFontSize: val } ) }
										min={ 14 }
										max={ 48 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Title Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ titleColor }
											onChange={ ( color ) => setAttributes( { titleColor: color || '#0f172a' } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Description Font Size (px)', 'gravisain-blocks' ) }
										value={ descriptionFontSize }
										onChange={ ( val ) => setAttributes( { descriptionFontSize: val } ) }
										min={ 12 }
										max={ 28 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Description Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ descriptionColor }
											onChange={ ( color ) => setAttributes( { descriptionColor: color || '#475569' } ) }
										/>
									</div>

									{ showEyebrow && (
										<div style={ { marginBottom: 16 } }>
											<p style={ { marginBottom: 8, fontWeight: 600 } }>
												{ __( 'Eyebrow Color', 'gravisain-blocks' ) }
											</p>
											<ColorControl
												value={ eyebrowColor }
												onChange={ ( color ) => setAttributes( { eyebrowColor: color || '#64748b' } ) }
											/>
										</div>
									) }

									{ showLink && (
										<div style={ { marginBottom: 16 } }>
											<p style={ { marginBottom: 8, fontWeight: 600 } }>
												{ __( 'Link Color', 'gravisain-blocks' ) }
											</p>
											<ColorControl
												value={ linkColor }
												onChange={ ( color ) => setAttributes( { linkColor: color || '#2563eb' } ) }
											/>
										</div>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Card Background, Border & Spacing', 'gravisain-blocks' ) } initialOpen={ false }>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Card Background Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ cardBackgroundColor }
											onChange={ ( color ) => setAttributes( { cardBackgroundColor: color || '#ffffff' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Card Border Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ cardBorderColor }
											onChange={ ( color ) => setAttributes( { cardBorderColor: color || 'rgba(0, 0, 0, 0.08)' } ) }
										/>
									</div>
									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain-blocks' ) }
										value={ cardBorderWidth }
										onChange={ ( val ) => setAttributes( { cardBorderWidth: val } ) }
										min={ 0 }
										max={ 10 }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
										value={ cardBorderRadius }
										onChange={ ( val ) => setAttributes( { cardBorderRadius: val } ) }
										min={ 0 }
										max={ 60 }
									/>
									<RangeControl
										label={ __( 'Padding Top (px)', 'gravisain-blocks' ) }
										value={ cardPaddingTop }
										onChange={ ( val ) => setAttributes( { cardPaddingTop: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Padding Bottom (px)', 'gravisain-blocks' ) }
										value={ cardPaddingBottom }
										onChange={ ( val ) => setAttributes( { cardPaddingBottom: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Padding Left (px)', 'gravisain-blocks' ) }
										value={ cardPaddingLeft }
										onChange={ ( val ) => setAttributes( { cardPaddingLeft: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Padding Right (px)', 'gravisain-blocks' ) }
										value={ cardPaddingRight }
										onChange={ ( val ) => setAttributes( { cardPaddingRight: val } ) }
										min={ 0 }
										max={ 100 }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain-blocks' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain-blocks' ) }
									value={ anchor || '' }
									onChange={ ( val ) => setAttributes( { anchor: val } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain-blocks' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain-blocks' ) }
									value={ customClassName || '' }
									onChange={ ( val ) => setAttributes( { customClassName: val } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain-blocks' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain-blocks' ) }
									value={ customCSS || '' }
									onChange={ ( val ) => setAttributes( { customCSS: val } ) }
									rows={ 4 }
								/>
							</PanelBody>
						);
					}

					return null;
				} }
			</TabPanel>
		</InspectorControls>
	);
}
