import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl, TabPanel, Button } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		adType,
		adSenseClient,
		adSenseSlot,
		adSenseFormat,
		adSenseResponsive,
		bannerId,
		bannerUrl,
		bannerAlt,
		bannerLink,
		bannerLinkTarget,
		showLabel,
		adLabel,
		alignment,
		alignmentTablet,
		alignmentMobile,
		maxWidth,
		minHeight,
		borderRadius,
		margin = {},
		anchor,
		customClassName,
	} = attributes;

	const alignmentOptions = [
		{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
		{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
		{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
	];

	const updateMargin = ( side, value ) =>
		setAttributes( { margin: { ...margin, [ side ]: value } } );

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain-blocks' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Advertisement Type', 'gravisain-blocks' ) } initialOpen={ true }>
									<SelectControl
										label={ __( 'Type', 'gravisain-blocks' ) }
										value={ adType === 'code' ? 'adsense' : adType }
										options={ [
											{ label: __( 'Google AdSense (Official)', 'gravisain-blocks' ), value: 'adsense' },
											{ label: __( 'Image Banner', 'gravisain-blocks' ), value: 'banner' },
										] }
										onChange={ ( value ) => setAttributes( { adType: value } ) }
									/>
								</PanelBody>

								{ ( adType === 'adsense' || adType === 'code' ) ? (
									<PanelBody title={ __( 'AdSense Settings', 'gravisain-blocks' ) } initialOpen={ true }>
										<TextControl
											label={ __( 'Publisher ID (data-ad-client)', 'gravisain-blocks' ) }
											value={ adSenseClient }
											onChange={ ( value ) => setAttributes( { adSenseClient: value } ) }
											placeholder="ca-pub-0000000000000000"
											help={ __( 'Enter your Google AdSense Publisher ID (e.g. ca-pub-1234567890123456).', 'gravisain-blocks' ) }
										/>
										<TextControl
											label={ __( 'Ad Slot ID (data-ad-slot)', 'gravisain-blocks' ) }
											value={ adSenseSlot }
											onChange={ ( value ) => setAttributes( { adSenseSlot: value } ) }
											placeholder="1234567890"
											help={ __( 'Enter your Google AdSense Ad Slot ID (e.g. 1234567890).', 'gravisain-blocks' ) }
										/>
										<SelectControl
											label={ __( 'Ad Format', 'gravisain-blocks' ) }
											value={ adSenseFormat || 'auto' }
											options={ [
												{ label: __( 'Auto (Responsive)', 'gravisain-blocks' ), value: 'auto' },
												{ label: __( 'Rectangle', 'gravisain-blocks' ), value: 'rectangle' },
												{ label: __( 'Horizontal', 'gravisain-blocks' ), value: 'horizontal' },
												{ label: __( 'Vertical', 'gravisain-blocks' ), value: 'vertical' },
											] }
											onChange={ ( value ) => setAttributes( { adSenseFormat: value } ) }
										/>
										<ToggleControl
											label={ __( 'Full-Width Responsive', 'gravisain-blocks' ) }
											checked={ adSenseResponsive !== false }
											onChange={ ( value ) => setAttributes( { adSenseResponsive: value } ) }
										/>
									</PanelBody>
								) : (
									<PanelBody title={ __( 'Banner Image', 'gravisain-blocks' ) } initialOpen={ true }>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) => setAttributes( { bannerId: media.id, bannerUrl: media.url, bannerAlt: media.alt || '' } ) }
												allowedTypes={ [ 'image' ] }
												value={ bannerId }
												render={ ( { open } ) => (
													bannerUrl ? (
														<div style={ { display: 'flex', gap: '8px', alignItems: 'center' } }>
															<Button variant="secondary" onClick={ open } style={ { flex: 1, justifyContent: 'center' } }>
																{ __( 'Replace Banner', 'gravisain-blocks' ) }
															</Button>
															<Button
																isDestructive
																variant="secondary"
																onClick={ () => setAttributes( { bannerId: 0, bannerUrl: '', bannerAlt: '' } ) }
																style={ { justifyContent: 'center' } }
															>
																{ __( 'Remove', 'gravisain-blocks' ) }
															</Button>
														</div>
													) : (
														<Button variant="primary" onClick={ open } style={ { width: '100%', justifyContent: 'center' } }>
															{ __( 'Select Banner', 'gravisain-blocks' ) }
														</Button>
													)
												) }
											/>
										</MediaUploadCheck>
										<TextControl
											label={ __( 'Banner Link URL', 'gravisain-blocks' ) }
											value={ bannerLink }
											onChange={ ( value ) => setAttributes( { bannerLink: value } ) }
											placeholder="https://example.com"
											help={ __( 'Optional. Leave empty to make the banner non-clickable.', 'gravisain-blocks' ) }
										/>
										{ bannerLink && (
											<SelectControl
												label={ __( 'Open Link In', 'gravisain-blocks' ) }
												value={ bannerLinkTarget }
												options={ [
													{ label: __( 'Same Tab (_self)', 'gravisain-blocks' ), value: '_self' },
													{ label: __( 'New Tab (_blank)', 'gravisain-blocks' ), value: '_blank' },
												] }
												onChange={ ( value ) => setAttributes( { bannerLinkTarget: value } ) }
											/>
										) }
										<TextControl
											label={ __( 'Alt Text', 'gravisain-blocks' ) }
											value={ bannerAlt }
											onChange={ ( value ) => setAttributes( { bannerAlt: value } ) }
											help={ __( 'Describe the banner image for accessibility.', 'gravisain-blocks' ) }
										/>
									</PanelBody>
								) }

								<PanelBody title={ __( 'Advertisement Label', 'gravisain-blocks' ) } initialOpen={ false }>
									<ToggleControl
										label={ __( 'Show "Advertisement" label', 'gravisain-blocks' ) }
										checked={ showLabel }
										onChange={ ( value ) => setAttributes( { showLabel: value } ) }
									/>
									{ showLabel && (
										<TextControl
											label={ __( 'Label Text', 'gravisain-blocks' ) }
											value={ adLabel }
											onChange={ ( value ) => setAttributes( { adLabel: value } ) }
										/>
									) }
								</PanelBody>
							</>
						) }
						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Alignment', 'gravisain-blocks' ) } initialOpen={ true }>
									<SelectControl
										label={ __( 'Desktop Alignment', 'gravisain-blocks' ) }
										value={ alignment }
										options={ alignmentOptions }
										onChange={ ( value ) => setAttributes( { alignment: value } ) }
									/>
									<SelectControl
										label={ __( 'Tablet Alignment', 'gravisain-blocks' ) }
										value={ alignmentTablet }
										options={ [ { label: __( 'Inherit Desktop', 'gravisain-blocks' ), value: '' }, ...alignmentOptions ] }
										onChange={ ( value ) => setAttributes( { alignmentTablet: value } ) }
									/>
									<SelectControl
										label={ __( 'Mobile Alignment', 'gravisain-blocks' ) }
										value={ alignmentMobile }
										options={ [ { label: __( 'Inherit Tablet/Desktop', 'gravisain-blocks' ), value: '' }, ...alignmentOptions ] }
										onChange={ ( value ) => setAttributes( { alignmentMobile: value } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Dimensions', 'gravisain-blocks' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Max Width (px)', 'gravisain-blocks' ) }
										value={ maxWidth }
										onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
										min={ 0 }
										max={ 1920 }
										help={ __( '0 = 100% full width of container.', 'gravisain-blocks' ) }
									/>
									<RangeControl
										label={ __( 'Min Height (px)', 'gravisain-blocks' ) }
										value={ minHeight }
										onChange={ ( value ) => setAttributes( { minHeight: value } ) }
										min={ 0 }
										max={ 600 }
										help={ __( 'Prevents Cumulative Layout Shift (CLS) while ads load.', 'gravisain-blocks' ) }
									/>
									{ adType === 'banner' && (
										<RangeControl
											label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
											value={ borderRadius }
											onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
											min={ 0 }
											max={ 50 }
										/>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Margin (Spacing)', 'gravisain-blocks' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Top', 'gravisain-blocks' ) }
										value={ parseInt( margin.top, 10 ) || 0 }
										onChange={ ( value ) => updateMargin( 'top', value ? `${ value }px` : '' ) }
										min={ 0 }
										max={ 200 }
									/>
									<RangeControl
										label={ __( 'Bottom', 'gravisain-blocks' ) }
										value={ parseInt( margin.bottom, 10 ) || 0 }
										onChange={ ( value ) => updateMargin( 'bottom', value ? `${ value }px` : '' ) }
										min={ 0 }
										max={ 200 }
									/>
									<RangeControl
										label={ __( 'Left', 'gravisain-blocks' ) }
										value={ parseInt( margin.left, 10 ) || 0 }
										onChange={ ( value ) => updateMargin( 'left', value ? `${ value }px` : '' ) }
										min={ 0 }
										max={ 200 }
									/>
									<RangeControl
										label={ __( 'Right', 'gravisain-blocks' ) }
										value={ parseInt( margin.right, 10 ) || 0 }
										onChange={ ( value ) => updateMargin( 'right', value ? `${ value }px` : '' ) }
										min={ 0 }
										max={ 200 }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain-blocks' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain-blocks' ) }
									value={ anchor }
									onChange={ ( value ) => setAttributes( { anchor: value } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain-blocks' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain-blocks' ) }
									value={ customClassName }
									onChange={ ( value ) => setAttributes( { customClassName: value } ) }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
