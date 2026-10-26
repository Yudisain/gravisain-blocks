import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		percentage,
		showPercentage,
		height,
		barColor,
		trackColor,
		textColor,
		borderRadius,
		striped,
		animated,
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
							<PanelBody title={ __( 'Progress & Dimensions', 'gravisain-blocks' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Percentage Value (%)', 'gravisain-blocks' ) }
									value={ percentage }
									onChange={ ( val ) => setAttributes( { percentage: val } ) }
									min={ 0 }
									max={ 100 }
								/>
								<ToggleControl
									label={ __( 'Show Percentage Number', 'gravisain-blocks' ) }
									checked={ showPercentage }
									onChange={ ( val ) => setAttributes( { showPercentage: val } ) }
								/>
								<RangeControl
									label={ __( 'Bar Thickness (px)', 'gravisain-blocks' ) }
									value={ height }
									onChange={ ( val ) => setAttributes( { height: val } ) }
									min={ 4 }
									max={ 50 }
								/>
								<ToggleControl
									label={ __( 'Striped Pattern', 'gravisain-blocks' ) }
									checked={ striped }
									onChange={ ( val ) => setAttributes( { striped: val } ) }
								/>
								{ striped && (
									<ToggleControl
										label={ __( 'Animate Stripes', 'gravisain-blocks' ) }
										checked={ animated }
										onChange={ ( val ) => setAttributes( { animated: val } ) }
									/>
								) }
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Colors & Radius', 'gravisain-blocks' ) } initialOpen={ true }>
								<ColorControl
									label={ __( 'Progress Bar Color', 'gravisain-blocks' ) }
									value={ barColor }
									onChange={ ( val ) => setAttributes( { barColor: val } ) }
								/>
								<ColorControl
									label={ __( 'Background Track Color', 'gravisain-blocks' ) }
									value={ trackColor }
									onChange={ ( val ) => setAttributes( { trackColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Label Text Color', 'gravisain-blocks' ) }
									value={ textColor }
									onChange={ ( val ) => setAttributes( { textColor: val } ) }
									disableGradient={ true }
								/>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
									value={ borderRadius }
									onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>
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
