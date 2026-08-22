import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	RangeControl,
	ToggleControl,
	TabPanel,
	Button,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		iconType,
		mediaType,
		dashicon,
		imageUrl,
		imageId,
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
	} = attributes;

	const onSelectImage = ( media ) => {
		setAttributes( { imageUrl: media.url, imageId: media.id } );
	};

	const onRemoveImage = () => {
		setAttributes( { imageUrl: '', imageId: 0 } );
	};

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
								<PanelBody title={ __( 'Media / Icon Settings', 'gravisain' ) }>
									<SelectControl
										label={ __( 'Media Type', 'gravisain' ) }
										value={ mediaType }
										options={ [
											{ label: __( 'Icon (Dashicon / Symbol)', 'gravisain' ), value: 'icon' },
											{ label: __( 'Custom Image / Icon', 'gravisain' ), value: 'image' },
										] }
										onChange={ ( value ) => setAttributes( { mediaType: value } ) }
									/>

									{ mediaType === 'icon' ? (
										<>
											<TextControl
												label={ __( 'Dashicon Class (e.g. star-filled, shield)', 'gravisain' ) }
												value={ dashicon }
												onChange={ ( value ) => setAttributes( { dashicon: value } ) }
												help={ __( 'Enter Dashicon name without "dashicons-" prefix, or leave blank to use symbol.', 'gravisain' ) }
											/>
											{ ! dashicon && (
												<SelectControl
													label={ __( 'Symbol Preset', 'gravisain' ) }
													value={ iconType }
													options={ [
														{ label: __( 'Star ★', 'gravisain' ), value: 'star' },
														{ label: __( 'Lightning ⚡', 'gravisain' ), value: 'lightning' },
														{ label: __( 'Shield 🛡️', 'gravisain' ), value: 'shield' },
														{ label: __( 'Checkmark ✓', 'gravisain' ), value: 'check' },
														{ label: __( 'Heart ♥', 'gravisain' ), value: 'heart' },
														{ label: __( 'Award Trophy 🏆', 'gravisain' ), value: 'award' },
													] }
													onChange={ ( value ) => setAttributes( { iconType: value } ) }
												/>
											) }
										</>
									) : (
										<div className="gravisain-media-upload-area" style={ { marginBottom: 16 } }>
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ onSelectImage }
													allowedTypes={ [ 'image' ] }
													value={ imageId }
													render={ ( { open } ) => (
														<div style={ { display: 'flex', flexDirection: 'column', gap: 8 } }>
															{ imageUrl && (
																<img
																	src={ imageUrl }
																	alt="Icon preview"
																	style={ { maxWidth: '80px', maxHeight: '80px', borderRadius: '8px' } }
																/>
															) }
															<div style={ { display: 'flex', gap: 8 } }>
																<Button variant="secondary" onClick={ open }>
																	{ imageUrl ? __( 'Replace Image', 'gravisain' ) : __( 'Upload Image', 'gravisain' ) }
																</Button>
																{ imageUrl && (
																	<Button variant="link" isDestructive onClick={ onRemoveImage }>
																		{ __( 'Remove', 'gravisain' ) }
																	</Button>
																) }
															</div>
														</div>
													) }
												/>
											</MediaUploadCheck>
										</div>
									) }
								</PanelBody>

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
										max={ 120 }
									/>
									<RangeControl
										label={ __( 'Icon Box Border Radius (px)', 'gravisain' ) }
										value={ iconRadius }
										onChange={ ( val ) => setAttributes( { iconRadius: val } ) }
										min={ 0 }
										max={ 999 }
									/>
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
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Card Background, Border & Spacing', 'gravisain' ) }>
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
						);
					}

					return null;
				} }
			</TabPanel>
		</InspectorControls>
	);
}
