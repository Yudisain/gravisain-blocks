import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TextControl, TextareaControl, TabPanel, Button } from '@wordpress/components';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		url,
		mediaId,
		trigger,
		loop,
		speed,
		width,
		height,
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
								<PanelBody title={ __( 'Lottie JSON Source', 'gravisain' ) } initialOpen={ true }>
									<div style={ { marginBottom: '16px' } }>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) => setAttributes( { mediaId: media.id, url: media.url } ) }
												allowedTypes={ [ 'application/json' ] }
												value={ mediaId }
												render={ ( { open } ) => (
													<Button variant={ url ? 'secondary' : 'primary' } onClick={ open } style={ { width: '100%', justifyContent: 'center' } }>
														{ url ? __( 'Replace JSON File', 'gravisain' ) : __( 'Upload JSON File', 'gravisain' ) }
													</Button>
												) }
											/>
										</MediaUploadCheck>
										{ url && (
											<Button
												isDestructive
												isLink
												onClick={ () => setAttributes( { mediaId: 0, url: '' } ) }
												style={ { marginTop: '8px', display: 'block' } }
											>
												{ __( 'Remove Animation', 'gravisain' ) }
											</Button>
										) }
									</div>

									<TextControl
										label={ __( 'Or External JSON URL', 'gravisain' ) }
										value={ url }
										onChange={ ( val ) => setAttributes( { url: val } ) }
										placeholder="https://assets.lottiefiles.com/..."
										help={ __( 'Paste a direct URL to a .json Lottie animation.', 'gravisain' ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Animation Behavior', 'gravisain' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'Animation Trigger', 'gravisain' ) }
										value={ trigger }
										options={ [
											{ label: __( 'Autoplay on Load', 'gravisain' ), value: 'autoplay' },
											{ label: __( 'Play on Hover', 'gravisain' ), value: 'hover' },
											{ label: __( 'Play on Click', 'gravisain' ), value: 'click' },
											{ label: __( 'Play on Scroll into View', 'gravisain' ), value: 'scroll' },
										] }
										onChange={ ( val ) => setAttributes( { trigger: val } ) }
									/>
									<ToggleControl
										label={ __( 'Loop Animation', 'gravisain' ) }
										checked={ loop }
										onChange={ ( val ) => setAttributes( { loop: val } ) }
									/>
									<RangeControl
										label={ __( 'Playback Speed', 'gravisain' ) }
										value={ speed }
										onChange={ ( val ) => setAttributes( { speed: val } ) }
										min={ 0.2 }
										max={ 3 }
										step={ 0.1 }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Dimensions & Alignment', 'gravisain' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Width (px)', 'gravisain' ) }
									value={ width }
									onChange={ ( val ) => setAttributes( { width: val } ) }
									min={ 50 }
									max={ 1200 }
									step={ 10 }
								/>
								<RangeControl
									label={ __( 'Height (px)', 'gravisain' ) }
									value={ height }
									onChange={ ( val ) => setAttributes( { height: val } ) }
									min={ 50 }
									max={ 1200 }
									step={ 10 }
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
