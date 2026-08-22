import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, RangeControl, Button, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function ColumnInspector( { attributes, setAttributes } ) {
	const {
		width,
		widthTablet,
		widthMobile,
		verticalAlignment,
		backgroundColor,
		textColor,
		backgroundImage,
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
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Column Width & Alignment', 'gravisain' ) } initialOpen={ true }>
								<ResponsiveTabControl>
									{ ( device ) => {
										if ( device === 'tablet' ) {
											return (
												<RangeControl
													label={ __( 'Tablet Width (%)', 'gravisain' ) }
													value={ parseFloat( widthTablet ) || undefined }
													onChange={ ( val ) => setAttributes( { widthTablet: val !== undefined ? `${val}%` : undefined } ) }
													min={ 0 }
													max={ 100 }
													allowReset={ true }
												/>
											);
										}
										if ( device === 'mobile' ) {
											return (
												<RangeControl
													label={ __( 'Mobile Width (%)', 'gravisain' ) }
													value={ parseFloat( widthMobile ) || undefined }
													onChange={ ( val ) => setAttributes( { widthMobile: val !== undefined ? `${val}%` : undefined } ) }
													min={ 0 }
													max={ 100 }
													allowReset={ true }
												/>
											);
										}
										return (
											<RangeControl
												label={ __( 'Desktop Width (%)', 'gravisain' ) }
												value={ parseFloat( width ) || undefined }
												onChange={ ( val ) => setAttributes( { width: val !== undefined ? `${val}%` : undefined } ) }
												min={ 0 }
												max={ 100 }
												allowReset={ true }
											/>
										);
									} }
								</ResponsiveTabControl>

								<SelectControl
									label={ __( 'Vertical Alignment', 'gravisain' ) }
									value={ verticalAlignment }
									options={ [
										{ label: __( 'Default', 'gravisain' ), value: '' },
										{ label: __( 'Top', 'gravisain' ), value: 'top' },
										{ label: __( 'Middle', 'gravisain' ), value: 'center' },
										{ label: __( 'Bottom', 'gravisain' ), value: 'bottom' },
									] }
									onChange={ ( value ) => setAttributes( { verticalAlignment: value } ) }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Background & Colors', 'gravisain' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Background Color', 'gravisain' ) }
										value={ backgroundColor }
										onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Text Color', 'gravisain' ) }
										value={ textColor }
										onChange={ ( val ) => setAttributes( { textColor: val } ) }
									/>
									
									<p className="components-base-control__label" style={{ marginTop: '16px', marginBottom: '8px' }}>
										<strong>{ __( 'Background Image', 'gravisain' ) }</strong>
									</p>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( mediaObj ) => setAttributes( { backgroundImage: mediaObj.url } ) }
											allowedTypes={ [ 'image' ] }
											render={ ( { open } ) => (
												<Button variant="secondary" onClick={ open }>
													{ backgroundImage ? __( 'Replace Background Image', 'gravisain' ) : __( 'Select Background Image', 'gravisain' ) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
									{ backgroundImage && (
										<Button variant="link" isDestructive onClick={ () => setAttributes( { backgroundImage: '' } ) } style={ { marginTop: '10px', display: 'block' } }>
											{ __( 'Remove Image', 'gravisain' ) }
										</Button>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Spacing & Borders', 'gravisain' ) } initialOpen={ false }>
									<ResponsiveTabControl>
										{ ( device ) => {
											if ( device === 'tablet' ) {
												return (
													<>
														<SpacingControl
															label={ __( 'Tablet Padding', 'gravisain' ) }
															value={ paddingTablet }
															onChange={ ( val ) => setAttributes( { paddingTablet: val } ) }
														/>
														<SpacingControl
															label={ __( 'Tablet Margin', 'gravisain' ) }
															value={ marginTablet }
															onChange={ ( val ) => setAttributes( { marginTablet: val } ) }
														/>
													</>
												);
											}
											if ( device === 'mobile' ) {
												return (
													<>
														<SpacingControl
															label={ __( 'Mobile Padding', 'gravisain' ) }
															value={ paddingMobile }
															onChange={ ( val ) => setAttributes( { paddingMobile: val } ) }
														/>
														<SpacingControl
															label={ __( 'Mobile Margin', 'gravisain' ) }
															value={ marginMobile }
															onChange={ ( val ) => setAttributes( { marginMobile: val } ) }
														/>
													</>
												);
											}
											return (
												<>
													<SpacingControl
														label={ __( 'Desktop Padding', 'gravisain' ) }
														value={ padding }
														onChange={ ( val ) => setAttributes( { padding: val } ) }
													/>
													<SpacingControl
														label={ __( 'Desktop Margin', 'gravisain' ) }
														value={ margin }
														onChange={ ( val ) => setAttributes( { margin: val } ) }
													/>
												</>
											);
										} }
									</ResponsiveTabControl>

									<hr style={{ margin: '16px 0' }} />

									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain' ) }
										value={ borderWidth }
										onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
										min={ 0 }
										max={ 20 }
									/>
									{ borderWidth > 0 && (
										<>
											<ColorControl
												label={ __( 'Border Color', 'gravisain' ) }
												value={ borderColor }
												onChange={ ( val ) => setAttributes( { borderColor: val } ) }
												disableGradient={ true }
											/>
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
										</>
									) }
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
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
