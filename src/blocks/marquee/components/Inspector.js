import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TextControl, TextareaControl, TabPanel, Button } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import SpacingControl from '../../../controls/SpacingControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		speed,
		direction,
		gap,
		pauseOnHover,
		fadeMask,
		minHeight,
		imageHeight,
		backgroundColor,
		borderRadius,
		padding,
		margin,
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
							<PanelBody title={ __( 'Marquee Settings', 'gravisain' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Animation Duration / Speed (seconds)', 'gravisain' ) }
									help={ __( 'Lower value means faster movement, higher value means calmer slower scroll.', 'gravisain' ) }
									value={ speed }
									onChange={ ( val ) => setAttributes( { speed: val } ) }
									min={ 5 }
									max={ 120 }
									step={ 1 }
								/>

								<SelectControl
									label={ __( 'Scroll Direction', 'gravisain' ) }
									value={ direction }
									options={ [
										{ label: __( 'Left to Right (←)', 'gravisain' ), value: 'left' },
										{ label: __( 'Right to Left (→)', 'gravisain' ), value: 'right' },
									] }
									onChange={ ( val ) => setAttributes( { direction: val } ) }
								/>

								<RangeControl
									label={ __( 'Gap Between Items (px)', 'gravisain' ) }
									value={ gap }
									onChange={ ( val ) => setAttributes( { gap: val } ) }
									min={ 8 }
									max={ 160 }
									step={ 4 }
								/>

								<RangeControl
									label={ __( 'Minimum Height (px)', 'gravisain' ) }
									value={ minHeight }
									onChange={ ( val ) => setAttributes( { minHeight: val } ) }
									min={ 0 }
									max={ 300 }
									step={ 1 }
								/>

								<RangeControl
									label={ __( 'Logo / Image Height (px)', 'gravisain' ) }
									help={ __( 'Uniform height for logos and images in the marquee. Set to 0 for auto/natural size.', 'gravisain' ) }
									value={ imageHeight || 0 }
									onChange={ ( val ) => setAttributes( { imageHeight: val } ) }
									min={ 0 }
									max={ 250 }
									step={ 1 }
								/>

								<ToggleControl
									label={ __( 'Pause on Hover', 'gravisain' ) }
									help={ __( 'Pause the running animation when cursor hovers over items.', 'gravisain' ) }
									checked={ pauseOnHover }
									onChange={ ( val ) => setAttributes( { pauseOnHover: val } ) }
								/>

								<ToggleControl
									label={ __( 'Edge Gradient Fade (Fade Mask)', 'gravisain' ) }
									help={ __( 'Create elegant smooth transparent fade at the left and right edges.', 'gravisain' ) }
									checked={ fadeMask }
									onChange={ ( val ) => setAttributes( { fadeMask: val } ) }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Background & Border', 'gravisain' ) } initialOpen={ true }>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600, fontSize: 13 } }>
											{ __( 'Background Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ backgroundColor }
											onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 100 }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Spacing', 'gravisain' ) } initialOpen={ true }>
									<SpacingControl
										label={ __( 'Padding', 'gravisain' ) }
										value={ padding }
										onChange={ ( val ) => setAttributes( { padding: val } ) }
									/>
									<SpacingControl
										label={ __( 'Margin', 'gravisain' ) }
										value={ margin }
										onChange={ ( val ) => setAttributes( { margin: val } ) }
										allowNegative={ true }
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
