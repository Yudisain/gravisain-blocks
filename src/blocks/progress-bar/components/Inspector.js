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
					{ name: 'general', title: __( 'General', 'gravisain' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Progress & Dimensions', 'gravisain' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Percentage Value (%)', 'gravisain' ) }
									value={ percentage }
									onChange={ ( val ) => setAttributes( { percentage: val } ) }
									min={ 0 }
									max={ 100 }
								/>
								<ToggleControl
									label={ __( 'Show Percentage Number', 'gravisain' ) }
									checked={ showPercentage }
									onChange={ ( val ) => setAttributes( { showPercentage: val } ) }
								/>
								<RangeControl
									label={ __( 'Bar Thickness (px)', 'gravisain' ) }
									value={ height }
									onChange={ ( val ) => setAttributes( { height: val } ) }
									min={ 4 }
									max={ 50 }
								/>
								<ToggleControl
									label={ __( 'Striped Pattern', 'gravisain' ) }
									checked={ striped }
									onChange={ ( val ) => setAttributes( { striped: val } ) }
								/>
								{ striped && (
									<ToggleControl
										label={ __( 'Animate Stripes', 'gravisain' ) }
										checked={ animated }
										onChange={ ( val ) => setAttributes( { animated: val } ) }
									/>
								) }
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Colors & Radius', 'gravisain' ) } initialOpen={ true }>
								<ColorControl
									label={ __( 'Progress Bar Color', 'gravisain' ) }
									value={ barColor }
									onChange={ ( val ) => setAttributes( { barColor: val } ) }
								/>
								<ColorControl
									label={ __( 'Background Track Color', 'gravisain' ) }
									value={ trackColor }
									onChange={ ( val ) => setAttributes( { trackColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Label Text Color', 'gravisain' ) }
									value={ textColor }
									onChange={ ( val ) => setAttributes( { textColor: val } ) }
									disableGradient={ true }
								/>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain' ) }
									value={ borderRadius }
									onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>
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
