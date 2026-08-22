import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel, Button } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		id,
		url,
		alt,
		aspectRatio,
		objectFit,
		borderRadius,
		borderWidth,
		borderColor,
		borderStyle,
		boxShadow,
		overlayColor,
		overlayOpacity,
		link,
		linkTarget,
		alignment,
		alignmentTablet,
		alignmentMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Image Settings', 'gravisain' ) } initialOpen={ true }>
									<div style={ { marginBottom: '16px' } }>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) => setAttributes( { id: media.id, url: media.url, alt: media.alt || '' } ) }
												allowedTypes={ [ 'image' ] }
												value={ id }
												render={ ( { open } ) => (
													<Button variant={ url ? 'secondary' : 'primary' } onClick={ open } style={ { width: '100%', justifyContent: 'center' } }>
														{ url ? __( 'Replace Image', 'gravisain' ) : __( 'Select Image', 'gravisain' ) }
													</Button>
												) }
											/>
										</MediaUploadCheck>
										{ url && (
											<Button
												isDestructive
												isLink
												onClick={ () => setAttributes( { id: 0, url: '', alt: '' } ) }
												style={ { marginTop: '8px', display: 'block' } }
											>
												{ __( 'Remove Image', 'gravisain' ) }
											</Button>
										) }
									</div>

									<TextControl
										label={ __( 'Alt Text (Alternative Text)', 'gravisain' ) }
										value={ alt }
										onChange={ ( val ) => setAttributes( { alt: val } ) }
										help={ __( 'Describe the purpose of the image for screen readers and SEO.', 'gravisain' ) }
									/>

									<ResponsiveTabControl>
										{ ( device ) => {
											if ( device === 'tablet' ) {
												return (
													<SelectControl
														label={ __( 'Tablet Alignment', 'gravisain' ) }
														value={ alignmentTablet }
														options={ [
															{ label: __( 'Inherit', 'gravisain' ), value: '' },
															{ label: __( 'Left', 'gravisain' ), value: 'left' },
															{ label: __( 'Center', 'gravisain' ), value: 'center' },
															{ label: __( 'Right', 'gravisain' ), value: 'right' },
														] }
														onChange={ ( val ) => setAttributes( { alignmentTablet: val } ) }
													/>
												);
											}
											if ( device === 'mobile' ) {
												return (
													<SelectControl
														label={ __( 'Mobile Alignment', 'gravisain' ) }
														value={ alignmentMobile }
														options={ [
															{ label: __( 'Inherit', 'gravisain' ), value: '' },
															{ label: __( 'Left', 'gravisain' ), value: 'left' },
															{ label: __( 'Center', 'gravisain' ), value: 'center' },
															{ label: __( 'Right', 'gravisain' ), value: 'right' },
														] }
														onChange={ ( val ) => setAttributes( { alignmentMobile: val } ) }
													/>
												);
											}
											return (
												<SelectControl
													label={ __( 'Desktop Alignment', 'gravisain' ) }
													value={ alignment }
													options={ [
														{ label: __( 'Left', 'gravisain' ), value: 'left' },
														{ label: __( 'Center', 'gravisain' ), value: 'center' },
														{ label: __( 'Right', 'gravisain' ), value: 'right' },
													] }
													onChange={ ( val ) => setAttributes( { alignment: val } ) }
												/>
											);
										} }
									</ResponsiveTabControl>
								</PanelBody>

								<PanelBody title={ __( 'Link Settings', 'gravisain' ) } initialOpen={ false }>
									<TextControl
										label={ __( 'Link URL', 'gravisain' ) }
										value={ link }
										onChange={ ( val ) => setAttributes( { link: val } ) }
										placeholder="https://"
									/>
									<SelectControl
										label={ __( 'Link Target', 'gravisain' ) }
										value={ linkTarget }
										options={ [
											{ label: __( 'Same Window', 'gravisain' ), value: '_self' },
											{ label: __( 'New Tab', 'gravisain' ), value: '_blank' },
										] }
										onChange={ ( val ) => setAttributes( { linkTarget: val } ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Aspect Ratio & Fit', 'gravisain' ) } initialOpen={ true }>
									<SelectControl
										label={ __( 'Aspect Ratio', 'gravisain' ) }
										value={ aspectRatio }
										options={ [
											{ label: __( 'Auto (Original)', 'gravisain' ), value: 'auto' },
											{ label: __( '16:9 (Landscape)', 'gravisain' ), value: '16/9' },
											{ label: __( '4:3 (Standard)', 'gravisain' ), value: '4/3' },
											{ label: __( '1:1 (Square)', 'gravisain' ), value: '1/1' },
											{ label: __( '3:4 (Portrait)', 'gravisain' ), value: '3/4' },
										] }
										onChange={ ( val ) => setAttributes( { aspectRatio: val } ) }
									/>
									{ aspectRatio !== 'auto' && (
										<SelectControl
											label={ __( 'Object Fit', 'gravisain' ) }
											value={ objectFit }
											options={ [
												{ label: __( 'Cover', 'gravisain' ), value: 'cover' },
												{ label: __( 'Contain', 'gravisain' ), value: 'contain' },
												{ label: __( 'Fill', 'gravisain' ), value: 'fill' },
											] }
											onChange={ ( val ) => setAttributes( { objectFit: val } ) }
										/>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Borders & Shadow', 'gravisain' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain' ) }
										value={ borderWidth }
										onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
										min={ 0 }
										max={ 20 }
									/>
									{ borderWidth > 0 && (
										<>
											<SelectControl
												label={ __( 'Border Style', 'gravisain' ) }
												value={ borderStyle }
												options={ [
													{ label: __( 'Solid', 'gravisain' ), value: 'solid' },
													{ label: __( 'Dashed', 'gravisain' ), value: 'dashed' },
													{ label: __( 'Dotted', 'gravisain' ), value: 'dotted' },
												] }
												onChange={ ( val ) => setAttributes( { borderStyle: val } ) }
											/>
											<ColorControl
												label={ __( 'Border Color', 'gravisain' ) }
												value={ borderColor }
												onChange={ ( val ) => setAttributes( { borderColor: val } ) }
												disableGradient={ true }
											/>
										</>
									) }
									<SelectControl
										label={ __( 'Box Shadow', 'gravisain' ) }
										value={ boxShadow }
										options={ [
											{ label: __( 'None', 'gravisain' ), value: 'none' },
											{ label: __( 'Small', 'gravisain' ), value: '0 2px 4px rgba(0,0,0,0.1)' },
											{ label: __( 'Medium', 'gravisain' ), value: '0 4px 12px rgba(0,0,0,0.15)' },
											{ label: __( 'Large', 'gravisain' ), value: '0 8px 24px rgba(0,0,0,0.2)' },
										] }
										onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Color Overlay', 'gravisain' ) } initialOpen={ false }>
									<ColorControl
										label={ __( 'Overlay Color', 'gravisain' ) }
										value={ overlayColor }
										onChange={ ( val ) => setAttributes( { overlayColor: val } ) }
									/>
									<RangeControl
										label={ __( 'Overlay Opacity (%)', 'gravisain' ) }
										value={ overlayOpacity }
										onChange={ ( val ) => setAttributes( { overlayOpacity: val } ) }
										min={ 0 }
										max={ 100 }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ true }>
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
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain' ) }
									value={ customCSS }
									onChange={ ( val ) => setAttributes( { customCSS: val } ) }
									rows={ 4 }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
