import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, SelectControl, TabPanel } from '@wordpress/components';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';
import StickyControl from '../../../controls/StickyControl';

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
							<>
								<PanelBody title={ __( 'Container Width & Height', 'gravisain-blocks' ) }>
									<TextControl
										label={ __( 'Max Width Container', 'gravisain-blocks' ) }
										value={ maxWidth }
										onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
										help={ __( 'E.g., 1200px, 100%, 800px', 'gravisain-blocks' ) }
									/>
									<div style={ { display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 16 } }>
										<div style={ { flex: 1 } }>
											<RangeControl
												label={ __( 'Minimum Height', 'gravisain-blocks' ) }
												value={ minHeight }
												onChange={ ( value ) => setAttributes( { minHeight: value } ) }
												min={ 0 }
												max={ minHeightUnit === 'vh' ? 100 : 1000 }
											/>
										</div>
										<div style={ { width: '80px' } }>
											<SelectControl
												label={ __( 'Unit', 'gravisain-blocks' ) }
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
										label={ __( 'Vertical Content Alignment', 'gravisain-blocks' ) }
										value={ contentAlign }
										options={ [
											{ label: __( 'Top (Flex Start)', 'gravisain-blocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
											{ label: __( 'Bottom (Flex End)', 'gravisain-blocks' ), value: 'flex-end' },
											{ label: __( 'Stretch Full Height', 'gravisain-blocks' ), value: 'stretch' },
										] }
										onChange={ ( value ) => setAttributes( { contentAlign: value } ) }
									/>
								</PanelBody>

								<StickyControl
									attributes={ attributes }
									setAttributes={ setAttributes }
									helpText={ __( 'This will stick the container to viewport for the height of outer section.', 'gravisain-blocks' ) }
								/>
							</>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Spacing (Padding & Margin)', 'gravisain-blocks' ) } initialOpen={ true }>
									<ResponsiveTabControl>
										{ ( device ) => {
											if ( device === 'tablet' ) {
												return (
													<>
														<SpacingControl
															label={ __( 'Tablet Padding', 'gravisain-blocks' ) }
															value={ paddingTablet }
															onChange={ ( val ) => setAttributes( { paddingTablet: val } ) }
														/>
														<SpacingControl
															label={ __( 'Tablet Margin', 'gravisain-blocks' ) }
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
															label={ __( 'Mobile Padding', 'gravisain-blocks' ) }
															value={ paddingMobile }
															onChange={ ( val ) => setAttributes( { paddingMobile: val } ) }
														/>
														<SpacingControl
															label={ __( 'Mobile Margin', 'gravisain-blocks' ) }
															value={ marginMobile }
															onChange={ ( val ) => setAttributes( { marginMobile: val } ) }
														/>
													</>
												);
											}
											return (
												<>
													<SpacingControl
														label={ __( 'Desktop Padding', 'gravisain-blocks' ) }
														value={ padding }
														onChange={ ( val ) => setAttributes( { padding: val } ) }
													/>
													<SpacingControl
														label={ __( 'Desktop Margin', 'gravisain-blocks' ) }
														value={ margin }
														onChange={ ( val ) => setAttributes( { margin: val } ) }
													/>
												</>
											);
										} }
									</ResponsiveTabControl>
								</PanelBody>

								<PanelBody title={ __( 'Overflow & Visibility', 'gravisain-blocks' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'Overflow', 'gravisain-blocks' ) }
										value={ overflow }
										options={ [
											{ label: __( 'Visible (Default)', 'gravisain-blocks' ), value: 'visible' },
											{ label: __( 'Hidden (Clip Background/Shapes)', 'gravisain-blocks' ), value: 'hidden' },
										] }
										onChange={ ( value ) => setAttributes( { overflow: value } ) }
										help={ __( 'Use Hidden if you have absolute positioned decorative shapes or background elements that go beyond container edges.', 'gravisain-blocks' ) }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Note on Backgrounds & Borders', 'gravisain-blocks' ) }>
								<p style={ { fontSize: 13, color: '#64748b' } }>
									{ __( 'Background colors, gradients, and borders are natively supported and available in the standard WordPress inspector panels above.', 'gravisain-blocks' ) }
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
