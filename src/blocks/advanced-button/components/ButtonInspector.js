import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, RangeControl, ToggleControl, TextControl, TextareaControl } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import SpacingControl from '../../../controls/SpacingControl';
import IconPickerControl from '../../../controls/IconPickerControl';

export default function ButtonInspector( { attributes, setAttributes } ) {
	const { 
		icon, iconPosition,
		backgroundColor, textColor, hoverBackgroundColor, hoverTextColor,
		borderRadius, padding, borderWidth, borderColor, hoverBorderColor,
		hoverEffect, shadow,
		anchor, customClassName, customCSS
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
					}
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Icon', 'gravisain' ) } initialOpen={ true }>
								<IconPickerControl
									label={ __( 'Select Icon', 'gravisain' ) }
									value={ icon }
									onChange={ ( val ) => setAttributes( { icon: val } ) }
								/>
								{ icon && (
									<SelectControl
										label={ __( 'Icon Position', 'gravisain' ) }
										value={ iconPosition }
										options={ [
											{ label: __( 'Left', 'gravisain' ), value: 'left' },
											{ label: __( 'Right', 'gravisain' ), value: 'right' },
										] }
										onChange={ ( val ) => setAttributes( { iconPosition: val } ) }
									/>
								) }
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Colors', 'gravisain' ) } initialOpen={ true }>
									<p className="components-base-control__label"><strong>{ __( 'Normal', 'gravisain' ) }</strong></p>
									<ColorControl
										label={ __( 'Background', 'gravisain' ) }
										value={ backgroundColor }
										onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Text', 'gravisain' ) }
										value={ textColor }
										onChange={ ( val ) => setAttributes( { textColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Border', 'gravisain' ) }
										value={ borderColor }
										onChange={ ( val ) => setAttributes( { borderColor: val } ) }
										disableGradient={ true }
									/>
									
									<hr />
									<p className="components-base-control__label"><strong>{ __( 'Hover', 'gravisain' ) }</strong></p>
									<ColorControl
										label={ __( 'Background Hover', 'gravisain' ) }
										value={ hoverBackgroundColor }
										onChange={ ( val ) => setAttributes( { hoverBackgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Text Hover', 'gravisain' ) }
										value={ hoverTextColor }
										onChange={ ( val ) => setAttributes( { hoverTextColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Border Hover', 'gravisain' ) }
										value={ hoverBorderColor }
										onChange={ ( val ) => setAttributes( { hoverBorderColor: val } ) }
										disableGradient={ true }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Style & Spacing', 'gravisain' ) } initialOpen={ false }>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 100 }
									/>
									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain' ) }
										value={ borderWidth }
										onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
										min={ 0 }
										max={ 20 }
									/>
									<SpacingControl
										label={ __( 'Padding', 'gravisain' ) }
										value={ padding }
										onChange={ ( val ) => setAttributes( { padding: val } ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<>
								<PanelBody title={ __( 'Effects', 'gravisain' ) } initialOpen={ true }>
									<SelectControl
										label={ __( 'Hover Effect', 'gravisain' ) }
										value={ hoverEffect }
										options={ [
											{ label: __( 'None', 'gravisain' ), value: 'none' },
											{ label: __( 'Scale Up', 'gravisain' ), value: 'scale' },
											{ label: __( 'Lift Up', 'gravisain' ), value: 'lift' },
										] }
										onChange={ ( val ) => setAttributes( { hoverEffect: val } ) }
									/>
									<ToggleControl
										label={ __( 'Add Shadow', 'gravisain' ) }
										checked={ shadow }
										onChange={ ( val ) => setAttributes( { shadow: val } ) }
									/>
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
