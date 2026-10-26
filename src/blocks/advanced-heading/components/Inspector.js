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
import { DIVIDER_STYLES, getDividerConfig } from './dividerShapes';

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
		eyebrow,
		eyebrowPosition,
		eyebrowColor,
		eyebrowTypography = {},
		eyebrowTypographyTablet = {},
		eyebrowTypographyMobile = {},
		content,
		titleColor,
		titleTypography = {},
		titleTypographyTablet = {},
		titleTypographyMobile = {},
		description,
		descriptionColor,
		descriptionTypography = {},
		descriptionTypographyTablet = {},
		descriptionTypographyMobile = {},
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
		dividerStyle,
		dividerFlip,
		dividerSpacing,
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

	const getResponsiveObj = ( baseName, currentDevice ) => {
		if ( currentDevice === 'desktop' ) return attributes[ baseName ] || {};
		if ( currentDevice === 'tablet' ) return attributes[ `${ baseName }Tablet` ] || {};
		if ( currentDevice === 'mobile' ) return attributes[ `${ baseName }Mobile` ] || {};
		return {};
	};

	const setResponsiveObj = ( baseName, val, currentDevice ) => {
		const cleaned = { ...( val || {} ) };
		Object.keys( cleaned ).forEach( ( k ) => {
			if ( cleaned[ k ] === undefined || cleaned[ k ] === null || cleaned[ k ] === '' ) {
				delete cleaned[ k ];
			}
		} );
		if ( currentDevice === 'desktop' ) setAttributes( { [ baseName ]: cleaned } );
		if ( currentDevice === 'tablet' ) setAttributes( { [ `${ baseName }Tablet` ]: cleaned } );
		if ( currentDevice === 'mobile' ) setAttributes( { [ `${ baseName }Mobile` ]: cleaned } );
	};

	const getTitleTypography = ( currentDevice ) => {
		const current = currentDevice === 'desktop'
			? ( titleTypography || {} )
			: ( currentDevice === 'tablet' ? ( titleTypographyTablet || {} ) : ( titleTypographyMobile || {} ) );

		return {
			fontFamily: current.fontFamily !== undefined ? current.fontFamily : ( currentDevice === 'desktop' ? fontFamily : '' ),
			fontSize: current.fontSize !== undefined ? current.fontSize : getResponsiveAttr( 'fontSize', currentDevice ),
			fontWeight: current.fontWeight !== undefined ? current.fontWeight : fontWeight,
			lineHeight: current.lineHeight !== undefined ? current.lineHeight : getResponsiveAttr( 'lineHeight', currentDevice ),
			letterSpacing: current.letterSpacing !== undefined ? current.letterSpacing : getResponsiveAttr( 'letterSpacing', currentDevice ),
		};
	};

	const setTitleTypography = ( newVal, currentDevice ) => {
		setResponsiveObj( 'titleTypography', newVal, currentDevice );
		if ( currentDevice === 'desktop' ) {
			setAttributes( {
				fontFamily: newVal?.fontFamily || '',
				fontWeight: newVal?.fontWeight || '',
			} );
		}
		setResponsiveAttr(
			'fontSize',
			newVal?.fontSize !== undefined && newVal?.fontSize !== null && newVal?.fontSize !== ''
				? Number( newVal.fontSize )
				: undefined,
			currentDevice
		);
		setResponsiveAttr(
			'lineHeight',
			newVal?.lineHeight !== undefined && newVal?.lineHeight !== null && newVal?.lineHeight !== ''
				? String( newVal.lineHeight )
				: undefined,
			currentDevice
		);
		setResponsiveAttr(
			'letterSpacing',
			newVal?.letterSpacing !== undefined && newVal?.letterSpacing !== null && newVal?.letterSpacing !== ''
				? ( typeof newVal.letterSpacing === 'number' ? `${ newVal.letterSpacing }px` : newVal.letterSpacing )
				: undefined,
			currentDevice
		);
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
							<PanelBody title={ __( 'Heading Content & Eyebrow', 'gravisain-blocks' ) }>
								<SelectControl
									label={ __( 'HTML Heading Tag', 'gravisain-blocks' ) }
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
									label={ __( 'Eyebrow Position', 'gravisain-blocks' ) }
									value={ eyebrowPosition }
									options={ [
										{ label: __( 'Above Heading', 'gravisain-blocks' ), value: 'above' },
										{ label: __( 'Below Heading', 'gravisain-blocks' ), value: 'below' },
									] }
									onChange={ ( value ) =>
										setAttributes( { eyebrowPosition: value } )
									}
								/>
								<TextControl
									label={ __( 'Eyebrow Text (Optional)', 'gravisain-blocks' ) }
									value={ eyebrow || '' }
									onChange={ ( value ) => setAttributes( { eyebrow: value } ) }
									placeholder={ __( 'e.g. NEXT-GENERATION ARCHITECTURE', 'gravisain-blocks' ) }
									help={ __( 'Small uppercase badge/eyebrow displayed above or below the heading title.', 'gravisain-blocks' ) }
								/>
								<ToggleControl
									label={ __( 'Show Accent Line Divider', 'gravisain-blocks' ) }
									checked={ showDivider }
									onChange={ ( value ) =>
										setAttributes( { showDivider: value } )
									}
								/>
								<TextareaControl
									label={ __( 'Description Text (Optional)', 'gravisain-blocks' ) }
									value={ description }
									onChange={ ( value ) => setAttributes( { description: value } ) }
									help={ __( 'Optional description text rendered below the heading.', 'gravisain-blocks' ) }
									rows={ 3 }
								/>
							</PanelBody>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Typography', 'gravisain-blocks' ) }>
									<div style={ { marginBottom: 24 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>{ __( 'Title Typography', 'gravisain-blocks' ) }</p>
										{ ! enableTextGradient && (
											<ColorControl
												label={ __( 'Title Color', 'gravisain-blocks' ) }
												value={ titleColor || textColor }
												onChange={ ( val ) => setAttributes( { titleColor: val, textColor: val || '#0f172a' } ) }
												disableGradient={ true }
											/>
										) }
										<ResponsiveTabControl activeDevice={ device } onChangeDevice={ onDeviceChange }>
											{ ( currentDevice ) => (
												<TypographyControl
													label={ __( 'Typography', 'gravisain-blocks' ) }
													value={ getTitleTypography( currentDevice ) }
													onChange={ ( newVal ) => setTitleTypography( newVal, currentDevice ) }
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
									</div>

									<div style={ { marginBottom: 24, paddingTop: 16, borderTop: '1px solid #e0e0e0' } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>{ __( 'Eyebrow Typography', 'gravisain-blocks' ) }</p>
										<ColorControl
											label={ __( 'Eyebrow Color', 'gravisain-blocks' ) }
											value={ eyebrowColor }
											onChange={ ( val ) => setAttributes( { eyebrowColor: val } ) }
											disableGradient={ true }
										/>
										<ResponsiveTabControl activeDevice={ device } onChangeDevice={ onDeviceChange }>
											{ ( currentDevice ) => (
												<TypographyControl
													label={ __( 'Typography', 'gravisain-blocks' ) }
													value={ getResponsiveObj( 'eyebrowTypography', currentDevice ) }
													onChange={ ( val ) => setResponsiveObj( 'eyebrowTypography', val, currentDevice ) }
												/>
											) }
										</ResponsiveTabControl>
									</div>

									<div style={ { paddingTop: 16, borderTop: '1px solid #e0e0e0' } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>{ __( 'Description Typography', 'gravisain-blocks' ) }</p>
										<ColorControl
											label={ __( 'Description Color', 'gravisain-blocks' ) }
											value={ descriptionColor }
											onChange={ ( val ) => setAttributes( { descriptionColor: val } ) }
											disableGradient={ true }
										/>
										<ResponsiveTabControl activeDevice={ device } onChangeDevice={ onDeviceChange }>
											{ ( currentDevice ) => (
												<TypographyControl
													label={ __( 'Typography', 'gravisain-blocks' ) }
													value={ getResponsiveObj( 'descriptionTypography', currentDevice ) }
													onChange={ ( val ) => setResponsiveObj( 'descriptionTypography', val, currentDevice ) }
												/>
											) }
										</ResponsiveTabControl>
									</div>
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
													{ __( 'Heading Text Color', 'gravisain-blocks' ) }
												</p>
												<ColorControl
													value={ titleColor || textColor }
													onChange={ ( color ) =>
														setAttributes( {
															textColor: color || '#0f172a',
															titleColor: color || '#0f172a',
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

								{ showDivider && (
									<PanelBody
										title={ __( 'Accent Divider Line Styling', 'gravisain-blocks' ) }
									>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Divider Model / Style', 'gravisain-blocks' ) }
										</p>
										<div
											style={ {
												display: 'grid',
												gridTemplateColumns: 'repeat(3, 1fr)',
												gap: '6px',
												marginBottom: '14px',
											} }
										>
											{ DIVIDER_STYLES.map( ( style ) => {
												const isSelected = ( dividerStyle || 'solid' ) === style.value;
												return (
													<button
														key={ style.value }
														type="button"
														onClick={ () => {
															const updates = { dividerStyle: style.value };
															if ( style.type === 'svg' && ( ! dividerHeight || dividerHeight <= 4 ) ) {
																updates.dividerHeight = 12;
															}
															setAttributes( updates );
														} }
														style={ {
															display: 'flex',
															flexDirection: 'column',
															alignItems: 'center',
															justifyContent: 'center',
															padding: '8px 4px 6px',
															borderRadius: '6px',
															border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
															backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
															cursor: 'pointer',
															minHeight: '48px',
															boxSizing: 'border-box',
															transition: 'all 0.15s ease',
														} }
														title={ style.label }
													>
														<div
															style={ {
																width: '100%',
																height: '18px',
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center',
															} }
														>
															{ style.value === 'solid' && (
																<div
																	style={ {
																		width: '80%',
																		height: '3px',
																		backgroundColor: isSelected ? '#2563eb' : '#64748b',
																		borderRadius: '2px',
																	} }
																/>
															) }
															{ style.type === 'svg' && (
																<svg
																	viewBox={ style.viewBox }
																	preserveAspectRatio="none"
																	style={ {
																		width: '85%',
																		height: '14px',
																		overflow: 'visible',
																		transform: dividerFlip && [ 'brush', 'brush-swoop', 'curved' ].includes( style.value ) ? 'scaleX(-1)' : 'none',
																	} }
																>
																	{ style.isFill ? (
																		<path
																			d={ style.path }
																			fill={ isSelected ? '#2563eb' : '#64748b' }
																		/>
																	) : (
																		<path
																			d={ style.path }
																			fill="none"
																			stroke={ isSelected ? '#2563eb' : '#64748b' }
																			strokeWidth="3"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																	) }
																</svg>
															) }
															{ style.value === 'double' && (
																<div
																	style={ {
																		width: '80%',
																		height: '6px',
																		borderTop: `1.5px solid ${ isSelected ? '#2563eb' : '#64748b' }`,
																		borderBottom: `1.5px solid ${ isSelected ? '#2563eb' : '#64748b' }`,
																	} }
																/>
															) }
															{ style.value === 'dotted' && (
																<div
																	style={ {
																		width: '80%',
																		height: '0px',
																		borderTop: `2px dotted ${ isSelected ? '#2563eb' : '#64748b' }`,
																	} }
																/>
															) }
															{ style.value === 'dashed' && (
																<div
																	style={ {
																		width: '80%',
																		height: '0px',
																		borderTop: `2px dashed ${ isSelected ? '#2563eb' : '#64748b' }`,
																	} }
																/>
															) }
														</div>
														<span
															style={ {
																fontSize: '9px',
																marginTop: '4px',
																color: isSelected ? '#2563eb' : '#64748b',
																fontWeight: isSelected ? 600 : 400,
																lineHeight: 1,
																whiteSpace: 'nowrap',
																overflow: 'hidden',
																textOverflow: 'ellipsis',
																maxWidth: '100%',
															} }
														>
															{ style.label }
														</span>
													</button>
												);
											} ) }
										</div>

										<SelectControl
											label={ __( 'Select Model', 'gravisain-blocks' ) }
											value={ dividerStyle || 'solid' }
											options={ DIVIDER_STYLES.map( ( s ) => ( {
												label: s.label,
												value: s.value,
											} ) ) }
											onChange={ ( value ) => {
												const updates = { dividerStyle: value };
												const conf = getDividerConfig( value );
												if ( conf.type === 'svg' && ( ! dividerHeight || dividerHeight <= 4 ) ) {
													updates.dividerHeight = 12;
												}
												setAttributes( updates );
											} }
										/>

										{ [ 'brush', 'brush-swoop', 'curved' ].includes( dividerStyle ) && (
											<ToggleControl
												label={ __( 'Flip Horizontally', 'gravisain-blocks' ) }
												checked={ !! dividerFlip }
												onChange={ ( val ) => setAttributes( { dividerFlip: val } ) }
											/>
										) }

										<RangeControl
											label={ __( 'Divider Width (px)', 'gravisain-blocks' ) }
											value={ dividerWidth || 48 }
											onChange={ ( value ) =>
												setAttributes( { dividerWidth: value } )
											}
											min={ 10 }
											max={ 600 }
										/>
										<RangeControl
											label={ __( 'Divider Height / Thickness (px)', 'gravisain-blocks' ) }
											value={ dividerHeight || 4 }
											onChange={ ( value ) =>
												setAttributes( { dividerHeight: value } )
											}
											min={ 1 }
											max={ 40 }
										/>
										<RangeControl
											label={ __( 'Margin Top / Spacing (px)', 'gravisain-blocks' ) }
											value={ dividerSpacing !== undefined ? dividerSpacing : 14 }
											onChange={ ( value ) =>
												setAttributes( { dividerSpacing: value } )
											}
											min={ 0 }
											max={ 60 }
										/>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Divider Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ dividerColor }
											onChange={ ( color ) =>
												setAttributes( {
													dividerColor: color || '#2563eb',
												} )
											}
											disableGradient={ true }
										/>
									</PanelBody>
								) }
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
									label={ __( 'Max Width Container', 'gravisain-blocks' ) }
									value={ maxWidth }
									onChange={ ( value ) =>
										setAttributes( { maxWidth: value } )
									}
								/>
								<ToggleControl
									label={ __( 'Breakout Container Padding', 'gravisain-blocks' ) }
									help={ __( 'Allows text aligned left/right to extend flush to the container edge, removing the default padding gap.', 'gravisain-blocks' ) }
									checked={ !! breakoutPadding }
									onChange={ ( value ) =>
										setAttributes( { breakoutPadding: value } )
									}
								/>
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
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain-blocks' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain-blocks' ) }
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
