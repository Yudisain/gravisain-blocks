import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, RangeControl, Button, TabPanel, FocalPointPicker } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';
import ResponsiveAlignmentControl from '../../../controls/ResponsiveAlignmentControl';
import StickyControl from '../../../controls/StickyControl';

export default function ColumnInspector( { attributes, setAttributes } ) {
	const {
		width,
		widthTablet,
		widthMobile,
		verticalAlignment,
		horizontalAlignment,
		horizontalAlignmentTablet,
		horizontalAlignmentMobile,
		backgroundColor,
		textColor,
		backgroundImage,
		backgroundFocalPoint,
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
		boxShadow,
		hoverEffect,
		hoverBackgroundColor,
		hoverBorderColor,
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
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Column Width & Alignment', 'gravisain-blocks' ) } initialOpen={ true }>
									<ResponsiveTabControl>
										{ ( device ) => {
											if ( device === 'tablet' ) {
												return (
													<RangeControl
														label={ __( 'Tablet Width (%)', 'gravisain-blocks' ) }
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
														label={ __( 'Mobile Width (%)', 'gravisain-blocks' ) }
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
													label={ __( 'Desktop Width (%)', 'gravisain-blocks' ) }
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
										label={ __( 'Vertical Alignment', 'gravisain-blocks' ) }
										value={ verticalAlignment }
										options={ [
											{ label: __( 'Default', 'gravisain-blocks' ), value: '' },
											{ label: __( 'Top', 'gravisain-blocks' ), value: 'top' },
											{ label: __( 'Middle', 'gravisain-blocks' ), value: 'center' },
											{ label: __( 'Bottom', 'gravisain-blocks' ), value: 'bottom' },
										] }
										onChange={ ( value ) => setAttributes( { verticalAlignment: value } ) }
									/>

									<div style={ { marginTop: '16px' } }>
										<ResponsiveAlignmentControl
											label={ __( 'Horizontal Alignment', 'gravisain-blocks' ) }
											textAlign={ horizontalAlignment }
											textAlignTablet={ horizontalAlignmentTablet }
											textAlignMobile={ horizontalAlignmentMobile }
											onChangeDesktop={ ( val ) => setAttributes( { horizontalAlignment: val } ) }
											onChangeTablet={ ( val ) => setAttributes( { horizontalAlignmentTablet: val } ) }
											onChangeMobile={ ( val ) => setAttributes( { horizontalAlignmentMobile: val } ) }
										/>
									</div>
								</PanelBody>

								<StickyControl
									attributes={ attributes }
									setAttributes={ setAttributes }
									helpText={ __( 'This will stick the column to viewport for the height of outer container.', 'gravisain-blocks' ) }
								/>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Background & Colors', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Background Color', 'gravisain-blocks' ) }
										value={ backgroundColor }
										onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Text Color', 'gravisain-blocks' ) }
										value={ textColor }
										onChange={ ( val ) => setAttributes( { textColor: val } ) }
									/>
									
									<p className="components-base-control__label" style={{ marginTop: '16px', marginBottom: '8px' }}>
										<strong>{ __( 'Background Image', 'gravisain-blocks' ) }</strong>
									</p>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( mediaObj ) => setAttributes( { backgroundImage: mediaObj.url } ) }
											allowedTypes={ [ 'image' ] }
											render={ ( { open } ) => (
												<Button variant="secondary" onClick={ open }>
													{ backgroundImage ? __( 'Replace Background Image', 'gravisain-blocks' ) : __( 'Select Background Image', 'gravisain-blocks' ) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
									{ backgroundImage && (
										<>
											<Button variant="link" isDestructive onClick={ () => setAttributes( { backgroundImage: '' } ) } style={ { marginTop: '10px', display: 'block' } }>
												{ __( 'Remove Image', 'gravisain-blocks' ) }
											</Button>
											<div style={ { marginTop: '16px' } }>
												<FocalPointPicker
													label={ __( 'Background Focal Point', 'gravisain-blocks' ) }
													url={ backgroundImage }
													value={ backgroundFocalPoint || { x: 0.5, y: 0.5 } }
													onChange={ ( val ) => setAttributes( { backgroundFocalPoint: val } ) }
												/>
											</div>
										</>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Spacing & Borders', 'gravisain-blocks' ) } initialOpen={ false }>
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

									<hr style={{ margin: '16px 0' }} />

									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain-blocks' ) }
										value={ borderWidth }
										onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
										min={ 0 }
										max={ 20 }
									/>
									{ borderWidth > 0 && (
										<>
											<ColorControl
												label={ __( 'Border Color', 'gravisain-blocks' ) }
												value={ borderColor }
												onChange={ ( val ) => setAttributes( { borderColor: val } ) }
												disableGradient={ true }
											/>
											<SelectControl
												label={ __( 'Border Style', 'gravisain-blocks' ) }
												value={ borderStyle }
												options={ [
													{ label: __( 'Solid', 'gravisain-blocks' ), value: 'solid' },
													{ label: __( 'Dashed', 'gravisain-blocks' ), value: 'dashed' },
													{ label: __( 'Dotted', 'gravisain-blocks' ), value: 'dotted' },
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
										max={ 100 }
									/>
									<hr style={{ margin: '16px 0' }} />
									<SelectControl
										label={ __( 'Box Shadow', 'gravisain-blocks' ) }
										value={ boxShadow }
										options={ [
											{ label: __( 'None', 'gravisain-blocks' ), value: '' },
											{ label: __( 'Soft Shadow', 'gravisain-blocks' ), value: '0 4px 12px rgba(0,0,0,0.08)' },
											{ label: __( 'Medium Shadow', 'gravisain-blocks' ), value: '0 8px 24px rgba(0,0,0,0.12)' },
											{ label: __( 'Hard Shadow', 'gravisain-blocks' ), value: '0 12px 36px rgba(0,0,0,0.15)' },
										] }
										onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Hover & Interactive Effects', 'gravisain-blocks' ) } initialOpen={ false }>
									<SelectControl
										label={ __( 'Column Hover Effect', 'gravisain-blocks' ) }
										value={ hoverEffect || 'none' }
										options={ [
											{ label: __( 'None', 'gravisain-blocks' ), value: 'none' },
											{ label: __( 'Lift Up (Shadow Boost)', 'gravisain-blocks' ), value: 'lift' },
											{ label: __( 'Scale Up (Zoom In)', 'gravisain-blocks' ), value: 'scale' },
											{ label: __( 'Border Glow', 'gravisain-blocks' ), value: 'border-glow' },
										] }
										onChange={ ( val ) => setAttributes( { hoverEffect: val } ) }
										help={ __( 'Adds smooth lift or zoom animation when visitors hover over this column.', 'gravisain-blocks' ) }
									/>
									{ hoverEffect === 'border-glow' && (
										<ColorControl
											label={ __( 'Hover Glow Color', 'gravisain-blocks' ) }
											value={ hoverBorderColor }
											onChange={ ( val ) => setAttributes( { hoverBorderColor: val } ) }
											disableGradient={ true }
										/>
									) }
									<ColorControl
										label={ __( 'Hover Background Color (Optional)', 'gravisain-blocks' ) }
										value={ hoverBackgroundColor }
										onChange={ ( val ) => setAttributes( { hoverBackgroundColor: val } ) }
										disableGradient={ true }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain-blocks' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain-blocks' ) }
									value={ anchor }
									onChange={ ( val ) => setAttributes( { anchor: val } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain-blocks' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain-blocks' ) }
									value={ customClassName }
									onChange={ ( val ) => setAttributes( { customClassName: val } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain-blocks' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain-blocks' ) }
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
