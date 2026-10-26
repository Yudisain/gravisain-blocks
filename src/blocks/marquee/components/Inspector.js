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
							<PanelBody title={ __( 'Marquee Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Animation Duration / Speed (seconds)', 'gravisain-blocks' ) }
									help={ __( 'Lower value means faster movement, higher value means calmer slower scroll.', 'gravisain-blocks' ) }
									value={ speed }
									onChange={ ( val ) => setAttributes( { speed: val } ) }
									min={ 5 }
									max={ 120 }
									step={ 1 }
								/>

								<SelectControl
									label={ __( 'Scroll Direction', 'gravisain-blocks' ) }
									value={ direction }
									options={ [
										{ label: __( 'Left to Right (←)', 'gravisain-blocks' ), value: 'left' },
										{ label: __( 'Right to Left (→)', 'gravisain-blocks' ), value: 'right' },
									] }
									onChange={ ( val ) => setAttributes( { direction: val } ) }
								/>

								<RangeControl
									label={ __( 'Gap Between Items (px)', 'gravisain-blocks' ) }
									value={ gap }
									onChange={ ( val ) => setAttributes( { gap: val } ) }
									min={ 8 }
									max={ 160 }
									step={ 4 }
								/>

								<RangeControl
									label={ __( 'Minimum Height (px)', 'gravisain-blocks' ) }
									value={ minHeight }
									onChange={ ( val ) => setAttributes( { minHeight: val } ) }
									min={ 0 }
									max={ 300 }
									step={ 1 }
								/>

								<RangeControl
									label={ __( 'Logo / Image Height (px)', 'gravisain-blocks' ) }
									help={ __( 'Uniform height for logos and images in the marquee. Set to 0 for auto/natural size.', 'gravisain-blocks' ) }
									value={ imageHeight || 0 }
									onChange={ ( val ) => setAttributes( { imageHeight: val } ) }
									min={ 0 }
									max={ 250 }
									step={ 1 }
								/>

								<ToggleControl
									label={ __( 'Pause on Hover', 'gravisain-blocks' ) }
									help={ __( 'Pause the running animation when cursor hovers over items.', 'gravisain-blocks' ) }
									checked={ pauseOnHover }
									onChange={ ( val ) => setAttributes( { pauseOnHover: val } ) }
								/>

								<ToggleControl
									label={ __( 'Edge Gradient Fade (Fade Mask)', 'gravisain-blocks' ) }
									help={ __( 'Create elegant smooth transparent fade at the left and right edges.', 'gravisain-blocks' ) }
									checked={ fadeMask }
									onChange={ ( val ) => setAttributes( { fadeMask: val } ) }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Background & Border', 'gravisain-blocks' ) } initialOpen={ true }>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600, fontSize: 13 } }>
											{ __( 'Background Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ backgroundColor }
											onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 100 }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Spacing', 'gravisain-blocks' ) } initialOpen={ true }>
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
