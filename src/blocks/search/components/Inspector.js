import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl, TabPanel, RangeControl } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const { 
		placeholder, showButton, buttonText, buttonPosition,
		inputBackgroundColor, inputTextColor, buttonBackgroundColor, buttonTextColor,
		borderRadius
	} = attributes;

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' }
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Search Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Placeholder Text', 'gravisain-blocks' ) }
									value={ placeholder }
									onChange={ ( value ) => setAttributes( { placeholder: value } ) }
								/>
								<ToggleControl
									label={ __( 'Show Button', 'gravisain-blocks' ) }
									checked={ showButton }
									onChange={ ( value ) => setAttributes( { showButton: value } ) }
								/>
								{ showButton && (
									<>
										<TextControl
											label={ __( 'Button Text', 'gravisain-blocks' ) }
											value={ buttonText }
											onChange={ ( value ) => setAttributes( { buttonText: value } ) }
										/>
										<SelectControl
											label={ __( 'Button Position', 'gravisain-blocks' ) }
											value={ buttonPosition }
											options={ [
												{ label: __( 'Outside', 'gravisain-blocks' ), value: 'outside' },
												{ label: __( 'Inside (Icon)', 'gravisain-blocks' ), value: 'inside' }
											] }
											onChange={ ( value ) => setAttributes( { buttonPosition: value } ) }
										/>
									</>
								) }
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Colors & Borders', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Input Background Color', 'gravisain-blocks' ) }
									value={ inputBackgroundColor }
									onChange={ ( value ) => setAttributes( { inputBackgroundColor: value } ) }
								/>
								<TextControl
									label={ __( 'Input Text Color', 'gravisain-blocks' ) }
									value={ inputTextColor }
									onChange={ ( value ) => setAttributes( { inputTextColor: value } ) }
								/>
								{ showButton && (
									<>
										<TextControl
											label={ __( 'Button Background Color', 'gravisain-blocks' ) }
											value={ buttonBackgroundColor }
											onChange={ ( value ) => setAttributes( { buttonBackgroundColor: value } ) }
										/>
										<TextControl
											label={ __( 'Button Text Color', 'gravisain-blocks' ) }
											value={ buttonTextColor }
											onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
										/>
									</>
								) }
								<RangeControl
									label={ __( 'Border Radius', 'gravisain-blocks' ) }
									value={ borderRadius }
									onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
									min={ 0 }
									max={ 50 }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
