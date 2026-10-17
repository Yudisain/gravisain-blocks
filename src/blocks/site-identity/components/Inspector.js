import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { 
	PanelBody, ToggleControl, SelectControl, RangeControl, 
	TextControl, TabPanel, Button, ButtonGroup, BaseControl 
} from '@wordpress/components';
import TypographyControl from '../../../controls/TypographyControl';
import SpacingControl from '../../../controls/SpacingControl';
import ColorControl from '../../../controls/ColorControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes, defaultLogoUrl } ) {
	const {
		showLogo, customLogoId, customLogoUrl, logoWidth, logoWidthTablet, logoWidthMobile,
		logoShape, logoBorderRadius,
		showTitle, showTagline, layout, verticalAlignment,
		itemGap, linkToHome, linkUrl, titleTag,
		titleColor, titleHoverColor, titleTypography,
		taglineColor, taglineTypography, padding, margin
	} = attributes;

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain-blocks' ), className: 'gravisain-tab-advanced' }
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Content & Display', 'gravisain-blocks' ) } initialOpen={ true }>
									<ToggleControl
										label={ __( 'Show Logo', 'gravisain-blocks' ) }
										checked={ showLogo }
										onChange={ ( val ) => setAttributes( { showLogo: val } ) }
									/>
									{ showLogo && (
										<>
											<BaseControl label={ __( 'Logo Image', 'gravisain-blocks' ) }>
												<div style={ { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' } }>
													<MediaUploadCheck>
														<MediaUpload
															onSelect={ ( media ) => setAttributes( {
																customLogoId: media.id,
																customLogoUrl: media.url || media?.sizes?.full?.url || ''
															} ) }
															allowedTypes={ [ 'image' ] }
															value={ customLogoId }
															render={ ( { open } ) => (
																<Button 
																	isPrimary
																	onClick={ open }
																	style={ { flex: 1, justifyContent: 'center' } }
																>
																	{ customLogoUrl || defaultLogoUrl ? __( 'Replace Logo', 'gravisain-blocks' ) : __( 'Select Logo', 'gravisain-blocks' ) }
																</Button>
															) }
														/>
													</MediaUploadCheck>
													{ customLogoUrl && (
														<Button 
															isDestructive 
															isSecondary
															onClick={ () => setAttributes( { customLogoId: 0, customLogoUrl: '' } ) }
														>
															{ __( 'Reset', 'gravisain-blocks' ) }
														</Button>
													) }
												</div>
											</BaseControl>

											<ResponsiveTabControl>
												{ ( device ) => (
													<RangeControl
														label={ `${ __( 'Logo Width', 'gravisain-blocks' ) } (${ device })` }
														value={ 
															device === 'mobile' ? ( logoWidthMobile ?? logoWidthTablet ?? logoWidth ) :
															device === 'tablet' ? ( logoWidthTablet ?? logoWidth ) : logoWidth 
														}
														onChange={ ( val ) => {
															if ( device === 'mobile' ) setAttributes( { logoWidthMobile: val } );
															else if ( device === 'tablet' ) setAttributes( { logoWidthTablet: val } );
															else setAttributes( { logoWidth: val } );
														} }
														min={ 20 }
														max={ 500 }
													/>
												) }
											</ResponsiveTabControl>

											<SelectControl
												label={ __( 'Logo Shape', 'gravisain-blocks' ) }
												value={ attributes.logoShape || 'circle' }
												options={ [
													{ label: __( 'Lingkaran (Circle)', 'gravisain-blocks' ), value: 'circle' },
													{ label: __( 'Kotak / Asli (Default)', 'gravisain-blocks' ), value: 'default' },
													{ label: __( 'Kotak Sudut Melengkung (Rounded)', 'gravisain-blocks' ), value: 'rounded' },
												] }
												onChange={ ( val ) => setAttributes( { logoShape: val } ) }
											/>

											{ attributes.logoShape === 'rounded' && (
												<RangeControl
													label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
													value={ attributes.logoBorderRadius ?? 12 }
													onChange={ ( val ) => setAttributes( { logoBorderRadius: val } ) }
													min={ 0 }
													max={ 100 }
												/>
											) }
										</>
									) }

									<ToggleControl
										label={ __( 'Show Site Title', 'gravisain-blocks' ) }
										checked={ showTitle }
										onChange={ ( val ) => setAttributes( { showTitle: val } ) }
									/>
									{ showTitle && (
										<TextControl
											label={ __( 'Title Text', 'gravisain-blocks' ) }
											value={ attributes.customTitle }
											placeholder={ __( 'Leave empty to use Site Title', 'gravisain-blocks' ) }
											onChange={ ( val ) => setAttributes( { customTitle: val } ) }
											help={ __( 'Ketuk langsung teks di kanvas atau ubah di sini.', 'gravisain-blocks' ) }
										/>
									) }

									<ToggleControl
										label={ __( 'Show Site Tagline', 'gravisain-blocks' ) }
										checked={ showTagline }
										onChange={ ( val ) => setAttributes( { showTagline: val } ) }
									/>
									{ showTagline && (
										<TextControl
											label={ __( 'Tagline Text', 'gravisain-blocks' ) }
											value={ attributes.customTagline }
											placeholder={ __( 'Leave empty to use Site Tagline', 'gravisain-blocks' ) }
											onChange={ ( val ) => setAttributes( { customTagline: val } ) }
										/>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Layout Settings', 'gravisain-blocks' ) } initialOpen={ true }>
									<BaseControl label={ __( 'Layout', 'gravisain-blocks' ) } className="gravisain-layout-grid-control">
										<div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' } }>
											<Button
												isPrimary={ layout === 'logo-left' }
												isSecondary={ layout !== 'logo-left' }
												onClick={ () => setAttributes( { layout: 'logo-left' } ) }
												style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', padding: '8px 4px' } }
											>
												<span style={ { fontSize: '16px', lineHeight: 1 } }>🖼️ 🔤</span>
												<span style={ { fontSize: '11px', marginTop: '4px' } }>{ __( 'Logo Left', 'gravisain-blocks' ) }</span>
											</Button>
											<Button
												isPrimary={ layout === 'logo-right' }
												isSecondary={ layout !== 'logo-right' }
												onClick={ () => setAttributes( { layout: 'logo-right' } ) }
												style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', padding: '8px 4px' } }
											>
												<span style={ { fontSize: '16px', lineHeight: 1 } }>🔤 🖼️</span>
												<span style={ { fontSize: '11px', marginTop: '4px' } }>{ __( 'Logo Right', 'gravisain-blocks' ) }</span>
											</Button>
											<Button
												isPrimary={ layout === 'logo-top' }
												isSecondary={ layout !== 'logo-top' }
												onClick={ () => setAttributes( { layout: 'logo-top' } ) }
												style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', padding: '8px 4px' } }
											>
												<span style={ { fontSize: '14px', lineHeight: 1 } }>🖼️<br/>🔤</span>
												<span style={ { fontSize: '11px', marginTop: '4px' } }>{ __( 'Logo Top', 'gravisain-blocks' ) }</span>
											</Button>
											<Button
												isPrimary={ layout === 'logo-bottom' }
												isSecondary={ layout !== 'logo-bottom' }
												onClick={ () => setAttributes( { layout: 'logo-bottom' } ) }
												style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', padding: '8px 4px' } }
											>
												<span style={ { fontSize: '14px', lineHeight: 1 } }>🔤<br/>🖼️</span>
												<span style={ { fontSize: '11px', marginTop: '4px' } }>{ __( 'Logo Bottom', 'gravisain-blocks' ) }</span>
											</Button>
										</div>
									</BaseControl>

									<SelectControl
										label={ __( 'Text Vertical Alignment', 'gravisain-blocks' ) }
										value={ verticalAlignment }
										options={ [
											{ label: __( 'Top', 'gravisain-blocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
											{ label: __( 'Bottom', 'gravisain-blocks' ), value: 'flex-end' },
										] }
										onChange={ ( val ) => setAttributes( { verticalAlignment: val } ) }
									/>

									<RangeControl
										label={ __( 'Item Spacing (Gap)', 'gravisain-blocks' ) }
										value={ itemGap }
										onChange={ ( val ) => setAttributes( { itemGap: val } ) }
										min={ 0 }
										max={ 60 }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Link Settings', 'gravisain-blocks' ) } initialOpen={ false }>
									<ToggleControl
										label={ __( 'Link to Homepage', 'gravisain-blocks' ) }
										checked={ linkToHome }
										onChange={ ( val ) => setAttributes( { linkToHome: val } ) }
									/>
									{ ! linkToHome && (
										<TextControl
											label={ __( 'Custom Link URL', 'gravisain-blocks' ) }
											value={ linkUrl }
											onChange={ ( val ) => setAttributes( { linkUrl: val } ) }
											placeholder="https://..."
										/>
									) }
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								{ showTitle && (
									<PanelBody title={ __( 'Site Title Typography & Color', 'gravisain-blocks' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'HTML Tag', 'gravisain-blocks' ) }
											value={ titleTag }
											options={ [
												{ label: 'span', value: 'span' },
												{ label: 'h1', value: 'h1' },
												{ label: 'h2', value: 'h2' },
												{ label: 'h3', value: 'h3' },
												{ label: 'p', value: 'p' },
												{ label: 'div', value: 'div' },
											] }
											onChange={ ( val ) => setAttributes( { titleTag: val } ) }
										/>
										<ColorControl
											label={ __( 'Title Color', 'gravisain-blocks' ) }
											value={ titleColor }
											onChange={ ( val ) => setAttributes( { titleColor: val } ) }
										/>
										<ColorControl
											label={ __( 'Title Hover Color', 'gravisain-blocks' ) }
											value={ titleHoverColor }
											onChange={ ( val ) => setAttributes( { titleHoverColor: val } ) }
										/>
										<TypographyControl
											label={ __( 'Title Typography', 'gravisain-blocks' ) }
											value={ titleTypography }
											onChange={ ( val ) => setAttributes( { titleTypography: val } ) }
										/>
									</PanelBody>
								) }

								{ showTagline && (
									<PanelBody title={ __( 'Tagline Typography & Color', 'gravisain-blocks' ) } initialOpen={ true }>
										<ColorControl
											label={ __( 'Tagline Color', 'gravisain-blocks' ) }
											value={ taglineColor }
											onChange={ ( val ) => setAttributes( { taglineColor: val } ) }
										/>
										<TypographyControl
											label={ __( 'Tagline Typography', 'gravisain-blocks' ) }
											value={ taglineTypography }
											onChange={ ( val ) => setAttributes( { taglineTypography: val } ) }
										/>
									</PanelBody>
								) }
							</>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Spacing & Layout', 'gravisain-blocks' ) } initialOpen={ true }>
								<SpacingControl
									label={ __( 'Padding', 'gravisain-blocks' ) }
									value={ padding }
									onChange={ ( val ) => setAttributes( { padding: val } ) }
								/>
								<SpacingControl
									label={ __( 'Margin', 'gravisain-blocks' ) }
									value={ margin }
									onChange={ ( val ) => setAttributes( { margin: val } ) }
									allowNegative={ true }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
