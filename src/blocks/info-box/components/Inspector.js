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
						title: __( 'General', 'gravisain' ),
						className: 'gravisain-tab-general',
					},
					{
						name: 'style',
						title: __( 'Style', 'gravisain' ),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain' ),
						className: 'gravisain-tab-advanced',
					},
				] }
			>
				{ ( tab ) => {
					if ( tab.name === 'general' ) {
						return (
							<>
								<PanelBody title={ __( 'Quick Layout Presets', 'gravisain' ) } initialOpen={ true }>
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

								<PanelBody title={ __( 'Media / Icon Settings', 'gravisain' ) }>
									<IconPickerControl
										label={ __( 'Icon or Image', 'gravisain' ) }
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
													label={ __( 'Image Focal Point (Click & Drag)', 'gravisain' ) }
													url={ activeImageUrl }
													value={ imageFocalPoint || { x: 0.5, y: 0.5 } }
													onChange={ ( val ) => setAttributes( { imageFocalPoint: val } ) }
												/>
											</div>
										</>
									) }
								</PanelBody>

								{ isImageSelected && (
									<PanelBody title={ __( 'Image Settings', 'gravisain' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'Aspect Ratio', 'gravisain' ) }
											value={ imageAspectRatio || 'auto' }
											options={ [
												{ label: __( 'Auto (Original)', 'gravisain' ), value: 'auto' },
												{ label: __( '1:1 (Square)', 'gravisain' ), value: '1/1' },
												{ label: __( '16:9 (Landscape)', 'gravisain' ), value: '16/9' },
												{ label: __( '4:3 (Standard)', 'gravisain' ), value: '4/3' },
												{ label: __( '3:4 (Portrait)', 'gravisain' ), value: '3/4' },
											] }
											onChange={ ( val ) => setAttributes( { imageAspectRatio: val } ) }
										/>

										<SelectControl
											label={ __( 'Object Fit', 'gravisain' ) }
											value={ imageObjectFit || 'cover' }
											options={ [
												{ label: __( 'Cover (Crop to fill)', 'gravisain' ), value: 'cover' },
												{ label: __( 'Contain (Keep entire image)', 'gravisain' ), value: 'contain' },
												{ label: __( 'Fill (Stretch to fit)', 'gravisain' ), value: 'fill' },
											] }
											onChange={ ( val ) => setAttributes( { imageObjectFit: val } ) }
										/>

										<RangeControl
											label={ __( 'Image Width (px - 0 for auto)', 'gravisain' ) }
											value={ imageWidth || 0 }
											onChange={ ( val ) => setAttributes( { imageWidth: val } ) }
											min={ 0 }
											max={ 400 }
											help={ __( 'Leave 0 to follow Icon Box Size or original image ratio.', 'gravisain' ) }
										/>

										<RangeControl
											label={ __( 'Image Height (px - 0 for auto)', 'gravisain' ) }
											value={ imageHeight || 0 }
											onChange={ ( val ) => setAttributes( { imageHeight: val } ) }
											min={ 0 }
											max={ 400 }
											help={ __( 'Leave 0 to follow Icon Box Size.', 'gravisain' ) }
										/>

										<RangeControl
											label={ __( 'Image Border Radius (px)', 'gravisain' ) }
											value={ imageBorderRadius || 0 }
											onChange={ ( val ) => setAttributes( { imageBorderRadius: val } ) }
											min={ 0 }
											max={ 100 }
										/>
									</PanelBody>
								) }

								<PanelBody title={ __( 'Content Visibility & Links', 'gravisain' ) }>
									<ToggleControl
										label={ __( 'Show Eyebrow Label', 'gravisain' ) }
										checked={ showEyebrow }
										onChange={ ( val ) => setAttributes( { showEyebrow: val } ) }
									/>
									<ToggleControl
										label={ __( 'Show Call to Action Link', 'gravisain' ) }
										checked={ showLink }
										onChange={ ( val ) => setAttributes( { showLink: val } ) }
									/>
									{ showLink && (
										<TextControl
											label={ __( 'Link URL', 'gravisain' ) }
											value={ linkUrl }
											onChange={ ( val ) => setAttributes( { linkUrl: val } ) }
										/>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Hover & Interactive Effects', 'gravisain' ) }>
									<SelectControl
										label={ __( 'Card Hover Effect', 'gravisain' ) }
										value={ hoverEffect }
										options={ [
											{ label: __( 'Lift Up (Shadow Boost)', 'gravisain' ), value: 'lift' },
											{ label: __( 'Scale Up Slightly', 'gravisain' ), value: 'scale' },
											{ label: __( 'Border Glow', 'gravisain' ), value: 'border-glow' },
											{ label: __( 'None', 'gravisain' ), value: 'none' },
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
								<PanelBody title={ __( 'Alignment', 'gravisain' ) }>
									<SelectControl
										label={ __( 'Text Alignment', 'gravisain' ) }
										value={ textAlign }
										options={ [
											{ label: __( 'Left', 'gravisain' ), value: 'left' },
											{ label: __( 'Center', 'gravisain' ), value: 'center' },
											{ label: __( 'Right', 'gravisain' ), value: 'right' },
										] }
										onChange={ ( val ) => setAttributes( { textAlign: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Media / Icon Styling', 'gravisain' ) }>
									<RangeControl
										label={ __( 'Icon / Image Size (px)', 'gravisain' ) }
										value={ iconSize }
										onChange={ ( val ) => setAttributes( { iconSize: val } ) }
										min={ 12 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Icon Box Size (px)', 'gravisain' ) }
										value={ iconBoxSize }
										onChange={ ( val ) => setAttributes( { iconBoxSize: val } ) }
										min={ 24 }
										max={ 200 }
									/>
									<RangeControl
										label={ __( 'Icon Box Border Radius (px)', 'gravisain' ) }
										value={ iconRadius }
										onChange={ ( val ) => setAttributes( { iconRadius: val } ) }
										min={ 0 }
										max={ 999 }
									/>
									{ ! isImageSelected && (
										<>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Icon Color', 'gravisain' ) }
												</p>
												<ColorControl
													value={ iconColor }
													onChange={ ( color ) => setAttributes( { iconColor: color || '#2563eb' } ) }
												/>
											</div>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Icon Background Color', 'gravisain' ) }
												</p>
												<ColorControl
													value={ iconBackgroundColor }
													onChange={ ( color ) => setAttributes( { iconBackgroundColor: color || 'rgba(37, 99, 235, 0.1)' } ) }
												/>
											</div>
										</>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Typography & Colors', 'gravisain' ) }>
									<RangeControl
										label={ __( 'Title Font Size (px)', 'gravisain' ) }
										value={ titleFontSize }
										onChange={ ( val ) => setAttributes( { titleFontSize: val } ) }
										min={ 14 }
										max={ 48 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Title Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ titleColor }
											onChange={ ( color ) => setAttributes( { titleColor: color || '#0f172a' } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Description Font Size (px)', 'gravisain' ) }
										value={ descriptionFontSize }
										onChange={ ( val ) => setAttributes( { descriptionFontSize: val } ) }
										min={ 12 }
										max={ 28 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Description Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ descriptionColor }
											onChange={ ( color ) => setAttributes( { descriptionColor: color || '#475569' } ) }
										/>
									</div>

									{ showEyebrow && (
										<div style={ { marginBottom: 16 } }>
											<p style={ { marginBottom: 8, fontWeight: 600 } }>
												{ __( 'Eyebrow Color', 'gravisain' ) }
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
												{ __( 'Link Color', 'gravisain' ) }
											</p>
											<ColorControl
												value={ linkColor }
												onChange={ ( color ) => setAttributes( { linkColor: color || '#2563eb' } ) }
											/>
										</div>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Card Background, Border & Spacing', 'gravisain' ) } initialOpen={ false }>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Card Background Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ cardBackgroundColor }
											onChange={ ( color ) => setAttributes( { cardBackgroundColor: color || '#ffffff' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Card Border Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ cardBorderColor }
											onChange={ ( color ) => setAttributes( { cardBorderColor: color || 'rgba(0, 0, 0, 0.08)' } ) }
										/>
									</div>
									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain' ) }
										value={ cardBorderWidth }
										onChange={ ( val ) => setAttributes( { cardBorderWidth: val } ) }
										min={ 0 }
										max={ 10 }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ cardBorderRadius }
										onChange={ ( val ) => setAttributes( { cardBorderRadius: val } ) }
										min={ 0 }
										max={ 60 }
									/>
									<RangeControl
										label={ __( 'Padding Top (px)', 'gravisain' ) }
										value={ cardPaddingTop }
										onChange={ ( val ) => setAttributes( { cardPaddingTop: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Padding Bottom (px)', 'gravisain' ) }
										value={ cardPaddingBottom }
										onChange={ ( val ) => setAttributes( { cardPaddingBottom: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Padding Left (px)', 'gravisain' ) }
										value={ cardPaddingLeft }
										onChange={ ( val ) => setAttributes( { cardPaddingLeft: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Padding Right (px)', 'gravisain' ) }
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
							<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain' ) }
									value={ anchor || '' }
									onChange={ ( val ) => setAttributes( { anchor: val } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain' ) }
									value={ customClassName || '' }
									onChange={ ( val ) => setAttributes( { customClassName: val } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain' ) }
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
