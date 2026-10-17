import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, RangeControl, TextControl, TextareaControl } from '@wordpress/components';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function ButtonsInspector( { attributes, setAttributes } ) {
	const { 
		layout = 'horizontal', 
		layoutTablet = '',
		layoutMobile = '',
		justifyContent = 'flex-start', 
		justifyContentTablet = '',
		justifyContentMobile = '',
		gap = 16, 
		gapTablet,
		gapMobile,
		anchor, 
		customClassName, 
		customCSS 
	} = attributes;

	const getResponsiveAttr = ( attrBase, device ) => {
		if ( device === 'tablet' ) return attributes[ `${ attrBase }Tablet` ] || {};
		if ( device === 'mobile' ) return attributes[ `${ attrBase }Mobile` ] || {};
		return attributes[ attrBase ] || {};
	};

	const setResponsiveAttr = ( attrBase, value, device ) => {
		if ( device === 'tablet' ) {
			setAttributes( { [ `${ attrBase }Tablet` ]: value } );
		} else if ( device === 'mobile' ) {
			setAttributes( { [ `${ attrBase }Mobile` ]: value } );
		} else {
			setAttributes( { [ attrBase ]: value } );
		}
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
						name: 'advanced',
						title: __( 'Advanced', 'gravisain' ),
						className: 'gravisain-tab-advanced',
					}
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Buttons Layout', 'gravisain' ) } initialOpen={ true }>
								<ResponsiveTabControl>
									{ ( currentDevice ) => {
										if ( currentDevice === 'tablet' ) {
											const effectiveTabletLayout = layoutTablet || layout;
											return (
												<>
													<SelectControl
														label={ __( 'Layout', 'gravisain' ) }
														value={ layoutTablet }
														options={ [
															{ 
																label: `${ __( 'Inherit from Desktop', 'gravisain' ) } (${ layout === 'vertical' ? __( 'Vertical', 'gravisain' ) : __( 'Horizontal', 'gravisain' ) })`, 
																value: '' 
															},
															{ label: __( 'Horizontal', 'gravisain' ), value: 'horizontal' },
															{ label: __( 'Vertical', 'gravisain' ), value: 'vertical' },
														] }
														onChange={ ( val ) => setAttributes( { layoutTablet: val } ) }
													/>

													{ effectiveTabletLayout === 'horizontal' && (
														<SelectControl
															label={ __( 'Justify Content', 'gravisain' ) }
															value={ justifyContentTablet }
															options={ [
																{ label: __( 'Inherit from Desktop', 'gravisain' ), value: '' },
																{ label: __( 'Start', 'gravisain' ), value: 'flex-start' },
																{ label: __( 'Center', 'gravisain' ), value: 'center' },
																{ label: __( 'End', 'gravisain' ), value: 'flex-end' },
																{ label: __( 'Space Between', 'gravisain' ), value: 'space-between' },
															] }
															onChange={ ( val ) => setAttributes( { justifyContentTablet: val } ) }
														/>
													) }

													<RangeControl
														label={ __( 'Gap (px)', 'gravisain' ) }
														value={ gapTablet !== undefined && gapTablet !== '' ? gapTablet : undefined }
														placeholder={ gap !== undefined ? String( gap ) : '16' }
														onChange={ ( val ) => setAttributes( { gapTablet: val } ) }
														min={ 0 }
														max={ 100 }
														allowReset
													/>
												</>
											);
										}

										if ( currentDevice === 'mobile' ) {
											const inheritedLayout = layoutTablet || layout;
											const effectiveMobileLayout = layoutMobile || inheritedLayout;
											return (
												<>
													<SelectControl
														label={ __( 'Layout', 'gravisain' ) }
														value={ layoutMobile }
														options={ [
															{ 
																label: `${ __( 'Inherit from Above', 'gravisain' ) } (${ inheritedLayout === 'vertical' ? __( 'Vertical', 'gravisain' ) : __( 'Horizontal', 'gravisain' ) })`, 
																value: '' 
															},
															{ label: __( 'Horizontal', 'gravisain' ), value: 'horizontal' },
															{ label: __( 'Vertical', 'gravisain' ), value: 'vertical' },
														] }
														onChange={ ( val ) => setAttributes( { layoutMobile: val } ) }
													/>

													{ effectiveMobileLayout === 'horizontal' && (
														<SelectControl
															label={ __( 'Justify Content', 'gravisain' ) }
															value={ justifyContentMobile }
															options={ [
																{ label: __( 'Inherit from Above', 'gravisain' ), value: '' },
																{ label: __( 'Start', 'gravisain' ), value: 'flex-start' },
																{ label: __( 'Center', 'gravisain' ), value: 'center' },
																{ label: __( 'End', 'gravisain' ), value: 'flex-end' },
																{ label: __( 'Space Between', 'gravisain' ), value: 'space-between' },
															] }
															onChange={ ( val ) => setAttributes( { justifyContentMobile: val } ) }
														/>
													) }

													<RangeControl
														label={ __( 'Gap (px)', 'gravisain' ) }
														value={ gapMobile !== undefined && gapMobile !== '' ? gapMobile : undefined }
														placeholder={ gapTablet !== undefined && gapTablet !== '' ? String( gapTablet ) : ( gap !== undefined ? String( gap ) : '16' ) }
														onChange={ ( val ) => setAttributes( { gapMobile: val } ) }
														min={ 0 }
														max={ 100 }
														allowReset
													/>
												</>
											);
										}

										// Desktop
										return (
											<>
												<SelectControl
													label={ __( 'Layout', 'gravisain' ) }
													value={ layout }
													options={ [
														{ label: __( 'Horizontal', 'gravisain' ), value: 'horizontal' },
														{ label: __( 'Vertical', 'gravisain' ), value: 'vertical' },
													] }
													onChange={ ( val ) => setAttributes( { layout: val } ) }
												/>

												{ layout === 'horizontal' && (
													<SelectControl
														label={ __( 'Justify Content', 'gravisain' ) }
														value={ justifyContent }
														options={ [
															{ label: __( 'Start', 'gravisain' ), value: 'flex-start' },
															{ label: __( 'Center', 'gravisain' ), value: 'center' },
															{ label: __( 'End', 'gravisain' ), value: 'flex-end' },
															{ label: __( 'Space Between', 'gravisain' ), value: 'space-between' },
														] }
														onChange={ ( val ) => setAttributes( { justifyContent: val } ) }
													/>
												) }

												<RangeControl
													label={ __( 'Gap (px)', 'gravisain' ) }
													value={ gap }
													onChange={ ( val ) => setAttributes( { gap: val } ) }
													min={ 0 }
													max={ 100 }
												/>
											</>
										);
									} }
								</ResponsiveTabControl>
							</PanelBody>
						) }

						{ tab.name === 'advanced' && (
							<>
								<PanelBody title={ __( 'Spacing & Margin Controls', 'gravisain' ) } initialOpen={ true }>
									<ResponsiveTabControl>
										{ ( currentDevice ) => (
											<>
												<SpacingControl
													label={ __( 'Wrapper Padding', 'gravisain' ) }
													value={ getResponsiveAttr( 'padding', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'padding', val, currentDevice ) }
												/>
												<SpacingControl
													label={ __( 'Wrapper Margin', 'gravisain' ) }
													value={ getResponsiveAttr( 'margin', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'margin', val, currentDevice ) }
												/>
											</>
										) }
									</ResponsiveTabControl>
								</PanelBody>

								<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ false }>
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
							</>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
