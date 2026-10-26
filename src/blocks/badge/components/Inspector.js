import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	TabPanel,
	Button,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';
import ResponsiveAlignmentControl from '../../../controls/ResponsiveAlignmentControl';
import TypographyControl from '../../../controls/TypographyControl';

const DOT_PRESETS = [
	{ label: 'Green Active', color: '#10b981' },
	{ label: 'Blue Info', color: '#3b82f6' },
	{ label: 'Amber Alert', color: '#f59e0b' },
	{ label: 'Red Offline', color: '#ef4444' },
	{ label: 'Purple New', color: '#8b5cf6' },
];

export default function Inspector( {
	attributes,
	setAttributes,
	device,
	setDevice,
	onDeviceChange,
} ) {
	const getResponsiveAttr = ( attrName, currentDevice ) => {
		if ( currentDevice === 'tablet' ) {
			return attributes[ `${ attrName }Tablet` ];
		}
		if ( currentDevice === 'mobile' ) {
			return attributes[ `${ attrName }Mobile` ];
		}
		return attributes[ attrName ];
	};

	const setResponsiveAttr = ( attrName, val, currentDevice ) => {
		if ( currentDevice === 'tablet' ) {
			setAttributes( { [ `${ attrName }Tablet` ]: val } );
		} else if ( currentDevice === 'mobile' ) {
			setAttributes( { [ `${ attrName }Mobile` ]: val } );
		} else {
			setAttributes( { [ attrName ]: val } );
		}
	};

	const {
		text,
		showDot,
		dotColor,
		dotPulse,
		dotPulseSpeed = 1.8,
		dotSize,
		link,
		linkTarget,
		alignment,
		alignmentTablet,
		alignmentMobile,
		fontFamily,
		fontWeight,
		fontStyle,
		fontSize,
		fontSizeTablet,
		fontSizeMobile,
		lineHeight,
		letterSpacing,
		textColor,
		backgroundColor,
		borderWidth,
		borderColor,
		borderStyle,
		borderRadius,
		hasShadow,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
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
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain-blocks' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Badge Content & Link', 'gravisain-blocks' ) } initialOpen={ true }>
									<TextControl
										label={ __( 'Badge Text', 'gravisain-blocks' ) }
										value={ text }
										onChange={ ( val ) => setAttributes( { text: val } ) }
									/>
									<TextControl
										label={ __( 'Link URL (Optional)', 'gravisain-blocks' ) }
										value={ link }
										onChange={ ( val ) => setAttributes( { link: val } ) }
										placeholder="https://..."
										help={ __( 'Make the entire badge clickable as a link.', 'gravisain-blocks' ) }
									/>
									{ link && (
										<SelectControl
											label={ __( 'Link Target', 'gravisain-blocks' ) }
											value={ linkTarget }
											options={ [
												{ label: __( 'Same Tab (_self)', 'gravisain-blocks' ), value: '_self' },
												{ label: __( 'New Tab (_blank)', 'gravisain-blocks' ), value: '_blank' },
											] }
											onChange={ ( val ) => setAttributes( { linkTarget: val } ) }
										/>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Status Dot (Blinking / Pulse)', 'gravisain-blocks' ) } initialOpen={ true }>
									<ToggleControl
										label={ __( 'Show Status Dot', 'gravisain-blocks' ) }
										checked={ showDot }
										onChange={ ( val ) => setAttributes( { showDot: val } ) }
									/>

									{ showDot && (
										<>
											<ToggleControl
												label={ __( 'Pulse / Blinking Animation', 'gravisain-blocks' ) }
												checked={ dotPulse }
												onChange={ ( val ) => setAttributes( { dotPulse: val } ) }
												help={ __( 'Adds a radar ping / blinking pulse animation around the dot.', 'gravisain-blocks' ) }
											/>

											{ dotPulse && (
												<RangeControl
													label={ __( 'Blinking Speed (seconds)', 'gravisain-blocks' ) }
													value={ dotPulseSpeed !== undefined ? dotPulseSpeed : 1.8 }
													onChange={ ( val ) => setAttributes( { dotPulseSpeed: val } ) }
													min={ 0.5 }
													max={ 4 }
													step={ 0.1 }
													help={ __( 'Cepat (0.5s - 1.2s) vs Lambat (2s - 4s). Default: 1.8s.', 'gravisain-blocks' ) }
												/>
											) }

											<ColorControl
												label={ __( 'Dot Color', 'gravisain-blocks' ) }
												value={ dotColor }
												onChange={ ( val ) => setAttributes( { dotColor: val } ) }
											/>

											<div style={ { marginTop: '8px', marginBottom: '14px' } }>
												<span style={ { fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '6px' } }>
													{ __( 'Quick Presets:', 'gravisain-blocks' ) }
												</span>
												<div style={ { display: 'flex', gap: '6px', flexWrap: 'wrap' } }>
													{ DOT_PRESETS.map( ( p ) => (
														<Button
															key={ p.color }
															isSmall
															variant={ dotColor === p.color ? 'primary' : 'secondary' }
															onClick={ () => setAttributes( { dotColor: p.color } ) }
															style={ { fontSize: '11px', padding: '0 8px', height: '24px' } }
														>
															<span
																style={ {
																	display: 'inline-block',
																	width: 8,
																	height: 8,
																	borderRadius: '50%',
																	backgroundColor: p.color,
																	marginRight: 5,
																} }
															/>
															{ p.label }
														</Button>
													) ) }
												</div>
											</div>

											<RangeControl
												label={ __( 'Dot Size (px)', 'gravisain-blocks' ) }
												value={ dotSize }
												onChange={ ( val ) => setAttributes( { dotSize: val } ) }
												min={ 4 }
												max={ 20 }
											/>
										</>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Alignment', 'gravisain-blocks' ) } initialOpen={ true }>
									<ResponsiveAlignmentControl
										device={ device }
										setDevice={ setDevice }
										onDeviceChange={ onDeviceChange }
										textAlign={ alignment }
										textAlignTablet={ alignmentTablet }
										textAlignMobile={ alignmentMobile }
										onChangeDesktop={ ( val ) => setAttributes( { alignment: val } ) }
										onChangeTablet={ ( val ) => setAttributes( { alignmentTablet: val } ) }
										onChangeMobile={ ( val ) => setAttributes( { alignmentMobile: val } ) }
										label={ __( 'Badge Alignment', 'gravisain-blocks' ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Typography', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Text Color', 'gravisain-blocks' ) }
										value={ textColor }
										onChange={ ( val ) => setAttributes( { textColor: val } ) }
									/>
									<div style={ { marginTop: '16px' } }>
										<ResponsiveTabControl activeDevice={ device } onChangeDevice={ onDeviceChange }>
											{ ( currentDevice ) => (
												<TypographyControl
													label={ __( 'Typography', 'gravisain-blocks' ) }
													value={ {
														fontFamily,
														fontSize: getResponsiveAttr( 'fontSize', currentDevice ),
														fontWeight,
														fontStyle,
														lineHeight,
														letterSpacing,
													} }
													onChange={ ( newVal ) => {
														if ( newVal.fontFamily !== fontFamily ) {
															setAttributes( { fontFamily: newVal.fontFamily } );
														}
														if ( newVal.fontWeight !== fontWeight ) {
															setAttributes( { fontWeight: newVal.fontWeight } );
														}
														if ( newVal.fontStyle !== fontStyle ) {
															setAttributes( { fontStyle: newVal.fontStyle } );
														}
														setResponsiveAttr( 'fontSize', newVal.fontSize !== undefined ? Number( newVal.fontSize ) : undefined, currentDevice );
														if ( newVal.lineHeight !== undefined ) {
															setAttributes( { lineHeight: String( newVal.lineHeight ) } );
														}
														if ( newVal.letterSpacing !== undefined ) {
															setAttributes( { letterSpacing: typeof newVal.letterSpacing === 'number' ? `${ newVal.letterSpacing }px` : newVal.letterSpacing } );
														}
													} }
												/>
											) }
										</ResponsiveTabControl>
									</div>
								</PanelBody>

								<PanelBody title={ __( 'Pill Box & Border Styling', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Pill Background Color', 'gravisain-blocks' ) }
										value={ backgroundColor }
										onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
										help={ __( 'Solid color or gradient background.', 'gravisain-blocks' ) }
									/>

									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain-blocks' ) }
										value={ borderWidth }
										onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
										min={ 0 }
										max={ 10 }
									/>

									{ borderWidth > 0 && (
										<>
											<ColorControl
												label={ __( 'Border Color', 'gravisain-blocks' ) }
												value={ borderColor }
												onChange={ ( val ) => setAttributes( { borderColor: val } ) }
											/>
											<SelectControl
												label={ __( 'Border Style', 'gravisain-blocks' ) }
												value={ borderStyle }
												options={ [
													{ label: 'Solid', value: 'solid' },
													{ label: 'Dashed', value: 'dashed' },
													{ label: 'Dotted', value: 'dotted' },
												] }
												onChange={ ( val ) => setAttributes( { borderStyle: val } ) }
											/>
										</>
									) }

									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 9999 }
										help={ __( 'Keep at 9999 for capsule pill shape.', 'gravisain-blocks' ) }
									/>

									<ToggleControl
										label={ __( 'Subtle Drop Shadow', 'gravisain-blocks' ) }
										checked={ hasShadow }
										onChange={ ( val ) => setAttributes( { hasShadow: val } ) }
										help={ __( 'Adds a delicate modern elevation shadow.', 'gravisain-blocks' ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<>
								<PanelBody title={ __( 'Spacing & Margin Controls', 'gravisain-blocks' ) } initialOpen={ true }>
									<ResponsiveTabControl>
										{ ( currentDevice ) => (
											<>
												<SpacingControl
													label={ __( 'Padding', 'gravisain-blocks' ) }
													value={ getResponsiveAttr( 'padding', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'padding', val, currentDevice ) }
												/>
												<SpacingControl
													label={ __( 'Margin', 'gravisain-blocks' ) }
													value={ getResponsiveAttr( 'margin', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'margin', val, currentDevice ) }
												/>
											</>
										) }
									</ResponsiveTabControl>
								</PanelBody>

								<PanelBody title={ __( 'Advanced Settings', 'gravisain-blocks' ) } initialOpen={ false }>
									<TextControl
										label={ __( 'HTML Anchor', 'gravisain-blocks' ) }
										value={ anchor }
										onChange={ ( val ) => setAttributes( { anchor: val } ) }
									/>
									<TextControl
										label={ __( 'Additional CSS class(es)', 'gravisain-blocks' ) }
										value={ customClassName }
										onChange={ ( val ) => setAttributes( { customClassName: val } ) }
									/>
									<TextControl
										label={ __( 'Additional CSS', 'gravisain-blocks' ) }
										value={ customCSS }
										onChange={ ( val ) => setAttributes( { customCSS: val } ) }
									/>
								</PanelBody>
							</>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
