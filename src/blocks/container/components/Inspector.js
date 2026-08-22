import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, SelectControl, TabPanel } from '@wordpress/components';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		maxWidth,
		minHeight,
		minHeightUnit,
		contentAlign,
		overflow,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
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
				{ ( tab ) => {
					if ( tab.name === 'general' ) {
						return (
							<>
								<PanelBody title={ __( 'Container Width & Height', 'gravisain' ) }>
									<TextControl
										label={ __( 'Max Width Container', 'gravisain' ) }
										value={ maxWidth }
										onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
										help={ __( 'E.g., 1200px, 100%, 800px', 'gravisain' ) }
									/>
									<div style={ { display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 16 } }>
										<div style={ { flex: 1 } }>
											<RangeControl
												label={ __( 'Minimum Height', 'gravisain' ) }
												value={ minHeight }
												onChange={ ( value ) => setAttributes( { minHeight: value } ) }
												min={ 0 }
												max={ minHeightUnit === 'vh' ? 100 : 1000 }
											/>
										</div>
										<div style={ { width: '80px' } }>
											<SelectControl
												label={ __( 'Unit', 'gravisain' ) }
												value={ minHeightUnit }
												options={ [
													{ label: 'px', value: 'px' },
													{ label: 'vh', value: 'vh' },
												] }
												onChange={ ( value ) => setAttributes( { minHeightUnit: value } ) }
											/>
										</div>
									</div>
									<SelectControl
										label={ __( 'Vertical Content Alignment', 'gravisain' ) }
										value={ contentAlign }
										options={ [
											{ label: __( 'Top (Flex Start)', 'gravisain' ), value: 'flex-start' },
											{ label: __( 'Center', 'gravisain' ), value: 'center' },
											{ label: __( 'Bottom (Flex End)', 'gravisain' ), value: 'flex-end' },
											{ label: __( 'Stretch Full Height', 'gravisain' ), value: 'stretch' },
										] }
										onChange={ ( value ) => setAttributes( { contentAlign: value } ) }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Spacing (Padding & Margin)', 'gravisain' ) } initialOpen={ true }>
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
								</PanelBody>

								<PanelBody title={ __( 'Overflow & Visibility', 'gravisain' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'Overflow', 'gravisain' ) }
										value={ overflow }
										options={ [
											{ label: __( 'Visible (Default)', 'gravisain' ), value: 'visible' },
											{ label: __( 'Hidden (Clip Background/Shapes)', 'gravisain' ), value: 'hidden' },
										] }
										onChange={ ( value ) => setAttributes( { overflow: value } ) }
										help={ __( 'Use Hidden if you have absolute positioned decorative shapes or background elements that go beyond container edges.', 'gravisain' ) }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Note on Backgrounds & Borders', 'gravisain' ) }>
								<p style={ { fontSize: 13, color: '#64748b' } }>
									{ __( 'Background colors, gradients, and borders are natively supported and available in the standard WordPress inspector panels above.', 'gravisain' ) }
								</p>
							</PanelBody>
						);
					}

					return null;
				} }
			</TabPanel>
		</InspectorControls>
	);
}
