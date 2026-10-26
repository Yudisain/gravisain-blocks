import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl,
	TabPanel,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import TypographyControl from '../../../controls/TypographyControl';
import ResponsiveAlignmentControl from '../../advanced-heading/components/ResponsiveAlignmentControl';
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
		htmlTag,
		textAlign,
		textAlignTablet,
		textAlignMobile,
		fontFamily,
		fontSize,
		fontWeight,
		lineHeight,
		letterSpacing,
		textTransform,
		textColor,
		highlightColor,
		enableTextGradient,
		textGradient,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		anchor,
		customClassName,
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
							<PanelBody title={ __( 'Text Settings', 'gravisain-blocks' ) }>
								<SelectControl
									label={ __( 'HTML Tag', 'gravisain-blocks' ) }
									value={ htmlTag }
									options={ [
										{ label: 'Paragraph <p>', value: 'p' },
										{ label: 'H1', value: 'h1' },
										{ label: 'H2', value: 'h2' },
										{ label: 'H3', value: 'h3' },
										{ label: 'H4', value: 'h4' },
										{ label: 'H5', value: 'h5' },
										{ label: 'H6', value: 'h6' },
										{ label: 'Div <div>', value: 'div' },
										{ label: 'Span <span>', value: 'span' },
									] }
									onChange={ ( value ) =>
										setAttributes( { htmlTag: value } )
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
							</PanelBody>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Typography', 'gravisain-blocks' ) }>
									<ResponsiveTabControl activeDevice={ device } onChangeDevice={ onDeviceChange }>
										{ ( currentDevice ) => (
											<TypographyControl
												label={ __( 'Text Typography', 'gravisain-blocks' ) }
												value={{
													fontFamily: fontFamily,
													fontSize: getResponsiveAttr('fontSize', currentDevice),
													fontWeight: fontWeight,
													lineHeight: getResponsiveAttr('lineHeight', currentDevice),
													letterSpacing: getResponsiveAttr('letterSpacing', currentDevice),
												}}
												onChange={(newVal) => {
													if ( newVal.fontFamily !== fontFamily ) {
														setAttributes( { fontFamily: newVal.fontFamily } );
													}
													setResponsiveAttr('fontSize', newVal.fontSize !== undefined ? Number(newVal.fontSize) : undefined, currentDevice);
													setResponsiveAttr('lineHeight', newVal.lineHeight !== undefined ? String(newVal.lineHeight) : undefined, currentDevice);
													setResponsiveAttr('letterSpacing', newVal.letterSpacing !== undefined ? (typeof newVal.letterSpacing === 'number' ? `${newVal.letterSpacing}px` : newVal.letterSpacing) : undefined, currentDevice);
													if ( newVal.fontWeight !== fontWeight ) {
														setAttributes( { fontWeight: newVal.fontWeight } );
													}
												}}
											/>
										) }
									</ResponsiveTabControl>
									<SelectControl
										label={ __( 'Text Transform', 'gravisain-blocks' ) }
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

								<PanelBody title={ __( 'Color & Gradient Styling', 'gravisain-blocks' ) }>
									<ToggleControl
										label={ __( 'Enable Text Gradient Effect', 'gravisain-blocks' ) }
										checked={ enableTextGradient }
										onChange={ ( value ) =>
											setAttributes( { enableTextGradient: value } )
										}
									/>
									{ ! enableTextGradient ? (
										<>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Text Color', 'gravisain-blocks' ) }
												</p>
												<ColorControl
													value={ textColor }
													onChange={ ( color ) =>
														setAttributes( {
															textColor: color || '#334155',
														} )
													}
													disableGradient={true}
												/>
											</div>
											<div style={ { marginBottom: 16 } }>
												<p style={ { marginBottom: 8, fontWeight: 600 } }>
													{ __( 'Highlight Text Color', 'gravisain-blocks' ) }
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
											label={ __( 'CSS Linear Gradient', 'gravisain-blocks' ) }
											value={ textGradient }
											onChange={ ( value ) =>
												setAttributes( { textGradient: value } )
											}
											help="E.g.: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)"
										/>
									) }
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Spacing & Margin Controls', 'gravisain-blocks' ) }>
								<ResponsiveTabControl>
									{ ( currentDevice ) => (
										<>
											<SpacingControl
												label={ __( 'Padding', 'gravisain-blocks' ) }
												value={ getResponsiveAttr('padding', currentDevice) }
												onChange={ ( val ) => setResponsiveAttr('padding', val, currentDevice) }
											/>
											<SpacingControl
												label={ __( 'Margin', 'gravisain-blocks' ) }
												value={ getResponsiveAttr('margin', currentDevice) }
												onChange={ ( val ) => setResponsiveAttr('margin', val, currentDevice) }
											/>
										</>
									) }
								</ResponsiveTabControl>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain-blocks' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor".', 'gravisain-blocks' ) }
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
						);
					}

					return null;
				} }
			</TabPanel>
		</InspectorControls>
	);
}
