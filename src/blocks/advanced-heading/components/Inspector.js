import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl,
	TabPanel,
	TextareaControl,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import TypographyControl from '../../../controls/TypographyControl';
import ResponsiveAlignmentControl from './ResponsiveAlignmentControl';

import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';
import SpacingControl from '../../../controls/SpacingControl';

export default function Inspector( {
	attributes,
	setAttributes,
	device,
	setDevice,
	onDeviceChange,
} ) {
	const {
		headingTag,
		textAlign,
		textAlignTablet,
		textAlignMobile,
		fontFamily,
		eyebrowPosition,
		fontSize,
		fontWeight,
		lineHeight,
		letterSpacing,
		textTransform,
		textColor,
		highlightColor,
		enableTextGradient,
		textGradient,
		showDivider,
		dividerWidth,
		dividerHeight,
		dividerColor,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		maxWidth,
		breakoutPadding,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const getResponsiveAttr = ( baseName, currentDevice ) => {
		if ( currentDevice === 'desktop' ) return attributes[baseName];
		if ( currentDevice === 'tablet' ) return attributes[`${baseName}Tablet`];
		if ( currentDevice === 'mobile' ) return attributes[`${baseName}Mobile`];
	};

	const setResponsiveAttr = ( baseName, val, currentDevice ) => {
		if ( currentDevice === 'desktop' ) setAttributes( { [baseName]: val } );
		if ( currentDevice === 'tablet' ) setAttributes( { [`${baseName}Tablet`]: val } );
		if ( currentDevice === 'mobile' ) setAttributes( { [`${baseName}Mobile`]: val } );
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
							<PanelBody title={ __( 'Heading Tag & Eyebrow', 'gravisain' ) }>
								<SelectControl
									label={ __( 'HTML Heading Tag', 'gravisain' ) }
									value={ headingTag }
									options={ [
										{ label: 'H1 (Main Page SEO Title)', value: 'h1' },
										{ label: 'H2 (Section Heading)', value: 'h2' },
										{ label: 'H3 (Sub Section Heading)', value: 'h3' },
										{ label: 'H4', value: 'h4' },
										{ label: 'H5', value: 'h5' },
										{ label: 'H6', value: 'h6' },
										{ label: 'Paragraph <p>', value: 'p' },
										{ label: 'Span <span>', value: 'span' },
									] }
									onChange={ ( value ) =>
										setAttributes( { headingTag: value } )
									}
								/>
								<ResponsiveAlignmentControl
									device={ device }
									setDevice={ setDevice }
									onDeviceChange={ onDeviceChange }
									textAlign={ textAlign }
									textAlignTablet={ textAlignTablet }
									textAlignMobile={ textAlignMobile }
									onChangeDesktop={ ( value ) =>
										setAttributes( { textAlign: value } )
									}
									onChangeTablet={ ( value ) =>
										setAttributes( { textAlignTablet: value } )
									}
									onChangeMobile={ ( value ) =>
										setAttributes( { textAlignMobile: value } )
									}
								/>
								<SelectControl
									label={ __( 'Eyebrow Position', 'gravisain' ) }
									value={ eyebrowPosition }
									options={ [
										{ label: __( 'Above Heading', 'gravisain' ), value: 'above' },
										{ label: __( 'Below Heading', 'gravisain' ), value: 'below' },
									] }
									onChange={ ( value ) =>
										setAttributes( { eyebrowPosition: value } )
									}
								/>
								<ToggleControl
									label={ __( 'Show Accent Line Divider', 'gravisain' ) }
									checked={ showDivider }
									onChange={ ( value ) =>
										setAttributes( { showDivider: value } )
									}
								/>
							</PanelBody>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Typography', 'gravisain' ) }>
									<ResponsiveTabControl>
										{ ( currentDevice ) => (
											<TypographyControl
												label={ __( 'Heading Typography', 'gravisain' ) }
												value={ {
													fontFamily: fontFamily,
													fontSize: getResponsiveAttr('fontSize', currentDevice),
													fontWeight: fontWeight, // weight is usually global
													lineHeight: getResponsiveAttr('lineHeight', currentDevice),
													letterSpacing: getResponsiveAttr('letterSpacing', currentDevice),
												} }
												onChange={ ( newVal ) => {
													if ( newVal.fontFamily !== fontFamily ) {
														setAttributes( { fontFamily: newVal.fontFamily } );
													}
													setResponsiveAttr('fontSize', newVal.fontSize, currentDevice);
													setResponsiveAttr('lineHeight', newVal.lineHeight !== undefined ? String(newVal.lineHeight) : undefined, currentDevice);
													setResponsiveAttr('letterSpacing', newVal.letterSpacing !== undefined ? String(newVal.letterSpacing) : undefined, currentDevice);
													if ( newVal.fontWeight !== fontWeight ) {
														setAttributes( { fontWeight: newVal.fontWeight } );
													}
												} }
											/>
										) }
									</ResponsiveTabControl>
									<SelectControl
										label={ __( 'Text Transform', 'gravisain' ) }
										value={ textTransform }
										options={ [
											{ label: 'None', value: 'none' },
											{ label: 'UPPERCASE', value: 'uppercase' },
											{ label: 'Capitalize', value: 'capitalize' },
											{ label: 'lowercase', value: 'lowercase' },
										] }
										onChange={ ( value ) =>
											setAttributes( { textTransform: value } )
										}
									/>
								</PanelBody>

								<PanelBody title={ __( 'Color & Gradient Styling', 'gravisain' ) }>
									<ToggleControl
										label={ __( 'Enable Text Gradient Effect', 'gravisain' ) }
										checked={ enableTextGradient }
										onChange={ ( value ) =>
											setAttributes( { enableTextGradient: value } )
										}
									/>
									{ ! enableTextGradient ? (
										<>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Heading Text Color', 'gravisain' ) }
												</p>
												<ColorControl
													value={ textColor }
													onChange={ ( color ) =>
														setAttributes( {
															textColor: color || '#0f172a',
														} )
													}
													disableGradient={true}
												/>
											</div>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Highlight Text Color', 'gravisain' ) }
												</p>
												<ColorControl
													value={ highlightColor }
													onChange={ ( color ) =>
														setAttributes( {
															highlightColor: color || '#2563eb',
														} )
													}
													disableGradient={true}
												/>
											</div>
										</>
									) : (
										<TextControl
											label={ __( 'CSS Linear Gradient', 'gravisain' ) }
											value={ textGradient }
											onChange={ ( value ) =>
												setAttributes( { textGradient: value } )
											}
											help="E.g.: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)"
										/>
									) }
								</PanelBody>

								{ showDivider && (
									<PanelBody
										title={ __( 'Accent Divider Line Styling', 'gravisain' ) }
									>
										<RangeControl
											label={ __( 'Divider Width (px)', 'gravisain' ) }
											value={ dividerWidth || 48 }
											onChange={ ( value ) =>
												setAttributes( { dividerWidth: value } )
											}
											min={ 10 }
											max={ 300 }
										/>
										<RangeControl
											label={ __( 'Divider Height / Thickness (px)', 'gravisain' ) }
											value={ dividerHeight || 4 }
											onChange={ ( value ) =>
												setAttributes( { dividerHeight: value } )
											}
											min={ 1 }
											max={ 12 }
										/>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Divider Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ dividerColor }
											onChange={ ( color ) =>
												setAttributes( {
													dividerColor: color || '#2563eb',
												} )
											}
											disableGradient={true}
										/>
									</PanelBody>
								) }
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Spacing & Margin Controls', 'gravisain' ) }>
								<ResponsiveTabControl>
									{ ( currentDevice ) => (
										<>
											<SpacingControl
												label={ __( 'Padding', 'gravisain' ) }
												value={ getResponsiveAttr('padding', currentDevice) }
												onChange={ ( val ) => setResponsiveAttr('padding', val, currentDevice) }
											/>
											<SpacingControl
												label={ __( 'Margin', 'gravisain' ) }
												value={ getResponsiveAttr('margin', currentDevice) }
												onChange={ ( val ) => setResponsiveAttr('margin', val, currentDevice) }
											/>
										</>
									) }
								</ResponsiveTabControl>
								<TextControl
									label={ __( 'Max Width Container', 'gravisain' ) }
									value={ maxWidth }
									onChange={ ( value ) =>
										setAttributes( { maxWidth: value } )
									}
								/>
								<ToggleControl
									label={ __( 'Breakout Container Padding', 'gravisain' ) }
									help={ __( 'Allows text aligned left/right to extend flush to the container edge, removing the default padding gap.', 'gravisain' ) }
									checked={ !! breakoutPadding }
									onChange={ ( value ) =>
										setAttributes( { breakoutPadding: value } )
									}
								/>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain' ) }
									value={ anchor }
									onChange={ ( value ) => setAttributes( { anchor: value } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain' ) }
									value={ customClassName }
									onChange={ ( value ) => setAttributes( { customClassName: value } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain' ) }
									value={ customCSS }
									onChange={ ( value ) => setAttributes( { customCSS: value } ) }
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
